import { Injectable } from '@nestjs/common';
import { UsersFollows } from 'src/entities/users-follow.entity';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { FollowUserDto } from '../interfaces/follow-user.dto';

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

  async followUser(followUserDto: FollowUserDto) {
    const { followerId, creatorId, followState } = followUserDto;

    const follower = await this.findById(followerId);
    const creator = await this.findById(creatorId);
    const userFollow = new UsersFollows();
    userFollow.follower = follower;
    userFollow.creator = creator;
    userFollow.followState = followState;

    return await this.dataSource.manager.save(userFollow);
  }
}
