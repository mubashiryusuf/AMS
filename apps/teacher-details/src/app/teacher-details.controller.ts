// import { Controller } from '@nestjs/common';
// import { MessagePattern } from '@nestjs/microservices';
// import { TeacherDetailsService } from './teacher-details.service';
// import { CreateTeacherDetailsDto, UpdateTeacherDetailsDto } from '@shared';

// @Controller()
// export class TeacherDetailsController {
//   constructor(private readonly teacherService: TeacherDetailsService) {}

//   @MessagePattern('teacher.create-teacher')
//   async create(data: CreateTeacherDetailsDto) {
//     return this.teacherService.create(data);
//   }

//   @MessagePattern('teacher.all-teachers')
//   async findAll() {
//     return this.teacherService.findAll();
//   }

//   @MessagePattern('teacher.update-teacher')
//   async update(data: { id: string, body: UpdateTeacherDetailsDto }) {
//     return this.teacherService.update(data.id, data.body);
//   }

//   @MessagePattern('teacher.delete-teacher')
//   async delete(data: { id: string }) {
//     return this.teacherService.delete(data.id);
//   }
// }

// teacher-details.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TeacherDetailsService } from './teacher-details.service';
import { CreateTeacherDetailsDto } from '@shared';

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
}

