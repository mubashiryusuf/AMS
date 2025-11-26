import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ClassService } from '../services/class.service';
import { CreateClassDto, UpdateClassDto } from '@shared';

@Controller('class')
export class ClassController {
  constructor(private readonly classService: ClassService) {}

  @Post()
  async create(@Body() dto: CreateClassDto) {
    console.log('create class', dto);
    return this.classService.create(dto);
  }

  @Get()
  async findAll() {
    return this.classService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.classService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateClassDto) {
    return this.classService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.classService.remove(id);
  }
}
