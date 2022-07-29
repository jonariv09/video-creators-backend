import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UsersFollows } from 'src/entities/users-follow.entity';
import { UsersVideosLikes } from 'src/entities/users-videos-likes.entity';
import { UserEntity } from 'src/users/entities/user.entity';
import { VideoEntity } from 'src/videos/entities/video.entity';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const settings: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [UserEntity, VideoEntity, UsersVideosLikes, UsersFollows],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
};

export default settings;
