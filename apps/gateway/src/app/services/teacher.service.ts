import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTeacherDto, SERVICES, UpdateTeacherDto } from '@shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TeacherService {
  constructor(@Inject(SERVICES.TEACHER) private teacherClient: ClientProxy) {}

  private handleError(error: any) {
    return {
      status: 'error',
      message: error?.message || 'Internal server error',
      statusCode: error?.statusCode || error?.status || 500,
    };
  }

  // CREATE
  async create(body: CreateTeacherDto) {
    return firstValueFrom(
      this.teacherClient.send('teacher.create-teacher', body)
    ).catch((err) => this.handleError(err));
  }

  // FIND ALL
  async findAll() {
    return firstValueFrom(
      this.teacherClient.send('teacher.all-teachers', {})
    ).catch((err) => this.handleError(err));
  }

  // FIND ONE
  async findOne(id: string) {
    return firstValueFrom(
      this.teacherClient.send('teacher.teacher',  id )
    ).catch((err) => this.handleError(err));
  }

  // UPDATE
  async update(id: string, body: UpdateTeacherDto) {
    return firstValueFrom(
      this.teacherClient.send('teacher.update-teacher', { id, body })
    ).catch((err) => this.handleError(err));
  }

  // DELETE
  async delete(id: string) {
    return firstValueFrom(
      this.teacherClient.send('teacher.delete-teacher',  id )
    ).catch((err) => this.handleError(err));
  }
}
