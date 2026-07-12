export interface Plan {
  id: number;
  name: string;
  description: string;
  price: number;
  billingCycle: string;
  features: string[];
}