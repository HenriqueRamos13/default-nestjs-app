import {
  Processor,
  Process,
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
} from '@nestjs/bull';
import * as SendGrid from '@sendgrid/mail';
import { Job } from 'bull';
import 'dotenv/config';

@Processor('sendGrid-queue')
export class SendGridConsumer {
  constructor() {
    SendGrid.setApiKey(process.env.SEND_GRID_KEY);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
    );
  }

  @OnQueueCompleted()
  onCompleted(job: Job) {
    console.log(
      `Job ${job.id} of type ${job.name} with data ${job.data} completed!`,
    );
  }

  @OnQueueFailed()
  onFailed(job: Job, err: Error) {
    console.log(
      `Job ${job.id} of type ${job.name} with data ${job.data} failed!`,
    );
    console.log(err);
  }

  @Process('sendGrid-job')
  async sendMailJob(job: Job) {
    await SendGrid.send({
      ...job.data,
      from: process.env.SEND_GRID_VALID_EMAIL,
      mailSettings: {
        sandboxMode: {
          enable: false,
        },
      },
    });
  }
}
