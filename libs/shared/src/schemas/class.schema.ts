import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Class extends Document {
  @Prop({ required: true })
  name: string;
}

export const ClassSchema = SchemaFactory.createForClass(Class);
