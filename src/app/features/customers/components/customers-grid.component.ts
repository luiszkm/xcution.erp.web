import { Component, EventEmitter, Input, Output } from '@angular/core';

import type { Customer } from '../models/customer.model';

@Component({
  standalone: true,
  selector: 'app-customers-grid',
  template: `
    @if (loading) {
      <p>Loading...</p>
    } @else if (error; as err) {
      <p style="color:#b91c1c">Error: {{ err }}</p>
    } @else {
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Document</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          @for (c of items; track c.id) {
            <tr>
              <td>{{ c.name }}</td>
              <td>{{ c.email }}</td>
              <td>{{ c.document }}</td>
              <td>{{ c.isActive ? 'Active' : 'Inactive' }}</td>
            </tr>
          }
        </tbody>
      </table>

      @if (!items?.length) {
        <p>No customers found.</p>
      }
    }
  `,
})
export class CustomersGridComponent {
  @Input({ required: true }) items: Customer[] = [];
  @Input() loading = false;
  @Input() error: string | null = null;
}
