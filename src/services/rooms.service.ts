import { Injectable } from '@nestjs/common';
import { Room } from 'src/entities/room';
import { RoomsRepository } from 'src/repositories/rooms.repository';

interface CreateRoomRequest {
  owner: string;
}
interface JoinRoomRequest {
  userId: string;
  roomId: string;
}
@Injectable()
export class RoomsService {
  constructor(private roomsRepository: RoomsRepository) {}

  async createRoom({ owner }: CreateRoomRequest) {
    const room = new Room({
      owner,
      users: [owner],
    });
    const response = await this.roomsRepository.create(room);

    return {
      room: response,
    };
  }

  async joinRoom({ userId, roomId }: JoinRoomRequest) {
    const room = await this.roomsRepository.findOne(roomId);

    room.users.push(userId);

    await this.roomsRepository.update(room);
    return {
      room,
    };
  }
}
