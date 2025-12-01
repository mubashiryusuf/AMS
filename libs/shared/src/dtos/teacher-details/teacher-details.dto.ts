// teacher-details.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class CreateTeacherDetailsDto {
  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  teacherId: string;

  @ApiProperty()
  @IsMongoId()
  @IsNotEmpty()
  classId: string;
}

export class UpdateTeacherDetailsDto {
  @IsMongoId()
  teacherId?: string;

  @IsMongoId()
  classId?: string;
}
