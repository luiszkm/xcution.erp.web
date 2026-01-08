import { Routes } from '@angular/router';

import { CUSTOMERS_API } from './data-access/customers-api.token';
import { CustomersApiMock } from './data-access/customers-api.mock';

export const CUSTOMERS_ROUTES: Routes = [
  {
    path: '',
    title: 'Customers',
    providers: [
      CustomersApiMock,
      { provide: CUSTOMERS_API, useExisting: CustomersApiMock },
    ],
    loadComponent: () =>
      import('./pages/customers-list.page').then((m) => m.CustomersListPage),
  },
];
