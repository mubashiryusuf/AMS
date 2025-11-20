import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateStudentDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsOptional()
  age?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  classId?: Types.ObjectId;
}
