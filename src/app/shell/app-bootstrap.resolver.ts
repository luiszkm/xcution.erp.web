import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { AuthStore } from '../core/auth/auth.store';
import { TenantContextService } from '../core/tenant/tenant-context.service';
import { MeService } from '../core/auth/me.service';

export const appBootstrapResolver: ResolveFn<boolean> = async () => {
  const authStore = inject(AuthStore);
  const tenant = inject(TenantContextService);
  const me = inject(MeService);

  const tenantId =
    tenant.tenantId() ??
    authStore.state().user?.tenantId ??
    'default';

  tenant.setBoot({ status: 'loading' });

  try {
    const res = await firstValueFrom(me.getMe(tenantId));

    const token = authStore.state().accessToken;
    if (!token) throw new Error('Missing token');

    authStore.setSession(res.user, token);
    tenant.setTenantFeatures(res.tenantFeatures);
    tenant.setMenuExtension(res.menuExtension ?? null);

    tenant.setBoot({ status: 'ready' });
    return true;
  } catch {
    tenant.setBoot({
      status: 'error',
      message: 'Failed to initialize application.',
    });

    return true; // deixa o shell renderizar o erro
  }
};
