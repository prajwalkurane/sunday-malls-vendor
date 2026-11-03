export type OrderStatus = "Processing" | "Packed" | "Shipped" | "Delivered" | "Cancelled";

export type Order = {
  id: string;
  supplierName: string;
  productName: string;
  amount: number;
  quantity: number;
  status: OrderStatus;
  orderDate: string;
  eta: string;
  location: string;
};
