import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/users/respositories/users.repository';
import { DataSource, Repository } from 'typeorm';
import { VideoEntity } from '../entities/video.entity';
import { CreateVideoDto } from '../interfaces/create-video.dto';

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
    video.user = user;

    return await this.dataSource.manager.save(video);
  }
}
