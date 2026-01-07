import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import type { LoginConfig } from '../models/login-config.model';
import type { LoginCommand, LoginViewState } from '../models/login.model';
import { DefaultLoginView } from '../views/default-login.view';
import { BrandedLoginView } from '../views/branded-login.view';

import { AuthApiService } from '../data-access/auth-api.service';
import { AuthStore } from '../../../../core/auth/auth.store';

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
  private readonly authApi = inject(AuthApiService);
  private readonly authStore = inject(AuthStore);

  readonly loginConfig =
    this.route.snapshot.data['loginConfig'] as LoginConfig | undefined;

  readonly state = signal<LoginViewState>({ status: 'idle' });

  async onLogin(cmd: LoginCommand): Promise<void> {
    if (this.state().status === 'submitting') return;

    this.state.set({ status: 'submitting' });

    try {
      const res = await firstValueFrom(this.authApi.login(cmd));

      // TODO: quando você tiver /me, substitui user placeholder pelo real.
      this.authStore.setSession(
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
      console.log('LOGIN OK');
    } catch (e) {
      this.state.set({
        status: 'error',
        errorMessage: 'Login failed.',
      });
    }
  }
}
