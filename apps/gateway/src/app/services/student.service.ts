import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateStudentDto, SERVICES, UpdateStudentDto } from '@shared';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class StudentService {
  constructor(@Inject(SERVICES.STUDENT) private studentClient: ClientProxy) {}

  async create(body: CreateStudentDto) {
    try {
      const result = await firstValueFrom(
        this.studentClient.send('student.create-student', body)
      );
      return result;
    } catch (error) {
      console.error('create student error:', error);
      return {
        status: 'error',
        message:
          error?.message || error?.response?.message || 'Internal server error',
        statusCode: error?.status || error?.statusCode || 500,
      };
    }
  }

  async findAll() {
    try {
      return await firstValueFrom(
        this.studentClient.send('student.get-all-students', {})
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.studentClient.send('student.get-student', id )
      );
    } catch (error) {
      return this.handleError(error);
    }
  }


  async update(id: string, body: UpdateStudentDto) {
    try {
      return await firstValueFrom(
        this.studentClient.send('student.update-student', { id, body })
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  async delete(id: string) {
    try {
      return await firstValueFrom(
        this.studentClient.send('student.delete-student', id )
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  private handleError(error: any) {
    return {
      status: 'error',
      message:
        error?.message || error?.response?.message || 'Internal server error',
      statusCode: error?.statusCode || error?.status || 500,
    };
  }
}
