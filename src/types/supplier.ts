export type SupplierStatus = "Verified" | "Pending" | "Unverified";

export type Supplier = {
  id: string;
  name: string;
  company: string;
  location: string;
  rating: number;
  reviews: number;
  responseTime: string;
  verified: boolean;
  status: SupplierStatus;
  yearsEstablished: number;
  monthlyVolume: string;
  specialties: string[];
  gstRegistered: boolean;
  avatar: string;
};
