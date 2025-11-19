import { Module } from '@nestjs/common';
import { StudentController } from './app/student.controller';
import { StudentService } from './app/student.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@shared/rmq.module';
import { DatabaseModule } from '@shared/database.module';
import { SERVICES } from '@shared/constants';
import { SharedModule } from '@shared/shared.module';
@Module({
  imports: [SharedModule, RmqModule.registerMultipleAsync([SERVICES.STUDENT])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
