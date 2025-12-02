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
import { CreateTeacherDetailsDto, Roles, UpdateTeacherDetailsDto } from '@shared';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('teacher')
@ApiTags('Teacher details')
@ApiBearerAuth()
export class TeacherDetailsController {
  constructor(private readonly teacherService: TeacherDetailsService) {}

  @Roles('admin')
  @Post('create')
  async create(@Body() dto: CreateTeacherDetailsDto) {
    return this.teacherService.create(dto);
  }

  @Roles('admin', 'teacher')
  @Get('get-all')
  async findAll() {
    return this.teacherService.findAll();
  }

  @Roles('admin', 'teacher')
  @Get('get-one/:id')
  async findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @Roles('admin')
  @Delete('delete-teacher/:id')
  async delete(@Param('id') id: string) {
    return this.teacherService.delete(id);
  }
}
