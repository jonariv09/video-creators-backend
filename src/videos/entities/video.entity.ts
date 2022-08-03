import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IsUrl } from 'class-validator';
import { UserEntity } from 'src/users/entities/user.entity';
import { UsersVideosLikes } from 'src/entities/users-videos-likes.entity';

@Entity('videos')
export class VideoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  @IsUrl()
  url: string;

  @Column({ default: false })
  published: boolean;

  @Column({ name: 'created_date' })
  createdDate: Date;

  @BeforeInsert()
  async setPublished() {
    this.published = false;
  }

  @ManyToOne(() => UserEntity, (user) => user.videos)
  @JoinColumn({ name: 'id_creator', referencedColumnName: 'id' })
  user: UserEntity;

  @OneToMany(() => UsersVideosLikes, (likes) => likes.video)
  videoLikes: UsersVideosLikes;
}
