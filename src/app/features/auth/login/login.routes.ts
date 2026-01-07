import { Routes } from '@angular/router';

import { loginResolver } from './login.resolver';
import { AUTH_API } from './data-access/auth-api.token';
import { AuthApiMock } from './data-access/auth-api.mock';

export const LOGIN_ROUTES: Routes = [
  {
    path: '',
    title: 'Login',
    resolve: {
      loginConfig: loginResolver,
    },
    providers: [
      AuthApiMock,
      { provide: AUTH_API, useExisting: AuthApiMock },
    ],
    loadComponent: () =>
      import('./pages/login.page').then((m) => m.LoginPage),
  },
];
