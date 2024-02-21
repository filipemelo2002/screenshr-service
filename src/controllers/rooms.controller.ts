import { Body, Controller, Post } from '@nestjs/common';
import { CreateRoomBody } from 'src/dtos/create-room-body';
import { RoomViewModel } from 'src/view-models/room-view-model';
import { UsersService } from 'src/services/users.service';
import { RoomsService } from 'src/services/rooms.service';
import { UserViewModel } from 'src/view-models/user-view-model';

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
      user: UserViewModel.toHTTP(user),
    };
  }
}
