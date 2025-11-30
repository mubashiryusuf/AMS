// attendance.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Attendance, MarkAttendanceDto } from '@shared';
import { Model, Types } from 'mongoose';
import { PipelineStage } from 'mongoose';



@Injectable()
export class AttendanceService {
  constructor(
    @InjectModel(Attendance.name) private attendanceModel: Model<Attendance>,
  ) {}

  // Teacher marks attendance
  async markAttendance(dto: MarkAttendanceDto, teacherId: string) {
    const date = new Date(dto.date);
    date.setHours(0, 0, 0, 0); // normalize date

    const updated = await this.attendanceModel.findOneAndUpdate(
      { classId: dto.classId, date },
      { $set: { entries: dto.entries, markedBy: teacherId, updatedAt: new Date() } },
      { upsert: true, new: true },
    );

    return updated;
  }

  // Student views own attendance
  async getStudentAttendance(studentId: string, from?: string, to?: string) {
    const match: any = { 'entries.studentId': new Types.ObjectId(studentId) };

    if (from || to) {
      match.date = {};
      if (from) match.date.$gte = new Date(from);
      if (to) match.date.$lte = new Date(to);
    }

    const pipeline : PipelineStage[] = [
      { $match: match },
      { $unwind: '$entries' },
      { $match: { 'entries.studentId': new Types.ObjectId(studentId) } },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          as: 'class'
        }
      },
      { $unwind: '$class' },
      {
        $project: {
          date: 1,
          status: '$entries.status',
          remark: '$entries.remark',
          className: '$class.name'
        }
      },
      { $sort: { date: -1 } }
    ];

    return this.attendanceModel.aggregate(pipeline);
  }

  // Admin full report
  async getFullReport() {
    const pipeline : PipelineStage[] = [
      { $unwind: '$entries' },
      {
        $lookup: {
          from: 'users',
          localField: 'entries.studentId',
          foreignField: '_id',
          as: 'student'
        }
      },
      { $unwind: '$student' },
      {
        $lookup: {
          from: 'users',
          localField: 'markedBy',
          foreignField: '_id',
          as: 'teacher'
        }
      },
      { $unwind: '$teacher' },
      {
        $lookup: {
          from: 'classes',
          localField: 'classId',
          foreignField: '_id',
          as: 'class'
        }
      },
      { $unwind: '$class' },
      {
        $project: {
          date: 1,
          status: '$entries.status',
          remark: '$entries.remark',
          studentName: '$student.fullName',
          teacherName: '$teacher.fullName',
          className: '$class.name'
        }
      },
      { $sort: { date: -1, className: 1 } }
    ];

    return this.attendanceModel.aggregate(pipeline);
  }
}
