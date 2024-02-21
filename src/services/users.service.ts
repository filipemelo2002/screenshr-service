import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user';
import { UsersRepository } from 'src/repositories/users.repository';

interface CreateUserRequest {
  id: string;
  nickname: string;
  color: string;
}
@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async createUser({ id, nickname, color }: CreateUserRequest) {
    const user = new User({
      id,
      nickname,
      color,
    });
    const response = await this.usersRepository.create(user);

    return {
      user: response,
    };
  }

  async findManyByIds(ids: string[]) {
    const users = [];
    for (const id of ids) {
      const user = await this.usersRepository.findById(id);
      users.push(user);
    }
    return users;
  }
}
