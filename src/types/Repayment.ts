// types/Repayment.ts

export type PaymentMethod = "Cash" | "Transfer" | "Bank" | "MobileMoney" | "Other"; // Adjust as needed

export interface Repayment {
  id: string;
  loanId: string;
  amount: number;
  paymentDate: string; // ISO date string
  paymentMethod: PaymentMethod;
  createdAt: string;
  updatedAt: string;
}

export interface RepaymentCreate {
  loanId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: PaymentMethod;
}

export interface RepaymentUpdate {
  amount?: number;
  paymentDate?: string;
  paymentMethod?: PaymentMethod;
}

export interface RemainingBalance {
  balance: number;
}
