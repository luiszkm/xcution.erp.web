import { Injectable, computed, inject } from '@angular/core';

import { TenantContextService } from '../tenant/tenant-context.service';
import { AuthStore } from '../auth/auth.store';
import type { NavExtension, NavItem } from './navigation.models';

const BASE_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', route: '/app/dashboard', order: 10 },
  // outros módulos nativos entram aqui depois
];

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly tenant = inject(TenantContextService);
  private readonly authStore = inject(AuthStore);

  readonly items = computed(() => {
    const roles = this.authStore.state().user?.roles ?? [];
    const features = this.tenant.tenantFeatures();
    const ext = this.tenant.menuExtension();

    const merged = applyExtension(BASE_ITEMS, ext);
    const filtered = merged.filter((i) => visible(i, roles, features));

    return [...filtered].sort((a, b) => a.order - b.order);
  });
}

function applyExtension(base: NavItem[], ext: NavExtension | null): NavItem[] {
  let items = [...base];

  if (!ext) return items;

  if (ext.removeIds?.length) {
    const remove = new Set(ext.removeIds);
    items = items.filter((i) => !remove.has(i.id));
  }

  if (ext.override?.length) {
    const map = new Map(items.map((i) => [i.id, i]));
    for (const o of ext.override) {
      const current = map.get(o.id);
      if (current) map.set(o.id, { ...current, ...o });
    }
    items = Array.from(map.values());
  }

  if (ext.add?.length) {
    items = items.concat(ext.add);
  }

  return items;
}

function visible(item: NavItem, roles: string[], features: string[]): boolean {
  if (item.requiredRoles?.length) {
    if (!item.requiredRoles.some((r) => roles.includes(r))) return false;
  }
  if (item.requiredFeatures?.length) {
    if (!item.requiredFeatures.every((f) => features.includes(f))) return false;
  }
  return true;
}
