import { Controller, Logger } from '@nestjs/common';
import { ActivityLogService } from './activity-log.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ActivityLogController {
  private readonly logger = new Logger(ActivityLogController.name);
  constructor(private readonly activityLogService: ActivityLogService) {}

  @EventPattern('audit.log')
  async handleAudit(@Payload() data: any) {
    try {
      // optional: basic validation or schema normalization
      await this.activityLogService.saveLog(data);
    } catch (err) {
      // important: avoid crashing — log and move on
      console.error('Failed to save audit log', err, data);
    }
  }

  @MessagePattern('audit.search')
  async search(query: any, limit = 50) {
    return this.activityLogService.search(query, limit);
  }
}
