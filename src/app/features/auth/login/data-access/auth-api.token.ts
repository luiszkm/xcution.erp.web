import { InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';
import type { LoginCommand } from '../models/login.model';

export interface LoginResponse {
  accessToken: string;
}

export interface AuthApi {
  login(cmd: LoginCommand): Observable<LoginResponse>;
}

export const AUTH_API = new InjectionToken<AuthApi>('AUTH_API');
