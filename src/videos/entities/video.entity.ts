import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { IsUrl } from 'class-validator';

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

  @Column()
  published: boolean;

  @Column({ name: 'created_date', type: 'date' })
  createdDate;

  @BeforeInsert()
  async setPublished() {
    this.published = false;
  }
}
