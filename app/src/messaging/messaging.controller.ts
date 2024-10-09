import { Controller, Post, Body } from '@nestjs/common';
import { MessagingService } from './messaging.service';
import { CreateMessagingDto } from './dto/create-messaging.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Messaging')
@Controller('messaging')
export class MessagingController {
  constructor(private readonly messagingService: MessagingService) {}

  @Post()
  create(@Body() createMessagingDto: CreateMessagingDto) {
    return this.messagingService.create(createMessagingDto);
  }
}
