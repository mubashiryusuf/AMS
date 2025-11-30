// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document, Types } from 'mongoose';

// export enum AttendanceStatus {
//   PRESENT = 'present',
//   ABSENT = 'absent',
// }

// @Schema({ timestamps: true })
// export class Attendance extends Document {
//   @Prop({ type: Types.ObjectId, ref: 'Student', required: true })
//   studentId: Types.ObjectId;

//   @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
//   classId: Types.ObjectId;

//   @Prop({ type: Date, required: true })
//   date: Date;

//   @Prop({ enum: AttendanceStatus, default: AttendanceStatus.ABSENT })
//   status: AttendanceStatus;
// }

// export const AttendanceSchema = SchemaFactory.createForClass(Attendance);

// attendance.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

export enum AttendanceStatus {
  PRESENT = 'present',
  ABSENT = 'absent',
  LATE = 'late',
}

@Schema({ timestamps: true })
export class Attendance {
  @Prop({ type: Types.ObjectId, ref: 'Class', required: true })
  classId: Types.ObjectId;

  @Prop({ type: Date, required: true })
  date: Date; 

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  markedBy: Types.ObjectId;

  @Prop([
    {
      studentId: { type: Types.ObjectId, ref: 'User', required: true },
      status: { type: String, enum: AttendanceStatus, required: true },
      remark: { type: String, default: '' },
    },
  ])
  entries: { studentId: Types.ObjectId; status: AttendanceStatus; remark?: string }[];

  @Prop({ default: Date.now })
  createdAt?: Date;

  @Prop({ default: Date.now })
  updatedAt?: Date;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
AttendanceSchema.index({ classId: 1, date: 1 }, { unique: true });
