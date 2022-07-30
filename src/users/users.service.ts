import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './interfaces/create-user.dto';
import { FollowUserDto } from './interfaces/follow-user.dto';
import { UsersRepository } from './respositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  createUser(userDto: CreateUserDto) {
    return this.usersRepository.createUser(userDto);
  }

  getById(id: string) {
    return this.usersRepository.findById(id);
  }

  followUser(followUserDto: FollowUserDto) {
    return this.usersRepository.followUser(followUserDto);
  }
}
