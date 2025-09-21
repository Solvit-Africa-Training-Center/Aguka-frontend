// src/types/loan.ts

export type LoanStatus = "pending" | "approved" | "denied" | "repaid";
// extend with any other statuses your backend supports

export interface Loan {
  id: string;
  userId: string;
  amount: number;
  durationMonths: number;
  status: LoanStatus;
  approvedBy?: string;   // optional, only if approved
  createdAt: string;     // ISO string
  updatedAt: string;     // ISO string
}

// For requesting a loan
export interface LoanRequest {
  amount: number;
  durationMonths: number;
}

// For creating a loan (same as LoanRequest in your case)
export type LoanCreate = LoanRequest;

// For updating a loan
export type LoanUpdate = Partial<Omit<Loan, "id" | "userId">> & {
  id: string;
};
