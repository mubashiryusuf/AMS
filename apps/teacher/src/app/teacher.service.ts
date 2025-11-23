import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateTeacherDto, Teacher } from '@shared';
import { Model } from 'mongoose';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher.name) private teacherModel: Model<Teacher>,
  ) {}

  // CREATE
  async create(dto: CreateTeacherDto) {
    const teacher = new this.teacherModel(dto);
    return teacher.save();
  }

  // FIND ALL
  async findAll() {
    return this.teacherModel
      .find()
      .populate('classes');
  }

  // FIND BY ID
  async findOne(id: string) {
    const teacher = await this.teacherModel
      .findById(id)
      .populate('classes');

    if (!teacher) throw new NotFoundException('Teacher not found');
    return teacher;
  }

  // UPDATE
  async update(id: string, body: Partial<CreateTeacherDto>) {
    const updated = await this.teacherModel.findByIdAndUpdate(id, body, {
      new: true,
    });

    if (!updated) throw new NotFoundException('Teacher not found');
    return updated;
  }

  // DELETE
  async delete(id: string) {
    const deleted = await this.teacherModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Teacher not found');
    return deleted;
  }
}
