import { Routes } from '@angular/router';

import { authGuard } from './core/auth/auth.guard';
import {appBootstrapResolver} from './shell/app-bootstrap.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'app/dashboard', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },

  {
    path: 'app',
    canActivate: [authGuard],
    resolve: { boot: appBootstrapResolver },
    loadComponent: () =>
      import('./shell/app-shell.component').then((m) => m.AppShellComponent),
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./features/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES),
      },
      {
        path: 'customers',
        loadChildren: () =>
          import('./features/customers/customers.routes').then((m) => m.CUSTOMERS_ROUTES),
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },

  { path: '**', redirectTo: 'app/dashboard' },
];
