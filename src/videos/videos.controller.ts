import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateVideoDto } from './interfaces/create-video.dto';
import { LikeVideoDto } from './interfaces/like-video.dto';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('/getVideoById/:id')
  getById(@Param('id') id: string) {
    return this.videosService.getById(id);
  }

  @Post('/createVideo')
  createVideo(@Body() videoDto: CreateVideoDto) {
    return this.videosService.createVideo(videoDto);
  }

  @Post('/likeVideo')
  likeVideo(@Body() likeVideoDto: LikeVideoDto) {
    return this.videosService.likeVideo(likeVideoDto);
  }
}
