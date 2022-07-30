import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './interfaces/create-user.dto';
import { FollowUserDto } from './interfaces/follow-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/createUser')
  createUser(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @Get('/getUserById/:id')
  getById(@Param('id') id: string) {
    return this.usersService.getById(id);
  }

  @Post('/followUser')
  followUser(@Body() followUserDto: FollowUserDto) {
    return this.usersService.followUser(followUserDto);
  }
}
