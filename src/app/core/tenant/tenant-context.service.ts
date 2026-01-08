import { Injectable, computed, signal } from '@angular/core';
import type { TenantLoginConfig } from './tenant.models';
import {NavExtension} from '../navigation/navigation.models';

@Injectable({ providedIn: 'root' })
export class TenantContextService {
  private readonly _tenantId = signal<string | null>(null);
  private readonly _loginConfig = signal<TenantLoginConfig | null>(null);
  private readonly _tenantFeatures = signal<string[]>([]);
  private readonly _menuExtension = signal<NavExtension | null>(null);

  readonly tenantId = computed(() => this._tenantId());
  readonly loginConfig = computed(() => this._loginConfig());
  readonly tenantFeatures = computed(() => this._tenantFeatures());
  readonly menuExtension = computed(() => this._menuExtension());
  setTenantFeatures(features: string[]): void {
    this._tenantFeatures.set(features);
  }

  setMenuExtension(ext: NavExtension | null): void {
    this._menuExtension.set(ext);
  }
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
