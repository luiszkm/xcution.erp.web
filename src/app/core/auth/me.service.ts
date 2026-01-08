import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import type { MeResponse } from './me.models';
import type { Role } from './auth.models';

@Injectable({ providedIn: 'root' })
export class MeService {
  getMe(tenantId: string): Observable<MeResponse> {
    const isAcme = tenantId === 'acme';

    const roles: Role[] = isAcme ? ['Admin'] : ['User'];

    const res: MeResponse = {
      user: {
        id: 'u1',
        name: 'User',
        email: 'user@local',
        roles,
        tenantId,
      },
      tenantFeatures: isAcme ? ['customers'] : [],
      menuExtension: isAcme
        ? {
          add: [
            {
              id: 'customers',
              label: 'Customers',
              route: '/app/customers',
              order: 20,
              requiredFeatures: ['customers'],
            },
          ],
        }
        : undefined,
    };

    return of(res).pipe(delay(200));
  }
}
