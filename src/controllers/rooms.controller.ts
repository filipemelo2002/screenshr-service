import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { CreateRoomBody } from 'src/dtos/create-room-body';
import { RoomViewModel } from 'src/view-models/room-view-model';
import { UsersService } from 'src/services/users.service';
import { RoomsService } from 'src/services/rooms.service';
import { UserViewModel } from 'src/view-models/user-view-model';
import { JoinRoomBody } from 'src/dtos/join-room-body';
import { RoomNotFoundExceptionFilter } from 'src/filters/room-not-found.filter';

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

  @Post('/join')
  @UseFilters(RoomNotFoundExceptionFilter)
  async joinRoom(@Body() body: JoinRoomBody) {
    const { color, id, nickname, roomId } = body;

    const { user } = await this.usersService.createUser({
      color,
      id,
      nickname,
    });

    const { room } = await this.roomsService.joinRoom({
      roomId,
      userId: user.id,
    });

    const users = await this.usersService.findManyByIds(room.users);

    return {
      user: UserViewModel.toHTTP(user),
      room: RoomViewModel.toHTTP(room),
      users: users.map(UserViewModel.toHTTP),
    };
  }
}
