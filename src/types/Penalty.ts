export interface Penalty {
  id: string;
  loanId: string;
  policyId: string;
  type: "DISCIPLINARY" | "OTHER"; // You can add more types as needed
  amount: number;
  paymentMethod: "Cash" | "Transfer" | "Other";
  description: string;
  paid: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PenaltyCreate {
  loanId: string;
  policyId: string;
  type: string;
  amount: number;
  paymentMethod: string;
  description: string;
}

export interface PenaltyPayment {
  paymentMethod: string;
  amountPaid?: number; // Optional, depending on your API
}
