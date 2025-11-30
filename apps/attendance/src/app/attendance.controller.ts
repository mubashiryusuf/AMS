import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AttendanceService } from './attendance.service';
import { MarkAttendanceDto } from '@shared';

@Controller()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // Teacher marks attendance
  @MessagePattern('attendance.mark')
  async mark(@Payload() data: { dto: MarkAttendanceDto; teacherId: string }) {
    const { dto, teacherId } = data;
    return this.attendanceService.markAttendance(dto, teacherId);
  }

  // Student views own attendance
  @MessagePattern('attendance.student-attendance')
  async studentAttendance(@Payload() data: { studentId: string; from?: string; to?: string }) {
    return this.attendanceService.getStudentAttendance(data.studentId, data.from, data.to);
  }

  // Admin full report
  @MessagePattern('attendance.full-report')
  async adminReport() {
    return this.attendanceService.getFullReport();
  }
}
