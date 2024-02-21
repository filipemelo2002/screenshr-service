import { Room } from 'src/entities/room';

export abstract class RoomsRepository {
  abstract create(room: Room): Promise<Room>;
  abstract update(room: Room): Promise<Room>;
  abstract findOne(id: string): Promise<Room>;
}
