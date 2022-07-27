import { dataSource } from 'src/data-source.config';
import { UserEntity } from '../entities/user.entity';

export const UserRepository = dataSource.getRepository(UserEntity).extend({
  findById(id: string) {
    return this.createQueryBuilder('users')
      .where('users.id = :id', { id })
      .getMany();
  },
});
