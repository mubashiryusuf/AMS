import { Module } from '@nestjs/common';
import {
  SERVICES,
  RmqModule,
  AuthStrategy,
  SharedModule,
  RoleBaseGuardsGuard,
} from '@shared';
import {
  AttendanceController,
  AuthController,
  ClassController,
} from './app/controllers';
import { AttendanceService, AuthService, ClassService } from './app/services';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'MY_SUPER_SECRET_KEY',
    }),
    SharedModule,
    RmqModule.registerMultipleAsync([
      SERVICES.AUTH,
      SERVICES.CLASS,
      SERVICES.ATTENDANCE,
    ]),
  ],
  controllers: [AuthController, ClassController, AttendanceController],
  providers: [
    AuthStrategy,
    {
      provide: APP_GUARD,
      useClass: RoleBaseGuardsGuard,
    },
    AuthService,
    ClassService,
    AttendanceService,
  ],
})
export class GatewayModule {}
