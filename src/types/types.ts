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

/*
  export interface ProductionRecord {
    id: string;
    date: string;
    productId: string;
    quantity: number;
  }
  
  export interface SaleRecord {
    id: string;
    date: string;
    productId: string;
    quantity: number;
    client: string;
    total: number;
  }
  
  export interface InventoryState {
    products: IceProduct[];
    production: ProductionRecord[];
    sales: SaleRecord[];
  }
*/