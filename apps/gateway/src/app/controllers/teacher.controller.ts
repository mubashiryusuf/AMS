import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TeacherService } from '../services/teacher.service';
import { CreateTeacherDto, UpdateTeacherDto } from '@shared';
import { ApiTags } from '@nestjs/swagger';

@Controller('teacher')
@ApiTags('Teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post('create')
  async create(@Body() dto: CreateTeacherDto) {
    return this.teacherService.create(dto);
  }

  @Get('all')
  async findAll() {
    return this.teacherService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateTeacherDto) {
    return this.teacherService.update(id, dto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return this.teacherService.delete(id);
  }
}
