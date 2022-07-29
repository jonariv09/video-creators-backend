import { UserEntity } from 'src/users/entities/user.entity';
import { VideoEntity } from 'src/videos/entities/video.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('user_video_likes')
export class UsersVideosLikes {
  @PrimaryGeneratedColumn('uuid')
  id;

  @Column({ name: 'like_state' })
  likeState: boolean;

  @ManyToOne(() => VideoEntity, (video) => video.videoLikes)
  @JoinColumn({ name: 'video_id', referencedColumnName: 'id' })
  video;

  @ManyToOne(() => UserEntity, (user) => user.userLikes)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user;
}
