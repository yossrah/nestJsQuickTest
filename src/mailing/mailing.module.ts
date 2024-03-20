import { Module } from '@nestjs/common';
import { MailingController } from './mailing.controller';
import { ConfigModule } from '@nestjs/config';
import { MailingService } from './mailing.service';

@Module({
  imports:[ConfigModule],
  controllers: [MailingController],
  providers:[MailingService]
})
export class MailingModule {}
