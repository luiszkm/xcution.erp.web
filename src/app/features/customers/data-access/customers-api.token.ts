import { InjectionToken } from '@angular/core';
import type { Observable } from 'rxjs';

import type { Customer, CustomerCreate, CustomerUpdate } from '../models/customer.model';
import type { PageRequest, PageResult } from '../models/customer.query';

export interface CustomersApi {
  list(req: PageRequest): Observable<PageResult<Customer>>;
  get(id: string): Observable<Customer>;
  create(data: CustomerCreate): Observable<Customer>;
  update(id: string, data: CustomerUpdate): Observable<Customer>;
  delete(id: string): Observable<void>;
}

export const CUSTOMERS_API = new InjectionToken<CustomersApi>('CUSTOMERS_API');
