import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TeacherDetailsService } from './teacher-details.service';
import { CreateTeacherDetailsDto, UpdateTeacherDetailsDto } from '@shared';

@Controller()
export class TeacherDetailsController {
  constructor(private readonly service: TeacherDetailsService) {}

  @MessagePattern('teacherDetails.create')
  create(@Payload() dto: CreateTeacherDetailsDto) {
    return this.service.create(dto);
  }

  @MessagePattern('teacherDetails.get-all')
  findAll() {
    return this.service.findAll();
  }

  @MessagePattern('teacherDetails.get-one')
  findOne(@Payload() id: string) {
    return this.service.findOne(id);
  }


  @MessagePattern('teacherDetails.delete')
  delete(@Payload() id: string) {
    return this.service.delete(id);
  }
}

