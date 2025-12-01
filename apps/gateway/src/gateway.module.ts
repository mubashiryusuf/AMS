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
  TeacherDetailsController,
} from './app/controllers';
import { AttendanceService, AuthService, ClassService, TeacherDetailsService } from './app/services';
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
      SERVICES.TEACHER,
    ]),
  ],
  controllers: [AuthController, ClassController, AttendanceController,TeacherDetailsController],
  providers: [
    AuthStrategy,
    {
      provide: APP_GUARD,
      useClass: RoleBaseGuardsGuard,
    },
    AuthService,
    ClassService,
    AttendanceService,
    TeacherDetailsService
  ],
})
export class GatewayModule {}
