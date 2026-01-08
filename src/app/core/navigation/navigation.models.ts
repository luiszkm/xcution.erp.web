export interface NavItem {
  id: string;
  label: string;
  route: string;
  order: number;

  requiredFeatures?: string[];
  requiredRoles?: string[];
}

export interface NavOverride {
  id: string;
  label?: string;
  route?: string;
  order?: number;
  requiredFeatures?: string[];
  requiredRoles?: string[];
}

export interface NavExtension {
  removeIds?: string[];
  override?: NavOverride[];
  add?: NavItem[];
}
