import {
  IsMongoId,
  IsArray,
  IsEnum,
  IsOptional,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { AttendanceStatus } from '../../schemas';

export class AttendanceEntryDto {
  @ApiProperty({ example: '64b7f7a6f1a4e3c2d8b12345', description: 'Mongo ID of the student' })
  @IsMongoId()
  studentId: string;

  @ApiProperty({ enum: AttendanceStatus, example: AttendanceStatus.PRESENT, description: 'Attendance status' })
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;

  @ApiProperty({ example: 'Arrived late', required: false, description: 'Optional remark for the attendance' })
  @IsOptional()
  remark?: string;
}

export class MarkAttendanceDto {
  @ApiProperty({ example: '64b7f7a6f1a4e3c2d8b67890', description: 'Mongo ID of the class' })
  @IsMongoId()
  classId: string;

  @ApiProperty({ example: '2025-11-30', description: 'Date of attendance in YYYY-MM-DD format' })
  @IsDateString()
  date: string;

  @ApiProperty({ type: [AttendanceEntryDto], description: 'Array of student attendance entries' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AttendanceEntryDto)
  entries: AttendanceEntryDto[];
}
