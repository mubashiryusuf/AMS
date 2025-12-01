import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ example: 'Class 10-A' })
  @IsNotEmpty()
  name: string;
}
