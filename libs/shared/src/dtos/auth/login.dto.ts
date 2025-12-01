import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'ams-student@yopmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Test@123' })
  @IsNotEmpty()
  password: string;
}
