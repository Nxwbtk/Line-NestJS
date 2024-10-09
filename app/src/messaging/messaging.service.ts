import { Injectable } from '@nestjs/common';
import { CreateMessagingDto } from './dto/create-messaging.dto';

@Injectable()
export class MessagingService {
  // I don't know how to use line lib and don't know where can i get the docs
  /**
   *
   * @param createMessagingDto messages for the user
   * @description I don't know how to use line lib and don't know where can i get the docs
   */
  async create(createMessagingDto: CreateMessagingDto) {
    const res = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.LINE_SECRET}`,
      },
      body: JSON.stringify({
        to: '',
        messages: [
          {
            type: 'text',
            text: `${createMessagingDto.messages}`,
          },
        ],
      }),
    });
    const data = await res.json();
    return data;
  }
}
