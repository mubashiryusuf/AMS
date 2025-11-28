import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateStudentDto, Roles, UpdateStudentDto } from '@shared';
import { StudentService } from '../services/student.service';

@Controller('student')
@ApiTags('Student')
@ApiBearerAuth('JWT-auth')
@ApiResponse({ status: 401, description: 'Unauthorized' })
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('create')
  async create(@Body() body: CreateStudentDto) {
    return this.studentService.create(body);
  }

  @Roles('student')
  @Get('all')
  async getAllStudents() {
    return this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() body: UpdateStudentDto) {
    return this.studentService.update(id, body);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.studentService.delete(id);
  }
}
