import {Component, inject} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';

import { AppHeaderComponent } from './header.component';
import { AppSidebarComponent } from './sidebar.component';
import {TenantContextService} from '../core';
import {AuthService} from '../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, AppHeaderComponent, AppSidebarComponent],
  template: `
    @switch (bootState.status) {
      @case ('loading') {
        <p>Loading app...</p>
      }
      @case ('error') {
        <h2>Could not start the application</h2>
        <p>{{ errorMessage }}</p>

        <button (click)="retry()">Retry</button>
        <button (click)="logout()">Logout</button>
      }
      @default {
        <div class="shell">
          <app-header />

          <div class="body">
            <app-sidebar />
            <main class="content">
              <router-outlet />
            </main>
          </div>
        </div>
      }
    }
  `,
  styles: [
    `
      .shell { display: flex; flex-direction: column; min-height: 100dvh; }
      .body { display: grid; grid-template-columns: 260px 1fr; flex: 1; }
      .content { padding: 16px; }
    `,
  ],
})
export class AppShellComponent {
  readonly tenant = inject(TenantContextService);
  private readonly router = inject(Router);
  private readonly auth = inject(AuthService);

  get bootState() {
    return this.tenant.boot();
  }

  get errorMessage(): string | undefined {
    const state = this.tenant.boot();
    if (state.status === 'error') return state.message;
    return undefined;
  }

  async retry(): Promise<void> {
    await this.router.navigateByUrl('/login', { skipLocationChange: true });
    await this.router.navigateByUrl('/app/dashboard');
  }

  async logout(): Promise<void> {
    const tenantId = this.tenant.tenantId();
    this.auth.logout();
    this.tenant.clear();
    await this.router.navigate(['/login'], { queryParams: tenantId ? { tenantId } : {} });
  }
}
