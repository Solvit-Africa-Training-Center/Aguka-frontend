// types/Transaction.ts
export interface User {
  id: string;
  name: string;
  createdAt: string;
  isApproved: boolean;
}

export interface Loan {
  id: string;
  amount: number;
  status: string;
  createdAt: string;
  user?: User;
}

export interface Repayment {
  id: string;
  amount: number;
  paymentMethod: string;
  paymentDate: string;
  user?: User;
}

export interface Contribution {
  id: string;
  amount: number;
  createdAt: string;
  user?: User;
}
