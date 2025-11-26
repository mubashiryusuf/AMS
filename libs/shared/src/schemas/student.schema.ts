import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Student extends Document{
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  age: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class' })
  classId?: mongoose.Types.ObjectId;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
