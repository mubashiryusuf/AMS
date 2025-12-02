import {
  IsEnum,
  IsMongoId,
  IsDateString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AttendanceStatus } from '../../schemas';

export class MarkAttendanceDto {
  @ApiProperty({ example: '64b7f7a6f1a4e3c2d8b67890', description: 'Mongo ID of the class' })
  @IsMongoId()
  classId: string;

  @ApiProperty({ example: '64b7f7a6f1a4e3c2d8b67890', description: 'Mongo ID of the student' })
  @IsMongoId()
  studentId: string;

  @ApiProperty({ example: 'present', description: 'Status of the attendance' })
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @ApiProperty({ example: '2025-11-30', description: 'Date of attendance in YYYY-MM-DD format' })
  @IsDateString()
  date: string;
}
