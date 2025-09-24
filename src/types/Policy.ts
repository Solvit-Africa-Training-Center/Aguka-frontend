export interface Policy {
  id: number;
  type: "LOAN_STANDARD" | "LOAN_OVERDUE";
  rate: number;
  frequency: "MONTHLY" | "DAILY";
  gracePeriodDays?: number | null;
}