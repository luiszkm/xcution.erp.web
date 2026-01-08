import {Injectable, computed, signal, inject} from '@angular/core';
import type { TenantLoginConfig} from './tenant.models';
import {NavExtension} from '../navigation/navigation.models';
import { TENANT_ID_STORAGE_KEY } from './tenant.storage';
import {BootState} from './boot-state.model';

@Injectable({ providedIn: 'root' })
export class TenantContextService {
  private readonly tenantKey = inject(TENANT_ID_STORAGE_KEY);
  private readonly _tenantId = signal<string | null>(null);
  private readonly _loginConfig = signal<TenantLoginConfig | null>(null);
  private readonly _tenantFeatures = signal<string[]>([]);
  private readonly _menuExtension = signal<NavExtension | null>(null);
  private readonly _boot = signal<BootState>({ status: 'idle' });

  readonly tenantId = computed(() => this._tenantId());
  readonly loginConfig = computed(() => this._loginConfig());
  readonly tenantFeatures = computed(() => this._tenantFeatures());
  readonly menuExtension = computed(() => this._menuExtension());
  readonly boot = computed(() => this._boot());

  setBoot(state: BootState): void {
    this._boot.set(state);
  }

  setTenantFeatures(features: string[]): void {
    this._tenantFeatures.set(features);
  }

  setMenuExtension(ext: NavExtension | null): void {
    this._menuExtension.set(ext);
  }
  setTenantId(id: string): void {
    const normalized = id.trim().toLowerCase();
    this._tenantId.set(normalized);

    try {
      localStorage.setItem(this.tenantKey, normalized);
    } catch {
      // ignore
    }
  }
  setLoginConfig(config: TenantLoginConfig | null): void {
    this._loginConfig.set(config);

    if (config?.tenantId) {
      this.setTenantId(config.tenantId);
    } else {
      this._tenantId.set(null);
      try {
        localStorage.removeItem(this.tenantKey);
      } catch {
        // ignore
      }
    }
  }

  initFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.tenantKey);
      if (stored) this._tenantId.set(stored.trim().toLowerCase());
    } catch {
      // ignore
    }
  }

  clear(): void {
    this._loginConfig.set(null);
    this._tenantFeatures.set([]);
    this._menuExtension.set(null);
    this._tenantId.set(null);
    this._boot.set({ status: 'idle' });

    try {
      localStorage.removeItem(this.tenantKey);
    } catch {
      // ignore
    }
  }

}
