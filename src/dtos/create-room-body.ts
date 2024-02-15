import { IsNotEmpty } from 'class-validator';

export class CreateRoomBody {
  @IsNotEmpty()
  owner: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  color: string;
}
