import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppHeaderComponent } from './header.component';
import { AppSidebarComponent } from './sidebar.component';

@Component({
  standalone: true,
  selector: 'app-shell',
  imports: [RouterOutlet, AppHeaderComponent, AppSidebarComponent],
  template: `
    <div class="shell">
      <app-header />

      <div class="body">
        <app-sidebar />
        <main class="content">
          <router-outlet />
        </main>
      </div>
    </div>
  `,
  styles: [
    `
      .shell { display: flex; flex-direction: column; min-height: 100dvh; }
      .body { display: grid; grid-template-columns: 260px 1fr; flex: 1; }
      .content { padding: 16px; }
    `,
  ],
})
export class AppShellComponent {}
