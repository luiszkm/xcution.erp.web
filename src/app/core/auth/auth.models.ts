export type Role = 'Admin' | 'Manager' | 'User';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  tenantId: string;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
}
