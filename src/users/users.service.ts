import { Injectable } from '@nestjs/common';
import { UserRepository } from './respositories/users.repository';

@Injectable()
export class UsersService {
  getById(id: string) {
    return UserRepository.findById(id);
  }
}
