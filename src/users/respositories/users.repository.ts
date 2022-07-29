import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findById(id: string) {
    return await this.createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();
  }
}
