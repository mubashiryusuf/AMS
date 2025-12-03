import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Audit } from '@shared';
import { Model } from 'mongoose';

@Injectable()
export class ActivityLogService {
  constructor(
    @InjectModel(Audit.name) private readonly auditModel: Model<Audit>
  ) {}

  async saveLog(payload: any) {
    // you may validate/normalize payload here
    const doc = new this.auditModel(payload);
    return doc.save();
  }

  async search(query: any, limit = 50) {
    // Simple search (improve with indices / elasticsearch)
    return this.auditModel.find(query).limit(limit).sort({ createdAt: -1 }).lean();
  }
}
