export interface Item {
  shortDescription: string;
  price: string;
}

export interface Receipet {
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  total: string;
  items: Item[];
}
