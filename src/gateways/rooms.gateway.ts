import { Logger } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway()
export class RoomsGateway {
  private readonly logger = new Logger(RoomsGateway.name);

  @SubscribeMessage('room/create')
  handleMessage(client: any, payload: any): string {
    this.logger.log(`Receiving message from user ${client.id}`);
    this.logger.log(payload);
    return 'Hello world!';
  }
}
