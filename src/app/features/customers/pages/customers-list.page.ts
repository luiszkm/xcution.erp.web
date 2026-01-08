import { Component, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, of } from 'rxjs';

import { CUSTOMERS_API } from '../data-access/customers-api.token';
import type { CustomersApi } from '../data-access/customers-api.token';
import type { Customer } from '../models/customer.model';
import type { PageRequest, PageResult } from '../models/customer.query';

import { CustomersGridComponent } from '../components/customers-grid.component';

@Component({
  standalone: true,
  selector: 'app-customers-list-page',
  imports: [CustomersGridComponent],
  template: `
    <h1>Customers</h1>

    <input
      type="search"
      placeholder="Search..."
      (input)="onSearch($any($event.target).value)"
    />

    <app-customers-grid
      [items]="data().items"
      [loading]="loading()"
      [error]="error()"
    />

    <p>Total: {{ data().total }}</p>

    <button (click)="prev()" [disabled]="page() === 1 || loading()">Prev</button>
    <button
      (click)="next()"
      [disabled]="loading() || page() * pageSize >= data().total"
    >
      Next
    </button>
  `,
})
export class CustomersListPage {
  private readonly api: CustomersApi = inject(CUSTOMERS_API);

  readonly pageSize = 10;

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly page = signal(1);
  readonly search = signal<string | undefined>(undefined);
  readonly data = signal<PageResult<Customer>>({ items: [], total: 0 });

  private readonly _searchInput = signal('');

  constructor() {
    effect(() => {
      const term = this._searchInput();
      const handle = setTimeout(() => this.onSearchCommit(term), 250);
      return () => clearTimeout(handle);
    });

    this.load();
  }

  private load(): void {
    const req: PageRequest = {
      page: this.page(),
      pageSize: this.pageSize,
      search: this.search(),
    };

    this.loading.set(true);
    this.error.set(null);

    this.api
      .list(req)
      .pipe(
        takeUntilDestroyed(),
        catchError(() => {
          this.error.set('Failed to load customers.');
          return of({ items: [], total: 0 });
        }),
        finalize(() => this.loading.set(false))
      )
      .subscribe((res) => this.data.set(res));
  }

  onSearch(term: string): void {
    this._searchInput.set(term);
  }

  private onSearchCommit(term: string): void {
    this.search.set(term || undefined);
    this.page.set(1);
    this.load();
  }

  next(): void {
    this.page.update((p) => p + 1);
    this.load();
  }

  prev(): void {
    this.page.update((p) => Math.max(1, p - 1));
    this.load();
  }
}
