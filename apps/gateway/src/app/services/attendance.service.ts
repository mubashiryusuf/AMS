import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MarkAttendanceDto, SERVICES } from '@shared';


@Injectable()
export class AttendanceService {
  constructor(
    @Inject(SERVICES.ATTENDANCE) private attendanceClient: ClientProxy,
  ) {}

  // Teacher marks attendance
  markAttendance(dto: MarkAttendanceDto, teacherId: string) {
    return this.attendanceClient.send('attendance.mark', { dto, teacherId });
  }

  // Student views own attendance
  getStudentAttendance(studentId: string, from?: string, to?: string) {
    return this.attendanceClient.send('attendance.student-attendance', { studentId, from, to });
  }

  // Admin full report
  getFullReport() {
    return this.attendanceClient.send('attendance.full-report', {});
  }
}
