import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Teacher extends Document{
  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ type: [Types.ObjectId], ref: 'Class' })
  classes: Types.ObjectId[];
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
