import { Module } from '@nestjs/common';
import { AuthController } from './app/controllers/auth.controller';
import { GatewayService } from './app/gateway.service';
import { SERVICES, RmqModule, SharedModule } from '@shared';

@Module({
  imports: [SharedModule, RmqModule.registerMultipleAsync([SERVICES.AUTH])],
  controllers: [AuthController],
  providers: [GatewayService],
})
export class GatewayModule {}
