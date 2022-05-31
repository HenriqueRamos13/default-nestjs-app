import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SendGridModule } from '../utils/jobs/sendgrid/sendgrid.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [SendGridModule, PrismaModule],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
