import { Controller, Post, Body, Get, Param, Query, Req } from '@nestjs/common';
import { AttendanceService } from '../services';
import { MarkAttendanceDto, Roles } from '@shared';
import { ApiBearerAuth } from '@nestjs/swagger';


@Controller('attendance')
@ApiBearerAuth()
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // Teacher marks attendance
  @Post('mark')
  @Roles('teacher')
  async markAttendance(@Body() dto: MarkAttendanceDto, @Req() req) {
    // const teacherId = req.user.userId;
     const teacherId = req.user?.sub;
    return this.attendanceService.markAttendance(dto, teacherId);
  }

  // Student views own attendance
  @Get('student/:id')
  @Roles('student')
  async getStudentAttendance(
    @Param('id') studentId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.attendanceService.getStudentAttendance(studentId, from, to);
  }

  // Admin views full report
  @Get('admin/report')
  @Roles('admin')
  async getFullReport() {
    return this.attendanceService.getFullReport();
  }
}
