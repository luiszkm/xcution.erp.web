import { InjectionToken } from '@angular/core';

export const TENANT_ID_STORAGE_KEY = new InjectionToken<string>('TENANT_ID_STORAGE_KEY', {
  factory: () => 'erp.tenantId',
});
