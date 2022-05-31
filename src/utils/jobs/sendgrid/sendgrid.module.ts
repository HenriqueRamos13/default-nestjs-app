import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { SendGridConsumer } from './sendgrid-consumer';
import { SendGridProducerService } from './sendgrid-producer.service';
import 'dotenv/config';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'sendGrid-queue',
    }),
  ],
  controllers: [],
  providers: [SendGridConsumer, SendGridProducerService],
  exports: [SendGridProducerService],
})
export class SendGridModule {}
