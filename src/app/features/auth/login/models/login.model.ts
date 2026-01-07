export interface LoginCommand {
  email: string;
  password: string;
}

export type LoginStatus = 'idle' | 'submitting' | 'error';

export interface LoginViewState {
  status: LoginStatus;
  errorMessage?: string;
}
