import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { VideoEntity } from 'src/videos/entities/video.entity';
import { UsersVideosLikes } from 'src/entities/users-videos-likes.entity';
import { UsersFollows } from 'src/entities/users-follow.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  photo: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @OneToMany(() => VideoEntity, (video) => video.user)
  videos: VideoEntity[];

  @OneToMany(() => UsersVideosLikes, (likes) => likes.user)
  userLikes: UsersVideosLikes;

  @OneToMany(() => UsersFollows, (userFollow) => userFollow.user)
  userFollowed: UsersFollows;
}
