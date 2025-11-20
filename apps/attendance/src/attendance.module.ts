import { Module } from '@nestjs/common';
import { AttendanceController } from './app/attendance.controller';
import { AttendanceService } from './app/attendance.service';
import { RmqModule, SharedModule, SERVICES } from '@shared';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.ATTENDANCE]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
