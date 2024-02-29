export class RoomNotFound extends Error {
  constructor() {
    super('Room with given id was not found');
  }
}
