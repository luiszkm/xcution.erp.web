import { Injectable, signal } from '@angular/core';
import type { AuthState, AuthUser } from './auth.models';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly _state = signal<AuthState>({
    user: null,
    accessToken: null,
  });

  readonly state = this._state.asReadonly();

  setSession(user: AuthUser, accessToken: string): void {
    this._state.set({ user, accessToken });
  }

  clear(): void {
    this._state.set({ user: null, accessToken: null });
  }
}
