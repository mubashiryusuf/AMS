import { Module } from '@nestjs/common';
import { StudentController } from './app/student.controller';
import { StudentService } from './app/student.service';
import { RmqModule, SharedModule, SERVICES } from '@shared';

@Module({
  imports: [SharedModule, RmqModule.registerMultipleAsync([SERVICES.STUDENT])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
