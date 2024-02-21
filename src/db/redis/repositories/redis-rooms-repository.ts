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

  async findOne(id: string): Promise<Room> {
    return this.rooms.find((room) => room.id === id);
  }

  async update(room: Room): Promise<Room> {
    const roomIndex = this.rooms.findIndex((roomAux) => roomAux.id === room.id);
    this.rooms[roomIndex] = room;
    return room;
  }
}
