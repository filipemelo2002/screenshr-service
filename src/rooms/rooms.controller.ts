import { Body, Controller, Post } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomBody } from 'src/dtos/create-room-body';

@Controller('rooms')
export class RoomsController {
  constructor(private roomsService: RoomsService) {}

  @Post()
  async createRoom(@Body() body: CreateRoomBody) {
    await this.roomsService.createRoom(body);
  }
}
