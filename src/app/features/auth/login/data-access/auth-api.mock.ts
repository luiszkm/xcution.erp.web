import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import type { LoginCommand } from '../models/login.model';
import type { AuthApi, LoginResponse } from './auth-api.token';

@Injectable()
export class AuthApiMock implements AuthApi {
  login(cmd: LoginCommand): Observable<LoginResponse> {
    const ok = cmd.password.length >= 8;

    if (!ok) {
      return throwError(() => new Error('Invalid credentials')).pipe(delay(300));
    }

    return of({ accessToken: `mock.${btoa(cmd.email)}.token` }).pipe(delay(400));
  }
}
