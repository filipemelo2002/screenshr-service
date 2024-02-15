import { Room } from 'src/entities/room';

export class RoomViewModel {
  static toHTTP(room: Room) {
    return {
      id: room.id,
      owner: room.owner,
      users: room.users,
      userStreaming: room.userStreaming,
    };
  }
}
