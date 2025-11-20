import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ClassModule } from './class.module';
import { Transport } from '@nestjs/microservices';
import { SERVICES } from '@shared';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ClassModule,{
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RMQ_URI || 'amqp://localhost:5672'],
      queue: SERVICES.CLASS,
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
