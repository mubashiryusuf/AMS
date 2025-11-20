import { Module } from '@nestjs/common';
import { ClassController } from './app/class.controller';
import { ClassService } from './app/class.service';
import { RmqModule, SharedModule, SERVICES } from '@shared';

@Module({
  imports: [
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.CLASS]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
