import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './auth.module';
import { Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule,{
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URI || 'amqp://localhost:5672'],
      queue: SERVICES.AUTH,
      queueOptions: {
        durable: true,
      },
      socketOptions: {
        heartbeatIntervalInSeconds: 60,
        reconnectTimeInSeconds: 5,
      },
    },
  });
  await app.listen();
  Logger.log(
    `🚀 Application is running`
  );
}

bootstrap();
