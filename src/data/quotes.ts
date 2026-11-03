import type { Quote } from "@/types/quote";

export const quotes: Quote[] = [
  {
    id: "qt-301",
    supplierName: "Ananya Packaging",
    productName: "Premium Corrugated Cartons",
    price: 499,
    moq: 100,
    leadTime: "4 days",
    validity: "7 days",
    rating: 4.8,
    isPreferred: true,
  },
  {
    id: "qt-302",
    supplierName: "Vikram Electricals",
    productName: "Commercial LED Tube Light",
    price: 760,
    moq: 50,
    leadTime: "5 days",
    validity: "10 days",
    rating: 4.7,
  },
  {
    id: "qt-303",
    supplierName: "Nila Storage",
    productName: "Heavy Duty Storage Bins",
    price: 625,
    moq: 75,
    leadTime: "6 days",
    validity: "6 days",
    rating: 4.5,
  },
];
