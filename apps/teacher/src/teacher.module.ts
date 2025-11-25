import { Module } from '@nestjs/common';
import { TeacherController } from './app/teacher.controller';
import { TeacherService } from './app/teacher.service';
import {
  RmqModule,
  SharedModule,
  SERVICES,
  Teacher,
  TeacherSchema,
} from '@shared';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }]),
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.TEACHER]),
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
