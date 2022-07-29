import { Injectable } from '@nestjs/common';
import { UsersRepository } from './respositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  getById(id: string) {
    return this.usersRepository.findById(id);
  }

  followUser() {
    return this.usersRepository.followUser(this.);
  }

}
