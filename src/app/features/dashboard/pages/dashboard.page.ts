import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-dashboard-page',
  template: `
    <h1>Dashboard</h1>
    <p>Protected area</p>

    <button type="button" (click)="logout()">Logout</button>
  `,
})
export class DashboardPage {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.auth.logout();
    void this.router.navigateByUrl('/login');
  }
}
