import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from './entities/video.entity';
import { VideosRepository } from './respositories/videos.repository';
import { VideosService } from './videos.service';
import { VideosController } from './videos.controller';
import { UsersRepository } from 'src/users/respositories/users.repository';
import { UserEntity } from 'src/users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forFeature([VideoEntity, UserEntity]),
  ],
  providers: [VideosService, VideosRepository, UsersRepository],
  exports: [VideosService],
  controllers: [VideosController],
})
export class VideosModule {}
