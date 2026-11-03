import type { Requirement } from "@/types/requirement";

export const requirements: Requirement[] = [
  {
    id: "req-201",
    title: "Packaging for festive retail bundles",
    quantity: "500 cartons",
    budget: "₹2.5L",
    category: "Packaging",
    location: "Delhi NCR",
    postedAt: "2 hours ago",
    responses: 18,
    urgency: "High",
  },
  {
    id: "req-202",
    title: "LED tube lights for showroom fit-out",
    quantity: "180 units",
    budget: "₹1.8L",
    category: "Electronics",
    location: "Bengaluru",
    postedAt: "5 hours ago",
    responses: 11,
    urgency: "Medium",
  },
  {
    id: "req-203",
    title: "Storage bins for warehouse inventory",
    quantity: "270 pieces",
    budget: "₹1.2L",
    category: "Home Essentials",
    location: "Jaipur",
    postedAt: "1 day ago",
    responses: 9,
    urgency: "Low",
  },
];
