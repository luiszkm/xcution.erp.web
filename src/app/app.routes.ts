import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./features/auth/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
