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
    const student = new this.studentModel(dto);
    return student.save();
  }

  // GET ALL
  async findAll() {
    return this.studentModel.find().populate('classId');
  }
  // GET BY ID
  async findOne(id: string) {
    console.log(id);
    const student = await this.studentModel.findById(id);
    console.log(student);
    if (!student) throw new NotFoundException('Student not found');
    return student;
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
