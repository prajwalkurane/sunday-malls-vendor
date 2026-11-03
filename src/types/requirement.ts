export type Requirement = {
  id: string;
  title: string;
  quantity: string;
  budget: string;
  category: string;
  location: string;
  postedAt: string;
  responses: number;
  urgency: "High" | "Medium" | "Low";
};
