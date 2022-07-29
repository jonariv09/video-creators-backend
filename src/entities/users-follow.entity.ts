import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_follows')
export class UsersFollows {
  @PrimaryGeneratedColumn('uuid')
  id;

  @Column({ name: 'follow_state' })
  followState: boolean;

  @ManyToOne(() => UserEntity, (user) => user.userFollowed)
  @JoinColumn({ name: 'creator_id', referencedColumnName: 'id' })
  creator;

  @ManyToOne(() => UserEntity, (user) => user.userFollowed)
  @JoinColumn({ name: 'follower_id', referencedColumnName: 'id' })
  follower;
}
