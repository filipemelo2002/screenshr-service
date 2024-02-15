import { Injectable } from '@nestjs/common';
import { Room } from 'src/entities/room';
import { RoomsRepository } from 'src/repositories/rooms.repository';

interface CreateRoomRequest {
  owner: string;
}
@Injectable()
export class RoomsService {
  constructor(private roomsRepository: RoomsRepository) {}

  async createRoom({ owner }: CreateRoomRequest) {
    const room = new Room({
      owner,
      users: [],
    });
    await this.roomsRepository.create(room);
  }
}
