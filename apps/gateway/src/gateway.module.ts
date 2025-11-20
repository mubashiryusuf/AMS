import { Module } from '@nestjs/common';
import { AuthController } from './app/controllers/auth.controller';
import { SERVICES, RmqModule, SharedModule } from '@shared';
import { AuthService } from './app/services/auth.service';


@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.AUTH]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class GatewayModule {}
