import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document{
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  age: number;

  @Prop({ type: Types.ObjectId, ref: 'Class' })
  classId: Types.ObjectId;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
