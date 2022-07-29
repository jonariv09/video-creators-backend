import { Injectable } from '@nestjs/common';
import { VideosRepository } from './respositories/videos.repository';

@Injectable()
export class VideosService {
  constructor(private videosRepository: VideosRepository) {}

  getById(id: string) {
    return this.videosRepository.findById(id);
  }
}
