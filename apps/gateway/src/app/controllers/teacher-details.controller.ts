import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TeacherDetailsService } from '../services/teacher-details.service';
import { CreateTeacherDto, UpdateTeacherDto } from '@shared';
import { ApiTags } from '@nestjs/swagger';

@Controller('teacher')
@ApiTags('Teacher')
export class TeacherDetailsController {
  constructor(private readonly teacherService: TeacherDetailsService) {}

  @Post('create')
  async create(@Body() dto: CreateTeacherDto) {
    return this.teacherService.create(dto);
  }

  @Get('get-all')
  async findAll() {
    return this.teacherService.findAll();
  }

  @Patch('update-teacher/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateTeacherDto) {
    return this.teacherService.update(id, dto);
  }

  @Delete('delete-teacher/:id')
  async delete(@Param('id') id: string) {
    return this.teacherService.delete(id);
  }
}
