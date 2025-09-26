// src/types/loan.ts

export type LoanStatus = "pending" | "approved" | "denied" | "paid";
// extend with any other statuses your backend supports

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  durationMonths: number;
  status: LoanStatus;
  approvedBy?: string;   // optional, only if approved
  createdAt: string;     // ISO string
  updatedAt: string;  
  remainingBalance: number;   // ISO string
}

// For requesting a loan
export interface LoanRequest {
  amount: number;
  durationMonths: number;
}
// src/types/loan.ts
export type LoanResponse = Loan; // alias if you prefer

// For creating a loan (same as LoanRequest in your case)
export type LoanCreate = LoanRequest;

// For updating a loan
export type LoanUpdate = Partial<Omit<Loan, "id" | "userId">> & {
  id: string;
};
