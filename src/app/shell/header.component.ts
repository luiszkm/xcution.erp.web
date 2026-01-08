import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-header',
  template: `
    <header class="header">
      <div class="brand">ERP</div>

      <button type="button" (click)="logout()">Logout</button>
    </header>
  `,
  styles: [
    `
      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        border-bottom: 1px solid #e5e7eb;
      }
      .brand { font-weight: 600; }
    `,
  ],
})
export class AppHeaderComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/login');
  }
}
