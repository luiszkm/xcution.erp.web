import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { TenantContextService, TenantThemeService } from '../../../core';
import type { LoginConfig } from './models/login-config.model';
import { TenantPublicService } from './data-access/tenant-public.service';

export const loginResolver: ResolveFn<LoginConfig> = async (route) => {
  const router = inject(Router);

  const tenantContext = inject(TenantContextService);
  const tenantTheme = inject(TenantThemeService);

  const tenantPublic = inject(TenantPublicService);

  const tenantId = route.queryParamMap.get('tenantId');

  if (!tenantId) {
    // padrão: sem tenant, vai para login "default"
    // (você pode trocar isso depois para uma tela de seleção)
    const fallback: LoginConfig = {
      tenantId: 'default',
      displayName: 'ERP',
      loginVariant: 'default',
    };

    tenantContext.setLoginConfig({
      tenantId: fallback.tenantId,
      displayName: fallback.displayName,
      loginVariant: fallback.loginVariant,
    });

    tenantTheme.apply({
      tenantId: fallback.tenantId,
      displayName: fallback.displayName,
      loginVariant: fallback.loginVariant,
    });

    return fallback;
  }

  tenantContext.setTenantId(tenantId);

  try {
    const config = await firstValueFrom(tenantPublic.getLoginConfig(tenantId));

    // guarda no contexto global
    tenantContext.setLoginConfig({
      tenantId: config.tenantId,
      displayName: config.displayName,
      loginVariant: config.loginVariant,
      logoUrl: config.logoUrl,
      primaryColor: config.primaryColor,
      secondaryColor: config.secondaryColor,
      backgroundImageUrl: config.backgroundImageUrl,
    });

    // aplica tema antes da página renderizar
    tenantTheme.apply({
      tenantId: config.tenantId,
      displayName: config.displayName,
      loginVariant: config.loginVariant,
      logoUrl: config.logoUrl,
      primaryColor: config.primaryColor,
      secondaryColor: config.secondaryColor,
      backgroundImageUrl: config.backgroundImageUrl,
    });

    return config;
  } catch {
    // tenant inválido → volta pra default
    await router.navigate(['/login'], { queryParams: {} });
    tenantContext.setTenantId('default');

    const fallback: LoginConfig = {
      tenantId: 'default',
      displayName: 'ERP',
      loginVariant: 'default',
    };

    tenantContext.setLoginConfig({
      tenantId: fallback.tenantId,
      displayName: fallback.displayName,
      loginVariant: fallback.loginVariant,
    });

    tenantTheme.apply({
      tenantId: fallback.tenantId,
      displayName: fallback.displayName,
      loginVariant: fallback.loginVariant,
    });

    return fallback;
  }
};
