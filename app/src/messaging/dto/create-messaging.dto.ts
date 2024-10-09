import { ApiProperty } from '@nestjs/swagger';

export class CreateMessagingDto {
  @ApiProperty()
  messages: string;
}
