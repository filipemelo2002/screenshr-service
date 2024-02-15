import { User } from 'src/entities/user';

export abstract class UsersRepository {
  abstract create(user: User): Promise<User>;
}
