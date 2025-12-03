import { SetMetadata } from '@nestjs/common';

export const AUDIT_META = 'audit:meta';

export function Audit(action: string, opts?: { resource?: any, sensitive?: boolean }) {
  return SetMetadata(AUDIT_META, { action, ...opts });
}
