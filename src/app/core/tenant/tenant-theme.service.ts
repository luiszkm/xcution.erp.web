import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import type { TenantLoginConfig } from './tenant.models';

@Injectable({ providedIn: 'root' })
export class TenantThemeService {
  constructor(@Inject(DOCUMENT) private readonly document: Document) {}

  apply(config: TenantLoginConfig): void {
    const root = this.document.documentElement;

    // Defaults seguros
    const primary = config.primaryColor ?? '#2563eb';
    const secondary = config.secondaryColor ?? '#0f172a';

    root.style.setProperty('--tenant-primary', primary);
    root.style.setProperty('--tenant-secondary', secondary);

    if (config.backgroundImageUrl) {
      root.style.setProperty('--tenant-login-bg', `url("${config.backgroundImageUrl}")`);
    } else {
      root.style.removeProperty('--tenant-login-bg');
    }
  }

  reset(): void {
    const root = this.document.documentElement;
    root.style.removeProperty('--tenant-primary');
    root.style.removeProperty('--tenant-secondary');
    root.style.removeProperty('--tenant-login-bg');
  }
}
