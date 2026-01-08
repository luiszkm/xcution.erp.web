import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { AuthStore } from '../core/auth/auth.store';
import { TenantContextService } from '../core/tenant/tenant-context.service';
import { MeService } from '../core/auth/me.service';

export const appBootstrapResolver: ResolveFn<boolean> = async () => {
  const router = inject(Router);

  const authStore = inject(AuthStore);
  const tenant = inject(TenantContextService);
  const me = inject(MeService);

  const user = authStore.state().user;
  const tenantId =
    tenant.tenantId() ??
    authStore.state().user?.tenantId ??
    'default';

  try {
    const res = await firstValueFrom(me.getMe(tenantId));

    // Atualiza user "real" + features/menu extension
    const token = authStore.state().accessToken;
    if (!token) throw new Error('Missing token');

    authStore.setSession(res.user, token);
    tenant.setTenantFeatures(res.tenantFeatures);
    tenant.setMenuExtension(res.menuExtension ?? null);

    return true;
  } catch {
    // Se bootstrap falhar, força logout e volta pro login
    authStore.clear();
    tenant.clear();
    await router.navigateByUrl('/login');
    return false;
  }
};
