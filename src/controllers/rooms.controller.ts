import { Body, Controller, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomBody } from 'src/dtos/create-room-body';
import { UsersService } from './users.service';
import { RoomViewModel } from 'src/view-models/room-view-model';

@Controller('rooms')
export class RoomsController {
  constructor(
    private roomsService: RoomsService,
    private usersService: UsersService,
  ) {}

  @Post()
  async createRoom(@Body() body: CreateRoomBody) {
    const { owner, ...rest } = body;
    const { room } = await this.roomsService.createRoom(body);
    const { user } = await this.usersService.createUser({
      id: owner,
      ...rest,
    });

    return {
      room: RoomViewModel.toHTTP(room),
      user,
    };
  }
}
