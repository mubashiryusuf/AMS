import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTeacherDto {
  @ApiProperty({ example: 'Otiilia bilionare' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false, type: [String] })
  @IsOptional()
  classes?: Types.ObjectId[];
}
