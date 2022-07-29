import { Controller, Get, Param } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get('/getVideoById/:id')
  getById(@Param('id') id: string) {
    return this.videosService.getById(id);
  }
}
