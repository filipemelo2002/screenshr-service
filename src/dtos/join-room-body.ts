import { IsNotEmpty } from 'class-validator';

export class JoinRoomBody {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  nickname: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  roomId: string;
}
