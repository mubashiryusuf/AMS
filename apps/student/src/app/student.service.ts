import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateStudentDto, Student } from '@shared';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>
  ) {}
  // CREATE
  async create(dto: CreateStudentDto) {
    const student = new this.studentModel(dto);
    return student.save();
  }

  // GET ALL
  async findAll() {
    return this.studentModel.find().populate('classId');
  }
  // GET BY ID
  async findOne(id: string) {
    const student = await this.studentModel.findById(id).populate('classId');
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  // UPDATE
  async update(id: string, updateData: Partial<CreateStudentDto>) {
    const updated = await this.studentModel.findByIdAndUpdate(id, updateData, {
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
