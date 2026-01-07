import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { AuthService } from '../auth/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Skip if already has Authorization
  if (req.headers.has('Authorization')) {
    return next(req);
  }

  // Optional: skip public endpoints
  const url = req.url.toLowerCase();
  if (url.includes('/public/') || url.endsWith('/auth/login')) {
    return next(req);
  }

  const token = inject(AuthService).getAccessToken();
  if (!token) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  );
};
