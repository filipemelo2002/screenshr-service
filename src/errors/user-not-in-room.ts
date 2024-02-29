export class UserNotInRoom extends Error {
  constructor() {
    super('User not found in given Room.');
  }
}
