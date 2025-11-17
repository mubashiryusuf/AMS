import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { SERVICES } from '@shared/constants';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      envFilePath:".env"
    }),
    ClientsModule.registerAsync(Object.values(SERVICES).map((service) => {
      return {
        name: service,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [
              config.get<string>('RMQ_URL')
            ],
            queue: config.get<string>(`RMQ_${service}_QUEUE`),
            queueOptions: {
              durable: false,
            },
          }
        }),
      };
    })),
     
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
