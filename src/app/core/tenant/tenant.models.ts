export type LoginVariant = 'default' | 'branded';

export interface TenantLoginConfig {
  tenantId: string;
  displayName: string;
  loginVariant: LoginVariant;

  // Branding (público)
  logoUrl?: string;
  primaryColor?: string;     // ex: "#22c55e"
  secondaryColor?: string;   // ex: "#0f172a"
  backgroundImageUrl?: string;
}
