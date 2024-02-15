import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomsGateway } from './rooms/rooms.gateway';
import { RoomsRepository } from './repositories/rooms.repository';
import { RedisRoomsRepository } from './db/redis/repositories/redis-rooms-repository';
import { RoomsController } from './rooms/rooms.controller';
import { RoomsService } from './rooms/rooms.service';

@Module({
  imports: [],
  controllers: [AppController, RoomsController],
  providers: [
    AppService,
    RoomsGateway,
    {
      provide: RoomsRepository,
      useClass: RedisRoomsRepository,
    },
    RoomsService,
  ],
})
export class AppModule {}
