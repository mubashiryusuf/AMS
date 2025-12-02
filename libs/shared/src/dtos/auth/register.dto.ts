import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  fullName: string;

  @ApiProperty({ example: 'john.doe@yopmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test@123' })
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'student' })
  @IsNotEmpty()
  @IsOptional()
  role?: string;

  @ApiProperty({ example: '01' })
  @IsOptional()
  roleNo?: string;

  @ApiProperty({ example: '01' })
  @IsOptional()
  teacherId?: string;
}
