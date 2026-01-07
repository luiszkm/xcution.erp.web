import {Component, EventEmitter, Input, Output} from '@angular/core';

import { LoginFormComponent } from '../components/login-form.component';
import type { LoginConfig } from '../models/login-config.model';
import type {LoginCommand, LoginViewState} from '../models/login.model';


@Component({
  standalone: true,
  selector: 'app-branded-login-view',
  imports: [LoginFormComponent],
  template: `
    @if (config.logoUrl) {
      <img
        [src]="config.logoUrl"
        [alt]="config.displayName"
        height="40"
      />
    }
    <h1>{{ config.displayName }}</h1>
    <app-login-form [state]="state" (login)="login.emit($event)" />
  `,
})
export class BrandedLoginView {
  @Input({ required: true }) config!: LoginConfig;
  @Input() state?: LoginViewState;
  @Output() readonly login = new EventEmitter<LoginCommand>();

}
