import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

import type { LoginConfig } from '../models/login-config.model';

@Injectable({ providedIn: 'root' })
export class TenantPublicService {
  private readonly http = inject(HttpClient);

  getLoginConfig(tenantId: string) {
    // MOCK: trocar para chamar o backend (.NET)
    const isBranded = tenantId !== 'default';

    const config: LoginConfig = isBranded
      ? {
        tenantId,
        displayName: `Tenant ${tenantId.toUpperCase()}`,
        loginVariant: 'branded',
        primaryColor: '#22c55e',
        secondaryColor: '#0f172a',
      }
      : {
        tenantId: 'default',
        displayName: 'ERP',
        loginVariant: 'default',
      };

    return of(config).pipe(delay(200));
  }
}
