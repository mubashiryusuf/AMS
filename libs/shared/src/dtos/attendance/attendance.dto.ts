import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { AttendanceStatus } from '../../schemas';

export class CreateAttendanceDto {
  @ApiProperty()
  @IsNotEmpty()
  studentId: Types.ObjectId;

  @ApiProperty()
  @IsNotEmpty()
  classId: Types.ObjectId;

  @ApiProperty()
  @IsDateString()
  date: Date;

  @ApiProperty({ enum: AttendanceStatus })
  @IsEnum(AttendanceStatus)
  status: AttendanceStatus;
}
