export interface InventoryItem {
    id: number; // Unique identifier for the item
    productName: string; // Name of the product
    category: string; // Category of the product
    quantity: number; // Amount of the product in stock
    expiryDate: string; // Expiry date of the product
    isDamaged: boolean; // Flag to indicate if the product is damaged
  }
  
  export type InventoryList = InventoryItem[];
  