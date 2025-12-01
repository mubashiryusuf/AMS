import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClassService } from '../services/class.service';
import { CreateClassDto, Roles, UpdateClassDto } from '@shared';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('class')
@ApiTags('Classes')
@ApiBearerAuth()

export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Roles('admin')
  @Post()
  async create(@Body() dto: CreateClassDto) {
    return this.classService.create(dto);
  }

  @Roles('admin', 'teacher')
  @Get('get-all')
  async findAll() {
    return this.classService.findAll();
  }

  @Roles('admin', 'teacher')
  @Get('get-class/:id')
  async findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @Roles('admin')
  @Patch('update-class/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateClassDto) {
    return this.classService.update(id, dto);
  }

  @Roles('admin')
  @Delete('delete-class/:id')
  async delete(@Param('id') id: string) {
    return this.classService.remove(id);
  }
}
