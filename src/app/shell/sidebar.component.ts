import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { NavigationService } from '../core/navigation/navigation.service';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <aside class="sidebar">
      <nav class="nav" aria-label="Main navigation">
        @for (item of nav.items(); track item.id) {
          <a
            [routerLink]="item.route"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{ exact: true }"
          >
            {{ item.label }}
          </a>
        }
      </nav>
    </aside>
  `,
  styles: [
    `
      .sidebar { padding: 16px; border-right: 1px solid #e5e7eb; }
      .nav { display: flex; flex-direction: column; gap: 8px; }
      a { text-decoration: none; color: inherit; padding: 8px 10px; border-radius: 8px; }
      a.active { background: #f3f4f6; }
    `,
  ],
})
export class AppSidebarComponent {
  readonly nav = inject(NavigationService);
}
