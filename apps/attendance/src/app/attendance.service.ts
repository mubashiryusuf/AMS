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
    try {
      const date = new Date(dto.date);
      date.setHours(0, 0, 0, 0); // normalize date

      const attendanceData = {
        classId: new Types.ObjectId(dto.classId),
        studentId: new Types.ObjectId(dto.studentId),
        status: dto.status,
        date: date,
      };

      // Use upsert to create if doesn't exist, update if exists
      const attendance = await this.attendanceModel.findOneAndUpdate(
        { 
          classId: attendanceData.classId, 
          studentId: attendanceData.studentId, 
          date: attendanceData.date 
        },
        { $set: attendanceData },
        { new: true, upsert: true, runValidators: true }
      );

      return attendance;
    } catch (error) {
      throw new Error(`Failed to mark attendance: ${error.message}`);
    }
  }

  // Student views own attendance
  async getStudentAttendance(studentId: string, from?: string, to?: string) {
    try {
      const match: any = { studentId: new Types.ObjectId(studentId) };

      if (from || to) {
        match.date = {};
        if (from) {
          const fromDate = new Date(from);
          fromDate.setHours(0, 0, 0, 0);
          match.date.$gte = fromDate;
        }
        if (to) {
          const toDate = new Date(to);
          toDate.setHours(23, 59, 59, 999);
          match.date.$lte = toDate;
        }
      }

      const pipeline: PipelineStage[] = [
        { $match: match },
        {
          $lookup: {
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'class',
          },
        },
        { $unwind: '$class' },
        {
          $lookup: {
            from: 'users',
            localField: 'studentId',
            foreignField: '_id',
            as: 'student',
          },
        },
        { $unwind: '$student' },
        {
          $project: {
            _id: 1,
            date: 1,
            status: 1,
            class: {
              _id: '$class._id',
              name: '$class.name',
            },
            student: {
              _id: '$student._id',
              fullName: '$student.fullName',
              email: '$student.email',
            },
          },
        },
        { $sort: { date: -1 } },
      ];

      return this.attendanceModel.aggregate(pipeline);
    } catch (error) {
      throw new Error(`Failed to get student attendance: ${error.message}`);
    }
  }

  // Admin full report
  async getFullReport() {
    try {
      const pipeline: PipelineStage[] = [
        {
          $lookup: {
            from: 'users',
            localField: 'studentId',
            foreignField: '_id',
            as: 'student',
          },
        },
        { $unwind: '$student' },
        {
          $lookup: {
            from: 'classes',
            localField: 'classId',
            foreignField: '_id',
            as: 'class',
          },
        },
        { $unwind: '$class' },
        {
          $project: {
            _id: 1,
            date: 1,
            status: 1,
            student: {
              _id: '$student._id',
              fullName: '$student.fullName',
              email: '$student.email',
              roleNo: '$student.roleNo',
            },
            class: {
              _id: '$class._id',
              name: '$class.name',
            },
          },
        },
        { $sort: { date: -1, 'class.name': 1 } },
      ];

      return this.attendanceModel.aggregate(pipeline);
    } catch (error) {
      throw new Error(`Failed to get full report: ${error.message}`);
    }
  }
}
