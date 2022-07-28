import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/entities/user.entity';

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const settings: TypeOrmModuleOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: +DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [UserEntity],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
};

export default settings;
