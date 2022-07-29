import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { VideoEntity } from '../entities/video.entity';

@Injectable()
export class VideosRepository extends Repository<VideoEntity> {
  constructor(private dataSource: DataSource) {
    super(VideoEntity, dataSource.createEntityManager());
  }

  async findById(id: string): Promise<VideoEntity> {
    return await this.createQueryBuilder('videos')
      .where('videos.id = :id', {
        id,
      })
      .getOne();
  }
}
