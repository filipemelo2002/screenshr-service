import { Room } from 'src/entities/room';

export abstract class RoomsRepository {
  abstract create(room: Room): Promise<Room>;
}
