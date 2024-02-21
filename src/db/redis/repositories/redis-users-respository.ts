import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import { UsersRepository } from 'src/repositories/users.repository';

@Injectable()
export class RedisUsersRepository implements UsersRepository {
  users: User[] = [];

  async create(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<User> {
    return this.users.find((user) => user.id === id);
  }
}
