import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto, Student, UpdateStudentDto } from '@shared';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>
  ) {}
  // CREATE
  async create(dto: CreateStudentDto) {
    console.log('create student service', dto);
    const student = new this.studentModel(dto);
    return student.save();
  }

  // GET ALL
  async findAll() {
    const result = await this.studentModel.aggregate([
      {
        $lookup: {
          from: "classes",        
          localField: "classId",      
          foreignField: "_id",          
          as: "classDetails"     
                 // output array ka naam
        },
      },
      {
        $unwind: "$classDetails",
      },
      {
        $project: {
          _id: 1,
          fullName: 1,
          email: 1,
          age: 1,
          createdAt: 1,
          classDetails: {
            _id: '$classDetails._id',
            name: '$classDetails.name',
          },
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);
    return result;
  }

  // UPDATE
  async update(id: string, body: UpdateStudentDto) {
    const updated = await this.studentModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updated) throw new NotFoundException('Student not found');
    return updated;
  }

  // DELETE
  async remove(id: string) {
    const deleted = await this.studentModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Student not found');
    return deleted;
  }
}
