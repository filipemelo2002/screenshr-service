import { Logger } from '@nestjs/common';
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
import { UserViewModel } from 'src/view-models/user-view-model';

interface JoinRoomRequest {
  nickname: string;
  color: string;
  roomId: string;
}
@WebSocketGateway()
export class RoomsGateway {
  @WebSocketServer() private server: any;
  private readonly logger = new Logger(RoomsGateway.name);

  constructor(
    private roomsService: RoomsService,
    private userService: UsersService,
  ) {}

  @SubscribeMessage(ROOM_EVENTS.CREATE_ROOM)
  handleMessage(client: any, payload: any): string {
    this.logger.log(`Receiving message from user ${client.id}`);
    this.logger.log(payload);
    return 'Hello world!';
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

    this.server.emit(ROOM_EVENTS.UPDATE_USERS, {
      users: users.map(UserViewModel.toHTTP),
    });
  }
}
