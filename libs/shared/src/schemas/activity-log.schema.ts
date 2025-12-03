import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Audit extends Document {
  @Prop({ required: true }) id: string; 
  @Prop({ required: true }) action: string;
  @Prop({ required: true }) microservice: string;
  @Prop({ type: Object }) resource: any;
  @Prop({ type: Object }) performedBy: any;
  @Prop({ type: Object }) metadata: any;
  @Prop({ type: Object }) oldValue: any;
  @Prop({ type: Object }) newValue: any;
  @Prop({ default: false }) sensitive: boolean;
}

export const AuditSchema = SchemaFactory.createForClass(Audit);
