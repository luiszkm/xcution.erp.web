import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

import { AuthService } from './auth.service';

/**
 * Guard funcional para rotas protegidas.
 * - Se autenticado: permite acesso
 * - Se não autenticado: redireciona para /login
 */
export const authGuard: CanActivateFn = (): boolean | UrlTree => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const token = auth.getAccessToken();

  if (token) {
    return true;
  }

  return router.createUrlTree(['/login']);
};
