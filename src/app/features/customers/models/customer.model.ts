export interface Customer {
  id: string;
  name: string;
  email: string;
  document: string; // cpf/cnpj (sem validar ainda)
  isActive: boolean;
  createdAt: string; // ISO
}

export type CustomerCreate = Omit<Customer, 'id' | 'createdAt'>;
export type CustomerUpdate = Partial<CustomerCreate>;
