export interface Warehouse {
    id: number;
    name: string;
    capacity: number;
    city: string;
    country: string;
    inventory: [];
}

export interface Inventory {
    stock: number
    id: Id
  }
  
  export interface Id {
    warehouseId: number
    productId: number
  }