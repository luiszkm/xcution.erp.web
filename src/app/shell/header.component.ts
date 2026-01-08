import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';
import { TenantContextService } from '../core';

@Component({
  standalone: true,
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="brand">ERP</div>
      <button type="button" (click)="logout()">Logout</button>
    </header>
  `,
})
export class AppHeaderComponent {
  private readonly auth = inject(AuthService);
  private readonly tenant = inject(TenantContextService);
  private readonly router = inject(Router);

  async logout(): Promise<void> {
    const tenantId = this.tenant.tenantId();

    this.auth.logout();
    this.tenant.clear();

    await this.router.navigate(['/login'], {
      queryParams: tenantId ? { tenantId } : {},
      queryParamsHandling: '',
    });
  }
}
