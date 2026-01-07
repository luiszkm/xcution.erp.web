import { Component, EventEmitter, Input, Output } from '@angular/core';

import { LoginFormComponent } from '../components/login-form.component';
import type { LoginConfig } from '../models/login-config.model';
import type { LoginCommand, LoginViewState } from '../models/login.model';

@Component({
  standalone: true,
  selector: 'app-default-login-view',
  imports: [LoginFormComponent],
  template: `
    <h1>{{ config.displayName }}</h1>
    <app-login-form [state]="state" (login)="login.emit($event)" />
  `,
})
export class DefaultLoginView {
  @Input({ required: true }) config!: LoginConfig;
  @Input() state?: LoginViewState;

  @Output() readonly login = new EventEmitter<LoginCommand>();
}
