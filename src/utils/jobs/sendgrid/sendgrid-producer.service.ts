import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendGridProducerService {
  constructor(@InjectQueue('sendGrid-queue') private queue: Queue) {}

  async sendMail(mail: SendGrid.MailDataRequired) {
    await this.queue.add('sendGrid-job', mail, {
      attempts: 3,
      priority: 3,
      removeOnComplete: true,
      removeOnFail: false,
      lifo: true,
    });
  }
}
