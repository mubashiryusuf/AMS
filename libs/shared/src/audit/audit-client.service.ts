import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuditClient {
  constructor(@Inject('AUDIT_CLIENT') private client: ClientProxy) {}

  emit(payload: any) {
    // non-blocking emit; prefix/normalize
    payload.timestamp = payload.timestamp ?? new Date().toISOString();
    payload.id = payload.id ?? require('crypto').randomUUID();
    this.client.emit('audit.log', payload);
  }
}
