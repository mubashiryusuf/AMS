import { Controller } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { CreateClassDto, UpdateClassDto } from '@shared';
import { ClassService } from './class.service';

@Controller()
export class ClassController {
  constructor(private readonly classService: ClassService) {}
  create(@Payload() dto: CreateClassDto) {
    return this.classService.create(dto);
  }

  findAll() {
    return this.classService.findAll();
  }

  findOne(@Payload() id: string) {
    return this.classService.findOne(id);
  }

  update(@Payload() data: { id: string; dto: UpdateClassDto }) {
    return this.classService.update(data.id, data.dto);
  }

  delete(@Payload() id: string) {
    return this.classService.delete(id);
  }
}
