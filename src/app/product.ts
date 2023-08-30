export interface Product {
    productId: number
    description: string
    imageURL: string
    inventory: Inventory[]
    name: string
  }
  
  export interface Inventory {
    stock: number
    id: Id
  }
  
  export interface Id {
    warehouseId: number
    productId: number
  }
  