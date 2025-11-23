import { PartialType } from '@nestjs/swagger';
import { CreateClassDto } from './createclass.dto';

export class UpdateClassDto extends PartialType(CreateClassDto) {}
