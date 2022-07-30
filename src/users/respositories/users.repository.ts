import { Injectable } from '@nestjs/common';
import { UsersFollowsEntity } from 'src/entities/users-follow.entity';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../interfaces/create-user.dto';
import { FollowUserDto } from '../interfaces/follow-user.dto';

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const newUser = new UserEntity();
    newUser.name = createUserDto.name;
    newUser.photo = createUserDto.photo;
    newUser.email = createUserDto.email;
    newUser.password = createUserDto.password;
    return await this.dataSource.manager.save(newUser);
  }

  async findById(id: string) {
    return await this.createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getOne();
  }

  async followUser(followUserDto: FollowUserDto) {
    const { followerId, creatorId, followState } = followUserDto;

    const follower = await this.findById(followerId);
    const creator = await this.findById(creatorId);
    const userFollow = new UsersFollowsEntity();
    userFollow.follower = follower;
    userFollow.creator = creator;
    userFollow.followState = followState;

    return await this.dataSource.manager.save(userFollow);
  }
}
