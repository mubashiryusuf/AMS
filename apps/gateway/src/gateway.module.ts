import { Module } from '@nestjs/common';
import { SERVICES, RmqModule, SharedModule } from '@shared';
import {AuthController,ClassController,StudentController, TeacherController} from './app/controllers';
import {AuthService,ClassService,StudentService, TeacherService} from './app/services';


@Module({
  imports: [
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
  providers: [AuthService, StudentService, TeacherService,ClassService],
})
export class GatewayModule {}
