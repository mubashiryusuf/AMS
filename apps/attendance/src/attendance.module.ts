import { Module } from '@nestjs/common';
import {
  RmqModule,
  SharedModule,
  SERVICES,
  Attendance,
  AttendanceSchema,
} from '@shared';
import { AttendanceController } from './app/attendance.controller';
import { AttendanceService } from './app/attendance.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Attendance.name, schema: AttendanceSchema },
    ]),
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.ATTENDANCE]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
