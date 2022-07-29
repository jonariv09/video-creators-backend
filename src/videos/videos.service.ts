import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './interfaces/create-video.dto';
import { LikeVideoDto } from './interfaces/like-video.dto';
import { VideosRepository } from './respositories/videos.repository';

@Injectable()
export class VideosService {
  constructor(private videosRepository: VideosRepository) {}

  getById(id: string) {
    return this.videosRepository.findById(id);
  }

  createVideo(videoDto: CreateVideoDto) {
    return this.videosRepository.createVideo(videoDto);
  }

  likeVideo(likeVideoDto: LikeVideoDto) {
    return this.videosRepository.likeVideo(likeVideoDto);
  }
}
