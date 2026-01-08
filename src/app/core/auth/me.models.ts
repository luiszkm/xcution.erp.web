import type { AuthUser } from './auth.models';
import type { NavExtension } from '../navigation/navigation.models';

export interface MeResponse {
  user: AuthUser;
  tenantFeatures: string[];
  menuExtension?: NavExtension;
}
