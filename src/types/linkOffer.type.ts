export interface LinkOffer {
  _id: string;
  productId: string;
  storeName: "Amazon" | "Noon" | "Sephora" | "Ulta" | "Jumia" | "AliExpress";
  country: string;
  url: string;
  priceSelector: string;
  currentPrice: number;       
  oldPrice: number;    
  currency: string;
}

export interface PriceFormState {
  storeName: "Amazon" | "Noon" | "Sephora" | "Ulta" | "Jumia" | "AliExpress";
  country: string;
  currency: string;
  url: string;
  priceSelector: string;
}