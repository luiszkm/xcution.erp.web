import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import type { CustomersApi } from './customers-api.token';
import type { Customer, CustomerCreate, CustomerUpdate } from '../models/customer.model';
import type { PageRequest, PageResult } from '../models/customer.query';

const DB: Customer[] = seed();

@Injectable()
export class CustomersApiMock implements CustomersApi {
  list(req: PageRequest): Observable<PageResult<Customer>> {
    const term = (req.search ?? '').trim().toLowerCase();

    let items = DB;
    if (term) {
      items = items.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.email.toLowerCase().includes(term) ||
          c.document.includes(term)
      );
    }

    const total = items.length;

    const start = (req.page - 1) * req.pageSize;
    const paged = items.slice(start, start + req.pageSize);

    return of({ items: paged, total }).pipe(delay(250));
  }

  get(id: string): Observable<Customer> {
    const found = DB.find((x) => x.id === id);
    if (!found) return throwError(() => new Error('Not found')).pipe(delay(150));
    return of(found).pipe(delay(150));
  }

  create(data: CustomerCreate): Observable<Customer> {
    const created: Customer = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      ...data,
    };
    DB.unshift(created);
    return of(created).pipe(delay(200));
  }

  update(id: string, data: CustomerUpdate): Observable<Customer> {
    const idx = DB.findIndex((x) => x.id === id);
    if (idx < 0) return throwError(() => new Error('Not found')).pipe(delay(150));
    DB[idx] = { ...DB[idx], ...data };
    return of(DB[idx]).pipe(delay(200));
  }

  delete(id: string): Observable<void> {
    const idx = DB.findIndex((x) => x.id === id);
    if (idx < 0) return throwError(() => new Error('Not found')).pipe(delay(150));
    DB.splice(idx, 1);
    return of(void 0).pipe(delay(150));
  }
}

function seed(): Customer[] {
  const now = new Date().toISOString();
  return Array.from({ length: 57 }).map((_, i) => ({
    id: `c_${i + 1}`,
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@mail.com`,
    document: String(10000000000 + i),
    isActive: i % 3 !== 0,
    createdAt: now,
  }));
}
