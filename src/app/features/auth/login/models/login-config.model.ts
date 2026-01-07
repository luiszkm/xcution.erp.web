export type LoginVariant = 'default' | 'branded';

export interface LoginConfig {
  tenantId: string;
  displayName: string;
  loginVariant: LoginVariant;

  logoUrl?: string;
  primaryColor?: string;
  secondaryColor?: string;
  backgroundImageUrl?: string;
}
