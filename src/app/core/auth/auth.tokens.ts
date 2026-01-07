import { InjectionToken } from '@angular/core';

export const ACCESS_TOKEN_STORAGE_KEY = new InjectionToken<string>(
  'ACCESS_TOKEN_STORAGE_KEY',
  { factory: () => 'erp.access_token' }
);
