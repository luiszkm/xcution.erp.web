import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import type { LoginCommand, LoginViewState } from '../models/login.model';

@Component({
  standalone: true,
  selector: 'app-login-form',
  imports: [ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="submit()" novalidate>
      <div>
        <label for="email">Email</label>
        <input id="email" type="email" formControlName="email" autocomplete="username" />

        @if (email.touched && email.invalid) {
          <small>
            @if (email.errors?.['required']) { Email is required. }
            @if (email.errors?.['email']) { Email is invalid. }
          </small>
        }
      </div>

      <div>
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          formControlName="password"
          autocomplete="current-password"
        />

        @if (password.touched && password.invalid) {
          <small>
            @if (password.errors?.['required']) { Password is required. }
            @if (password.errors?.['minlength']) { Min 8 characters. }
          </small>
        }
      </div>

      @if (state?.status === 'error' && state?.errorMessage) {
        <p role="alert">{{ state?.errorMessage }}</p>
      }

      <button type="submit" [disabled]="form.invalid || state?.status === 'submitting'">
        @if (state?.status === 'submitting') { Signing in... } @else { Sign in }
      </button>
    </form>
  `,
})
export class LoginFormComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  @Input() state?: LoginViewState;
  @Output() readonly login = new EventEmitter<LoginCommand>();

  readonly form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(8)]),
  });

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.login.emit(this.form.getRawValue());
  }
}
