import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
}

@Schema({ timestamps: true })
export class Attendance extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
  studentId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  classId: Types.ObjectId;

  @Prop({ type: Date, required: true })
  date: Date;

  @Prop({ enum: AttendanceStatus, default: AttendanceStatus.ABSENT })
  status: AttendanceStatus;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
