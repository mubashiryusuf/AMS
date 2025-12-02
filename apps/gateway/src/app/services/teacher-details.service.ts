import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateTeacherDetailsDto, SERVICES, UpdateTeacherDetailsDto } from '@shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TeacherDetailsService {
  constructor(@Inject(SERVICES.TEACHER) private teacherClient: ClientProxy) {}

  private handleError(error: any) {
    return {
      status: 'error',
      message: error?.message || 'Internal server error',
      statusCode: error?.statusCode || error?.status || 500,
    };
  }

  // CREATE
  async create(body: CreateTeacherDetailsDto) {
    return firstValueFrom(
      this.teacherClient.send('teacherDetails.create', body)
    ).catch((err) => this.handleError(err));
  }

  // FIND ALL
  async findAll() {
    return firstValueFrom(
      this.teacherClient.send('teacherDetails.get-all', {})
    ).catch((err) => this.handleError(err));
  }


  // FIND ONE
  async findOne(id: string) {
    return firstValueFrom(
      this.teacherClient.send('teacherDetails.get-one', id)
    ).catch((err) => this.handleError(err));
  }


  // DELETE
  async delete(id: string) {
    return firstValueFrom(
      this.teacherClient.send('teacherDetails.delete', id)
    ).catch((err) => this.handleError(err));
  }
}
