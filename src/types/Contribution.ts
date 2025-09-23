
export type PaymentMethod = "momo" | "cash" | "bank"; 

export interface Contribution {
  id: string; // unique contribution id (optional if backend auto-generates)
  userId: string;
  groupId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  contributionDate: string; // ISO date string (e.g. 2025-09-06T15:30:00Z)
}

// For creating a new contribution (no id yet)
export type ContributionCreate = Omit<Contribution, "id">;

// For updating a contribution (id + partial fields)
export type ContributionUpdate = Partial<Omit<Contribution, "id">> & {
  id: string;
};
