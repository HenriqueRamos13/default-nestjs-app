import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import Helmet from 'helmet';
import 'dotenv/config';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from './utils/pipes/validation.pipe';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ClassSerializerInterceptor } from '@nestjs/common';
import * as hpp from 'hpp';
import xss = require('xss-clean');
import { AppClusterService } from './app-cluster.service';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log('You are in ', process.env.NODE_ENV);

  const corsOptions = {
    origin:
      process.env.LOADERIO_ACTIVE === 'true'
        ? '*'
        : [
            process.env.PLATFORM_URL,
            process.env.LANDING_URL,
            ...process.env.OTHERS_URLS?.split(';'),
          ],
    credentials: true,
    allowedHeaders: 'Content-Type, Accept, Origin, Timestamp',
    preflightContinue: false,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  };

  app.enableCors(corsOptions);
  app.use(Helmet());
  app.use(cookieParser());
  app.set('trust proxy', 1);
  app.use(hpp());
  app.use(xss());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Game Swagger')
      .setDescription('The Game API description')
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3333, () =>
    console.log(`Started ${process.pid}`),
  );
}

AppClusterService.clusterize(bootstrap);
// bootstrap();
