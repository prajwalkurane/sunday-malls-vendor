export type Quote = {
  id: string;
  supplierName: string;
  productName: string;
  price: number;
  moq: number;
  leadTime: string;
  validity: string;
  rating: number;
  isPreferred?: boolean;
};
