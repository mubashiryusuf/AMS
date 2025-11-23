import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from '@shared';

@Controller()
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @MessagePattern('teacher.create-teacher')
  create(data: CreateTeacherDto) {
    return this.teacherService.create(data);
  }

  @MessagePattern('teacher.all-teachers')
  findAll() {
    return this.teacherService.findAll();
  }

  @MessagePattern('teacher.teacher')
  findOne(data: { id: string }) {
    return this.teacherService.findOne(data.id);
  }

  @MessagePattern('teacher.update-teacher')
  update(data: any) {
    return this.teacherService.update(data.id, data);
  }

  @MessagePattern('teacher.delete-teacher')
  delete(data: { id: string }) {
    return this.teacherService.delete(data.id);
  }
}
