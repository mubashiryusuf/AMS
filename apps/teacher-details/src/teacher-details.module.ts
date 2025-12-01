import { Module } from '@nestjs/common';
import { TeacherDetailsController } from './app/teacher-details.controller';
import { TeacherDetailsService } from './app/teacher-details.service';
import {
  RmqModule,
  SharedModule,
  SERVICES,
  TeacherDetailsSchema,
  TeacherDetails,
} from '@shared';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TeacherDetails.name, schema: TeacherDetailsSchema },
    ]),
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.TEACHER]),
  ],
  controllers: [TeacherDetailsController],
  providers: [TeacherDetailsService],
})
export class TeacherModule {}
