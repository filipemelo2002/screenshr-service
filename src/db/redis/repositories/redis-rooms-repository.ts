import { Injectable } from '@nestjs/common';
import { Room } from 'src/entities/room';
import { RoomsRepository } from 'src/repositories/rooms.repository';

@Injectable()
export class RedisRoomsRepository implements RoomsRepository {
  rooms: Room[] = [];

  async create(room: Room): Promise<Room> {
    this.rooms.push(room);
    return room;
  }
}
