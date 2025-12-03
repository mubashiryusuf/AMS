import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuditClient } from './audit-client.service';
import { AUDIT_META } from './audit-decorator';

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector, @Inject(AuditClient) private readonly auditClient: AuditClient) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const meta = this.reflector.get(AUDIT_META, context.getHandler());
    if (!meta) return next.handle();

    const req = context.switchToHttp().getRequest();
    const user = req.user ?? { id: 'unknown' };
    const { params, body } = req;

    const payloadBase = {
      action: meta.action,
      microservice: process.env.SERVICE_NAME || 'unknown-service',
      resource: meta.resource ?? { params },
      performedBy: { userId: user.id, role: user.role },
      metadata: { ip: req.ip, userAgent: req.headers['user-agent'] },
      sensitive: meta.sensitive ?? false,
    };

    // capture before state optionally (requires service-level fetch)
    return next.handle().pipe(
      tap((result) => {
        // result can be used as newValue; you may want to omit large responses
        this.auditClient.emit({
          ...payloadBase,
          newValue: result,
          timestamp: new Date().toISOString(),
        });
      }),
    );
  }
}
