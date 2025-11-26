import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import mongoose, { Types } from 'mongoose';

export class CreateStudentDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '25' })
  @IsOptional()
  age?: number;

  @IsOptional()
  @IsMongoId()
  @ApiProperty({example:new mongoose.Types.ObjectId()})
  classId?: mongoose.Types.ObjectId;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {}  