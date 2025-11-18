import { Module } from '@nestjs/common';
import { StudentController } from './app/student.controller';
import { StudentService } from './app/student.service';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@shared/rmq.module';
import { SERVICES } from '@shared/constants';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    RmqModule.registerMultipleAsync([SERVICES.STUDENT]),
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
