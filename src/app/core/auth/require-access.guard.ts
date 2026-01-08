import type { CanActivateFn, UrlTree } from '@angular/router';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

import { AuthorizationService } from './authorization.service';

export const requireAccessGuard = (opts: {
  roles?: string[];
  features?: string[];
}): CanActivateFn => {
  return (): boolean | UrlTree => {
    const authz = inject(AuthorizationService);
    const router = inject(Router);

    if (authz.canAccess(opts)) return true;

    return router.createUrlTree(['/app/dashboard']);
  };
};
