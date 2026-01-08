import {
  ApplicationConfig, inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { AuthService } from './core/auth/auth.service';

import { routes } from './app.routes';
import {
  API_BASE_URL,
  tenantInterceptor,
  httpErrorInterceptor, TenantContextService
} from './core';
import {authInterceptor} from './core/auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        tenantInterceptor,
        authInterceptor,
        httpErrorInterceptor
      ])
    ),

    {
      provide: API_BASE_URL,
      useValue: 'http://localhost:5000' // TODO: mover para environment
    },
    provideAppInitializer(() => {
      const tenant = inject(TenantContextService);
      tenant.initFromStorage();
    }),
    provideAppInitializer(() => {
      const auth = inject(AuthService);
      auth.initFromStorage();
    }),


  ]
};
