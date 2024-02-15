import { IsNotEmpty } from 'class-validator';

export class CreateRoomBody {
  @IsNotEmpty()
  owner: string;
}
