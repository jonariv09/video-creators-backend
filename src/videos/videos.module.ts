import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { VideosRepository } from './respositories/videos.repository';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([VideoEntity]),
  ],
  providers: [VideosService, VideosRepository],
  exports: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
