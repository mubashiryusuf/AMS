import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto, UpdateTeacherDto } from '@shared';

@Controller()
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @MessagePattern('teacher.create-teacher')
  async create(data: CreateTeacherDto) {
    return this.teacherService.create(data);
  }

  @MessagePattern('teacher.all-teachers')
  async findAll() {
    return this.teacherService.findAll();
  }

  @MessagePattern('teacher.teacher')
  async findOne(data: { id: string }) {
    return this.teacherService.findOne(data.id);
  }

  @MessagePattern('teacher.update-teacher')
  async update(data: { id: string, body: UpdateTeacherDto }) {
    return this.teacherService.update(data.id, data.body);
  }

  @MessagePattern('teacher.delete-teacher')
  async delete(data: { id: string }) {
    return this.teacherService.delete(data.id);
  }
}
