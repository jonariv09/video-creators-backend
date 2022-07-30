import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_follows')
export class UsersFollowsEntity {
  @PrimaryGeneratedColumn('uuid')
  id;

  @Column({ name: 'follow_state' })
  followState: boolean;

  @ManyToOne(() => UserEntity, (user) => user.creator)
  @JoinColumn({ name: 'creator_id', referencedColumnName: 'id' })
  creator;

  @ManyToOne(() => UserEntity, (user) => user.follower)
  @JoinColumn({ name: 'follower_id', referencedColumnName: 'id' })
  follower;
}
