import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TenantContextService } from '../tenant/tenant-context.service';

export const tenantInterceptor: HttpInterceptorFn = (req, next) => {
  const tenantId = inject(TenantContextService).tenantId();

  // Header de tenant (enterprise pattern)
  if (!tenantId) return next(req);

  const cloned = req.clone({
    setHeaders: {
      'X-Tenant-Id': tenantId,
    },
  });

  return next(cloned);
};
