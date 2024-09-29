export interface InventoryItem {
  id: string; // Unique identifier
  productName: string;
  productCategory: string;
  quantity: number;
  expiryDate: string; // Format YYYY-MM-DD
  isPerishable: boolean;
  isDamaged: boolean;
  }
  
  export type InventoryList = InventoryItem[];
  