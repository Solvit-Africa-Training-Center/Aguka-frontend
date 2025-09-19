// src/services/api/loanApi.ts
import { apiSlice } from "./apiSlice";

export interface LoanRequest {
  amount: number;
  durationMonths: number;
}

export interface LoanResponse {
  id: string;
  userId: string;
  amount: number;
  durationMonths: number;
  status: string;
  approvedBy: string;
}

export const loanApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    requestLoan: builder.mutation<LoanResponse, LoanRequest>({
      query: (loanData) => ({
        url: "/loans/request",
        method: "POST",
        body: loanData,
      }),
      // optional: invalidatesTags if you have loan list queries
      invalidatesTags: ["Loan"],
    }),
  }),
  overrideExisting: true,
});

export const { useRequestLoanMutation } = loanApi;
