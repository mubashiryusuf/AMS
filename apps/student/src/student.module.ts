import { Module } from '@nestjs/common';
import { StudentController } from './app/student.controller';
import { StudentService } from './app/student.service';
import { RmqModule, SharedModule, SERVICES, Student, StudentSchema } from '@shared';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.STUDENT]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
