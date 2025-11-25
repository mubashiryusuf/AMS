import { Controller} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, UpdateStudentDto } from '@shared';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @MessagePattern('student.create-student')
  async create(dto: CreateStudentDto) {
    return this.studentService.create(dto);
  }

  @MessagePattern('student.get-all-students')
  async findAll() {
    return this.studentService.findAll();
  }

  @MessagePattern('student.get-student')
  async findOne(id: string) {
    return this.studentService.findOne(id);
  }

  @MessagePattern('student.update-student')
  async update(data:{id: string, body:UpdateStudentDto}) {
    return this.studentService.update(data.id, data.body);
  }

  @MessagePattern('student.delete-student')
  async remove(id: string) {
    return this.studentService.remove(id);
  }
}
