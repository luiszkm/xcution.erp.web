import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../../../../core/auth/auth.service';
import type { LoginConfig } from '../models/login-config.model';
import type { LoginCommand, LoginViewState } from '../models/login.model';
import { DefaultLoginView } from '../views/default-login.view';
import { BrandedLoginView } from '../views/branded-login.view';
import { TenantContextService } from '../../../../core/tenant/tenant-context.service';

import { AUTH_API } from '../data-access/auth-api.token';
import type { AuthApi } from '../data-access/auth-api.token';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [DefaultLoginView, BrandedLoginView],
  template: `
    @if (loginConfig; as cfg) {
      @switch (cfg.loginVariant) {
        @case ('default') {
          <app-default-login-view
            [config]="cfg"
            [state]="state()"
            (login)="onLogin($event)"
          />
        }
        @case ('branded') {
          <app-branded-login-view
            [config]="cfg"
            [state]="state()"
            (login)="onLogin($event)"
          />
        }
        @default {
          <app-default-login-view
            [config]="cfg"
            [state]="state()"
            (login)="onLogin($event)"
          />
        }
      }
    } @else {
      <p>Loading login...</p>
    }
  `,
})
export class LoginPage {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private readonly authApi: AuthApi = inject(AUTH_API);
  private readonly auth = inject(AuthService);
  private readonly tenant = inject(TenantContextService);

  readonly loginConfig =
    this.route.snapshot.data['loginConfig'] as LoginConfig | undefined;

  readonly state = signal<LoginViewState>({ status: 'idle' });

  async onLogin(cmd: LoginCommand): Promise<void> {
    if (this.state().status === 'submitting') return;

    this.state.set({ status: 'submitting' });

    try {
      const res = await firstValueFrom(this.authApi.login(cmd));

      this.auth.setSession(
        {
          id: 'temp',
          name: cmd.email,
          email: cmd.email,
          roles: ['User'],
          tenantId: this.loginConfig?.tenantId ?? 'default',
        },
        res.accessToken
      );

      this.state.set({ status: 'idle' });
      const tenantId = this.loginConfig?.tenantId ?? 'default';
      this.tenant.setTenantId(tenantId);
      await this.router.navigateByUrl('/app/dashboard');

    } catch {
      this.state.set({
        status: 'error',
        errorMessage: 'Login failed.',
      });
    }
  }
}
