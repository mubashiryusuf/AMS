import { Module } from '@nestjs/common';
import { ClassController } from './app/class.controller';
import { ClassService } from './app/class.service';
import { RmqModule, SharedModule, SERVICES, Class, ClassSchema } from '@shared';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Class.name, schema: ClassSchema }]),
    SharedModule,
    RmqModule.registerMultipleAsync([SERVICES.CLASS]),
  ],
  controllers: [ClassController],
  providers: [ClassService],
})
export class ClassModule {}
