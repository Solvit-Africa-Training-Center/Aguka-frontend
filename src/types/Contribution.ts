
export type PaymentMethod = "momo" | "cash" | "bank"; 

export interface Contribution {
  id: string; 
  userId: string;
  groupId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  contributionDate: string; 
  // createdAt:string;
  // type:string;
  // status:"success" | "Pending" | "Rejected";
  // balance:number;
}

export type ContributionCreate = Omit<Contribution, "id">;


export type ContributionUpdate = Partial<Omit<Contribution, "id">> & {
  id: string;
};

export type ContributionCreateMe = {
  amount: number;
  paymentMethod: PaymentMethod;
};