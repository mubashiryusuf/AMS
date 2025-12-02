// teacher-details.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class TeacherDetails extends Document {
  @Prop({ required: true })
  teacherId: string;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  classId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  studentId: Types.ObjectId;
}

export const TeacherDetailsSchema = SchemaFactory.createForClass(TeacherDetails);

