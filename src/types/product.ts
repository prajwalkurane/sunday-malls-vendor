export type ProductCategory =
  | "Packaging"
  | "Electronics"
  | "Home Essentials"
  | "Office Supplies"
  | "Food & Beverage"
  | "Industrial Tools";

export type ProductImage = {
  src: string;
  alt: string;
};

export type PriceTier = {
  min: number;
  max: number | null;
  price: number;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  description: string;
  supplierId: string;
  images: ProductImage[];
  minOrderQty: number;
  unit: string;
  price: number;
  currency: "INR";
  priceTiers: PriceTier[];
  rating: number;
  reviews: number;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  fulfillment: string;
  location: string;
  responseTime: string;
  verified: boolean;
  gstRegistered: boolean;
};
