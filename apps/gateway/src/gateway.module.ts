import { Module } from '@nestjs/common';
import {
  SERVICES,
  RmqModule,
  AuthStrategy,
  SharedModule,
  RoleBaseGuardsGuard,
  AuditInterceptor,
} from '@shared';
import {
  AttendanceController,
  AuthController,
  ClassController,
  TeacherDetailsController,
} from './app/controllers';
import {
  AttendanceService,
  AuthService,
  ClassService,
  TeacherDetailsService,
} from './app/services';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
    ClientsModule.register([
      {
        name: 'AUDIT_CLIENT',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: 'audit-queue',
        },
      },
    ]),
  ],
  controllers: [
    AuthController,
    ClassController,
    AttendanceController,
    TeacherDetailsController,
  ],
  providers: [
    AuthStrategy,
    {
      provide: APP_GUARD,
      useClass: RoleBaseGuardsGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
    AuthService,
    ClassService,
    AttendanceService,
    TeacherDetailsService,
  ],
})
export class GatewayModule {}
