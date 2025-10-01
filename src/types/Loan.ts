// Loan status type
export type LoanStatus = "pending" | "approved" | "denied" | "paid";

// Loan model
export interface Loan {
  id: string;
  userId: string;
  groupId?: string;
  amount: number; // <-- Use this instead of amountRequested
  durationMonths: number;
  status: LoanStatus;
  approvedBy?: string;
  createdAt: string;
  updatedAt: string;
  remainingBalance: number;
  reason?: string; 
  member?: string; 
  monthlyContribution?: number;
  employmentStatus?: string;
  previousLoans?: Loan[];
}

export interface LoanRequest {
  amount: number;
  durationMonths: number;
}
export type LoanResponse = Loan;
export type LoanCreate = LoanRequest;

export type LoanUpdate = Partial<Omit<Loan, "id" | "userId">> & {
  id: string;
};

export interface LoanDetailProps {
  isOpen: boolean;
  onClose: () => void;
  member: string;
  amountRequested: number; 
  previousLoans: Loan[];   
  monthlyContribution: number; 
  employmentStatus: string;
}

// LoanApprovalCard props
export interface LoanApprovalCardProps {
  name: string;
  date: string;
  amount: number; 
  reason: string;
  onView: () => void;
  onApprove: () => void;
  onReject: () => void;
}
