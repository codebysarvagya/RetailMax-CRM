export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string | null;
}

export interface CustomerRequest {
  name: string;
  email: string;
  phone: string;
}
