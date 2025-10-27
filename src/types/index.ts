export interface Product {
  id: string;
  name: string;
  category: string;
  size: string;
  color: string;
  quantity: number;
  price: number;
  supplier: string;
  registeredBy: string;
  registeredAt: string;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  email: string;
  registeredAt: string;
}
