import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CreateTeacherDetailsDto {
  @ApiProperty()
  @IsNotEmpty()
  teacherId: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  classId: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  studentId: string;
}

export class UpdateTeacherDetailsDto extends PartialType(CreateTeacherDetailsDto) {}
