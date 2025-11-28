import { Module } from '@nestjs/common';
import { SERVICES, RmqModule, SharedModule,RoleBaseGuardsGuard ,AuthStrategy} from '@shared';
import {AuthController,ClassController,StudentController, TeacherController} from './app/controllers';
import {AuthService,ClassService,StudentService, TeacherService} from './app/services';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule,
    SharedModule,
    RmqModule.registerMultipleAsync([
      SERVICES.AUTH,
      SERVICES.STUDENT,
      SERVICES.TEACHER,
      SERVICES.CLASS,
      SERVICES.ATTENDANCE
    ]),
  ],
  controllers: [AuthController, StudentController,TeacherController, ClassController ],
  providers: [
    AuthStrategy,
    {
      provide: APP_GUARD,
      useClass: RoleBaseGuardsGuard,
    },
    AuthService, StudentService, TeacherService,ClassService],
})
export class GatewayModule {}
