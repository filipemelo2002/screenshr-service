import { User } from 'src/entities/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      nickname: user.nickname,
      color: user.color,
    };
  }
}
