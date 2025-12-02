import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MarkAttendanceDto, SERVICES } from '@shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AttendanceService {
  constructor(
    @Inject(SERVICES.ATTENDANCE) private attendanceClient: ClientProxy,
  ) {}

  private handleError(error: any) {
    return {
      status: 'error',
      message: error?.message || 'Internal server error',
      statusCode: error?.statusCode || error?.status || 500,
    };
  }

  // Teacher marks attendance
  async markAttendance(dto: MarkAttendanceDto, teacherId: string) {
    return firstValueFrom(
      this.attendanceClient.send('attendance.mark', { dto, teacherId })
    ).catch((err) => this.handleError(err));
  }

  // Student views own attendance
  async getStudentAttendance(studentId: string, from?: string, to?: string) {
    return firstValueFrom(
      this.attendanceClient.send('attendance.student-attendance', { studentId, from, to })
    ).catch((err) => this.handleError(err));
  }

  // Admin full report
  async getFullReport() {
    return firstValueFrom(
      this.attendanceClient.send('attendance.full-report', {})
    ).catch((err) => this.handleError(err));
  }
}
