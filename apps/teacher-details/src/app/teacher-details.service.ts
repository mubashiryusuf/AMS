import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTeacherDetailsDto, TeacherDetails } from '@shared';
import { Model, Types } from 'mongoose';

@Injectable()
export class TeacherDetailsService {
  constructor(
    @InjectModel(TeacherDetails.name)
    private teacherDetailsModel: Model<TeacherDetails>,
  ) {}

  async create(dto: CreateTeacherDetailsDto) {
    try {
      const teacherDetailsData = {
        teacherId: dto.teacherId,
        classId: new Types.ObjectId(dto.classId),
        studentId: new Types.ObjectId(dto.studentId),
      };
      return await this.teacherDetailsModel.create(teacherDetailsData);
    } catch (error) {
      throw new Error(`Failed to create teacher details: ${error.message}`);
    }
  }

  async findAll() {
    return this.teacherDetailsModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'teacherId',
          foreignField: 'teacherId',
          as: 'teacher',
        },
      },
      { $unwind: '$teacher' },
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
    ]);
  }

  async findOne(id: string) {
    const result = await this.teacherDetailsModel.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'users',
          localField: 'teacherId',
          foreignField: 'teacherId',
          as: 'teacher',
        },
      },
      { $unwind: '$teacher' },
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
    ]);
    return result.length > 0 ? result[0] : null;
  }

  async delete(id: string) {
    try {
      const deleted = await this.teacherDetailsModel.findByIdAndDelete(new Types.ObjectId(id));
      
      if (!deleted) {
        throw new Error('Teacher details not found');
      }

      return deleted;
    } catch (error) {
      throw new Error(`Failed to delete teacher details: ${error.message}`);
    }
  }
}
