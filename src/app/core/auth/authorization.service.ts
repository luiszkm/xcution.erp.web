import { Injectable, computed, inject } from '@angular/core';
import { AuthStore } from './auth.store';
import { TenantContextService } from '../tenant/tenant-context.service';

@Injectable({ providedIn: 'root' })
export class AuthorizationService {
  private readonly auth = inject(AuthStore);
  private readonly tenant = inject(TenantContextService);

  private readonly roles = computed<string[]>(() => this.auth.state().user?.roles ?? []);
  private readonly features = computed<string[]>(() => this.tenant.tenantFeatures());

  hasRole(role: string): boolean {
    return this.roles().includes(role);
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some((r) => this.roles().includes(r));
  }

  hasFeature(feature: string): boolean {
    return this.features().includes(feature);
  }

  hasAllFeatures(features: string[]): boolean {
    return features.every((f) => this.features().includes(f));
  }

  canAccess(opts: { roles?: string[]; features?: string[] }): boolean {
    if (opts.roles?.length && !this.hasAnyRole(opts.roles)) return false;
    if (opts.features?.length && !this.hasAllFeatures(opts.features)) return false;
    return true;
  }
}
