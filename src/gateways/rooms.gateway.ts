import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { RoomsService } from 'src/services/rooms.service';
import { UsersService } from 'src/services/users.service';
import { ROOM_EVENTS } from 'src/utils/room-events';
import { RoomViewModel } from 'src/view-models/room-view-model';
import { UserViewModel } from 'src/view-models/user-view-model';

interface JoinRoomRequest {
  nickname: string;
  color: string;
  roomId: string;
}

interface CreateRoomRequest {
  nickname: string;
  color: string;
}

@WebSocketGateway()
export class RoomsGateway {
  @WebSocketServer() private server: any;

  constructor(
    private roomsService: RoomsService,
    private userService: UsersService,
  ) {}

  @SubscribeMessage(ROOM_EVENTS.CREATE_ROOM)
  async hanleOnCreateRoom(
    @ConnectedSocket() client: any,
    @MessageBody() data: CreateRoomRequest,
  ) {
    const { user } = await this.userService.createUser({
      id: client.id,
      color: data.color,
      nickname: data.nickname,
    });

    const { room } = await this.roomsService.createRoom({
      owner: client.id,
    });

    client.join(room.id);

    return {
      user: UserViewModel.toHTTP(user),
      room: RoomViewModel.toHTTP(room),
    };
  }

  @SubscribeMessage(ROOM_EVENTS.JOIN_ROOM)
  async handleOnJoinRoom(
    @ConnectedSocket() client: any,
    @MessageBody() data: JoinRoomRequest,
  ) {
    const { user } = await this.userService.createUser({
      id: client.id,
      color: data.color,
      nickname: data.nickname,
    });

    const { room } = await this.roomsService.joinRoom({
      userId: user.id,
      roomId: data.roomId,
    });

    const users = await this.userService.findManyByIds(room.users);

    this.server.to(room.id).emit(ROOM_EVENTS.UPDATE_USERS, {
      users: users.map(UserViewModel.toHTTP),
    });

    client.join(room.id);

    return {
      room: RoomViewModel.toHTTP(room),
      users: users.map(UserViewModel.toHTTP),
    };
  }
}
