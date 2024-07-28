import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { NotPartyOwner } from 'src/errors/not-party-owner';
import { UserNotInRoom } from 'src/errors/user-not-in-room';
import { RoomsService } from 'src/services/rooms.service';
import { UsersService } from 'src/services/users.service';
import { ROOM_EVENTS } from 'src/utils/room-events';
import { RoomViewModel } from 'src/view-models/room-view-model';
import { UserViewModel } from 'src/view-models/user-view-model';

interface JoinRoomRequest {
  roomId: string;
}

interface CreateRoomRequest {
  nickname: string;
  color: string;
}

interface SendOfferRequest {
  id: string;
  offer: RTCSessionDescriptionInit;
  roomId: string;
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
    const { room } = await this.roomsService.findRoom(data.roomId);

    if (!room.users.includes(client.id)) {
      throw new UserNotInRoom();
    }

    const users = await this.userService.findManyByIds(room.users);

    this.server.to(room.id).emit(ROOM_EVENTS.UPDATE_USERS, {
      users: users.map(UserViewModel.toHTTP),
      newUserId: client.id,
    });

    client.join(room.id);

    return {
      room: RoomViewModel.toHTTP(room),
      users: users.map(UserViewModel.toHTTP),
    };
  }

  @SubscribeMessage(ROOM_EVENTS.SEND_OFFER)
  async handleOnSendOffer(
    @ConnectedSocket() client: any,
    @MessageBody() data: SendOfferRequest,
  ) {
    const { room } = await this.roomsService.findRoom(data.roomId);

    if (!room.users.includes(client.id) || !room.users.includes(data.id)) {
      throw new UserNotInRoom();
    }

    const isAdmin = room.owner === client.id;

    if (!isAdmin) {
      throw new NotPartyOwner();
    }

    this.server.to(data.id).emit(ROOM_EVENTS.RECEIVE_OFFER, {
      offer: data.offer,
      id: client.id,
    });
  }
}
