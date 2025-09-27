// src/services/api/repaymentApi.ts
import { apiSlice } from "./apiSlice";
import type { Repayment } from "types/Repayment";

// Update the type to match the backend
export interface RepaymentCreate {
  loanId: string;
  amount: number;
  paymentDate: string;   
  paymentMethod: string; 
}

export const repaymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create repayment
    createRepayment: builder.mutation<Repayment, RepaymentCreate>({
      query: (repayment) => ({
        url: "/repayments",
        method: "POST",
        body: repayment, // pass the object directly
      }),
    }),

    // Get all repayments
    getRepayments: builder.query<Repayment[], void>({
      query: () => "/repayments",
    }),

    // Get repayment by ID
    getRepaymentById: builder.query<Repayment, string>({
      query: (id) => `/repayments/${id}`,
    }),

    // Update repayment
    updateRepayment: builder.mutation<Repayment, { id: string; data: Partial<Repayment> }>({
      query: ({ id, data }) => ({
        url: `/repayments/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    // Delete repayment
    deleteRepayment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/repayments/${id}`,
        method: "DELETE",
      }),
    }),

    // Get remaining balance for a loan
    getLoanBalance: builder.query<{ balance: number }, string>({
      query: (loanId) => `/repayments/loan/${loanId}/balance`,
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateRepaymentMutation,
  useGetRepaymentsQuery,
  useGetRepaymentByIdQuery,
  useUpdateRepaymentMutation,
  useDeleteRepaymentMutation,
  useGetLoanBalanceQuery,
} = repaymentApi;
