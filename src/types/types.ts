export interface IceProduct {
  id: string;
  name: string;
  type: 'bag' | 'basket';
  quantity: number;
  price: number;
}

export interface InventoryState {
  products: IceProduct[];
}

export interface ProductionRecord {
  id: string;
  date: string; // Fecha completa en ISO string
  productId: string;
  productName: string;
  quantity: number;
  timestamp: number; // Para ordenamiento
}

export interface Client {
  id: string;
  identifier: string; // Cédula o RIF
  name: string;
  debt: number;
  createdAt: string;
  updatedAt: string;
}

export interface SaleProduct {
  productId: string;
  productName: string; // Asegurar que siempre tenga nombre
  quantity: number;
  unitPrice: number;
}

// Tipo para el formulario de venta (sin productName)
export interface SaleFormProduct {
  productId: string;
  quantity: number;
  unitPrice: number;
}

export interface Sale {
  id: string;
  date: string;
  clientId: string | null;
  clientName: string;
  products: SaleProduct[]; // Usar el tipo con productName
  total: number;
  paymentMethod: 'cash' | 'credit';
  paidAmount?: number;
  change?: number;
  status: 'completed' | 'pending' | 'cancelled';
}

export interface SaleFormData {
  clientId: string | null;
  products: SaleFormProduct[]; // Tipo sin productName para el formulario
  paymentMethod: 'cash' | 'credit';
  paidAmount?: number;
}