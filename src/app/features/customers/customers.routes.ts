import { Routes } from '@angular/router';

export const CUSTOMERS_ROUTES: Routes = [
  {
    path: '',
    title: 'Customers',
    loadComponent: () =>
      import('./pages/customers.page').then((m) => m.CustomersPage),
  },
];
