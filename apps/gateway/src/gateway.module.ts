import { Module } from '@nestjs/common';
import { AuthController } from './app/controllers/auth.controller';
import { GatewayService } from './app/gateway.service';
import { SERVICES } from '@shared/constants';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@shared/rmq.module';
import { DatabaseModule } from '@shared/database.module';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule, RmqModule.registerMultipleAsync([SERVICES.AUTH])],
  controllers: [AuthController],
  providers: [GatewayService],
})
export class GatewayModule {}
