import type { Order } from "@/types/order";

export const orders: Order[] = [
  {
    id: "ord-401",
    supplierName: "Ananya Packaging",
    productName: "Premium Corrugated Cartons",
    amount: 125400,
    quantity: 240,
    status: "Processing",
    orderDate: "10 Aug 2026",
    eta: "14 Sep 2026",
    location: "Delhi NCR",
  },
  {
    id: "ord-402",
    supplierName: "Vikram Electricals",
    productName: "Commercial LED Tube Light",
    amount: 64120,
    quantity: 80,
    status: "Shipped",
    orderDate: "02 Sep 2026",
    eta: "09 Sep 2026",
    location: "Bengaluru",
  },
  {
    id: "ord-403",
    supplierName: "Nila Storage",
    productName: "Heavy Duty Storage Bins",
    amount: 47250,
    quantity: 75,
    status: "Delivered",
    orderDate: "18 Aug 2026",
    eta: "Delivered",
    location: "Jaipur",
  },
];
