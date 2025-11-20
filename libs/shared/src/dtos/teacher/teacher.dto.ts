import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTeacherDto {
  @ApiProperty()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  classes?: Types.ObjectId[];
}
