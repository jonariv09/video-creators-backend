import { Injectable } from '@nestjs/common';
import { UsersVideosLikes } from 'src/entities/users-videos-likes.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersRepository } from 'src/users/respositories/users.repository';
import { DataSource, Repository } from 'typeorm';
import { VideoEntity } from '../entities/video.entity';
import { CreateVideoDto } from '../interfaces/create-video.dto';
import { LikeVideoDto } from '../interfaces/like-video.dto';

@Injectable()
export class VideosRepository extends Repository<VideoEntity> {
  constructor(
    private dataSource: DataSource,
    private readonly usersRepository: UsersRepository,
  ) {
    super(VideoEntity, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<VideoEntity> {
    return await this.createQueryBuilder('videos')
      .where('videos.id = :id', {
        id,
      })
      .getOne();
  }

  async createVideo(videoDto: CreateVideoDto): Promise<VideoEntity> {
    const { creatorId } = videoDto;
    delete videoDto.creatorId;
    const user = await this.usersRepository.findById(creatorId);

    const video: VideoEntity = new VideoEntity();
    video.title = videoDto.title;
    video.description = videoDto.description;
    video.url = videoDto.url;
    video.createdDate = new Date();
    // video.user = user;

    return await this.dataSource.manager.save(video);
  }

  async likeVideo(likeVideoDto: LikeVideoDto) {
    const { userId, videoId, state } = likeVideoDto;
    const user = await this.usersRepository.findById(userId);
    const video = await this.findById(videoId);
    const userLikes = new UsersVideosLikes();
    userLikes.user = user;
    userLikes.video = video;
    userLikes.likeState = state;

    await this.dataSource.manager.save(userLikes);
  }

  async publishVideo(id: string) {
    const video = await this.findById(id);
    const { published } = video;

    return await this.dataSource.manager.update(VideoEntity, id, {
      published: !published,
    });
  }

  async listLikedVideos(userId: string) {
    return await this.createQueryBuilder('video')
      .innerJoin(
        UsersVideosLikes,
        'userVideosLikes',
        'video.id = userVideosLikes.video_id',
      )
      .innerJoin(UserEntity, 'users', 'users.id = userVideosLikes.user_id')
      .where('users.id = :userId', {
        userId,
      })
      .getMany();
  }
}
