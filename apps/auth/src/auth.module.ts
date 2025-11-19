import { Module } from '@nestjs/common';
import { AuthController } from './app/auth.controller';
import { AuthService } from './app/auth.service';
import { RmqModule } from '@shared/rmq.module';
import { SERVICES } from '@shared/constants';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [SharedModule, RmqModule.registerMultipleAsync([SERVICES.AUTH])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
