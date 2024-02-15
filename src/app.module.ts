import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { RoomsGateway } from './gateways/rooms.gateway';
import { RoomsRepository } from './repositories/rooms.repository';
import { RedisRoomsRepository } from './db/redis/repositories/redis-rooms-repository';
import { RoomsController } from './controllers/rooms.controller';
import { RoomsService } from './services/rooms.service';
import { UsersRepository } from './repositories/users.repository';
import { RedisUsersRepository } from './db/redis/repositories/redis-users-respository';
import { UsersService } from './services/users.service';

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
    {
      provide: UsersRepository,
      useClass: RedisUsersRepository,
    },
    UsersService,
  ],
})
export class AppModule {}
