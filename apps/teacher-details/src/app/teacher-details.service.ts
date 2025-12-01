// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { CreateTeacherDetailsDto, TeacherDetails, UpdateTeacherDetailsDto } from '@shared';
// import { Model } from 'mongoose';

// @Injectable()
// export class TeacherDetailsService {
//   constructor(
//     @InjectModel(TeacherDetails.name) private teacherModel: Model<TeacherDetails>,
//   ) {}

//   // CREATE
//   async create(dto: CreateTeacherDetailsDto) {
//     const teacher = new this.teacherModel(dto);
//     return teacher.save();
//   }

//   // FIND ALL
//   async findAll() {
//     return this.teacherModel.find();
//   }

//   // UPDATE
//   async update(id: string, body: UpdateTeacherDetailsDto) {
//     const updated = await this.teacherModel.findByIdAndUpdate(id, body, {
//       new: true,
//     });

//     if (!updated) throw new NotFoundException('Teacher not found');
//     return updated;
//   }

//   // DELETE
//   async delete(id: string) {
//     const deleted = await this.teacherModel.findByIdAndDelete(id);
//     if (!deleted) throw new NotFoundException('Teacher not found');
//     return deleted;
//   }
// }

// teacher-details.service.ts
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

  create(dto: CreateTeacherDetailsDto) {
    return this.teacherDetailsModel.create(dto);
  }

  findAll() {
    return this.teacherDetailsModel.find();
  }

  async findOne(id: string) {
    return this.teacherDetailsModel.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'teachers',
          localField: 'teacherId',
          foreignField: '_id',
          as: 'teacher',
        },
      },
      { $unwind: '$teacher' },

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
}
