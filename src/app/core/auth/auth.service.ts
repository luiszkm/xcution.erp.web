// src/app/core/auth/auth.service.ts
import { inject, Injectable } from '@angular/core';

import type { AuthUser } from './auth.models';
import { AuthStore } from './auth.store';
import { ACCESS_TOKEN_STORAGE_KEY } from './auth.tokens';
import {TenantContextService} from '../tenant/tenant-context.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly store = inject(AuthStore);
  private readonly tokenKey = inject(ACCESS_TOKEN_STORAGE_KEY);
  private readonly tenant = inject(TenantContextService);

  /**
   * Call once on app startup if you want to restore session from storage.
   * (User info should be fetched from /me later; here we only restore token.)
   */
  initFromStorage(): void {
    const token = this.safeGetToken();
    if (!token) return;
    const tenantId = this.tenant.tenantId() ?? 'default';

    // Minimal session until /me exists
    this.store.setSession(
      {
        id: 'restored',
        name: 'Restored session',
        email: 'restored@local',
        roles: ['User'],
        tenantId,
      },
      token
    );
  }

  setSession(user: AuthUser, accessToken: string): void {
    this.safeSetToken(accessToken);
    this.store.setSession(user, accessToken);
  }

  clearSession(): void {
    this.safeRemoveToken();
    this.store.clear();
  }

  getAccessToken(): string | null {
    const state = this.store.state();
    return state.accessToken ?? null;
  }

  private safeGetToken(): string | null {
    try {
      return localStorage.getItem(this.tokenKey);
    } catch {
      return null;
    }
  }

  private safeSetToken(token: string): void {
    try {
      localStorage.setItem(this.tokenKey, token);
    } catch {
      // ignore (private mode / storage disabled)
    }
  }

  private safeRemoveToken(): void {
    try {
      localStorage.removeItem(this.tokenKey);
    } catch {
      // ignore
    }
  }
  logout(): void {
    this.clearSession();
  }

}
