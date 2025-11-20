import { Module } from '@nestjs/common';
import { TeacherController } from './app/teacher.controller';
import { TeacherService } from './app/teacher.service';
import { RmqModule, SharedModule, SERVICES } from '@shared';

@Module({
  imports: [SharedModule, RmqModule.registerMultipleAsync([SERVICES.TEACHER])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
