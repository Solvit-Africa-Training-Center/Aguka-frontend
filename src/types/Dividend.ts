// types/Dividend.ts

export interface Dividend {
  id: string;
  userId: string;
  groupId: string;
  amount: number;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export interface DividendResponse {
  success: boolean;
  message: string;
  data: Dividend[];
}
export interface UserDividend {
  userContributions: number;
  userShare: number;
  userLoanBalance: number | null;
  userDividend: number;
  userSharePercent: number;
  groupContributions: number;
  groupLoanInterest: number;
  groupPenalties: number | null;
}
