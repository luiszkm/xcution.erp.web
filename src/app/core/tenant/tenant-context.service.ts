import { Injectable, computed, signal } from '@angular/core';
import type { TenantLoginConfig } from './tenant.models';

@Injectable({ providedIn: 'root' })
export class TenantContextService {
  private readonly _tenantId = signal<string | null>(null);
  private readonly _loginConfig = signal<TenantLoginConfig | null>(null);

  readonly tenantId = computed(() => this._tenantId());
  readonly loginConfig = computed(() => this._loginConfig());

  setTenantId(tenantId: string | null): void {
    this._tenantId.set(tenantId);
  }

  setLoginConfig(config: TenantLoginConfig | null): void {
    this._loginConfig.set(config);
    this._tenantId.set(config?.tenantId ?? null);
  }

  clear(): void {
    this._loginConfig.set(null);
    this._tenantId.set(null);
  }
}
