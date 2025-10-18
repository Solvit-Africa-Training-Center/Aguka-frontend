// src/services/api/repaymentApi.ts
import { apiSlice } from "./apiSlice";
import type { Repayment } from "types/Repayment";

export interface RepaymentCreate {
  loanId: string;
  amount: number;
  paymentDate: string;   
  paymentMethod: string; 
}

export const repaymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRepayment: builder.mutation<Repayment, RepaymentCreate>({
      query: (repayment) => ({
        url: "/repayments",
        method: "POST",
        body: repayment, // pass the object directly
      }),
    }),

    getRepayments: builder.query<Repayment[], void>({
      query: () => "/repayments",
    }),

    getRepaymentById: builder.query<Repayment, string>({
      query: (id) => `/repayments/${id}`,
    }),

    updateRepayment: builder.mutation<Repayment, { id: string; data: Partial<Repayment> }>({
      query: ({ id, data }) => ({
        url: `/repayments/${id}`,
        method: "PUT",
        body: data,
      }),
    }),

    deleteRepayment: builder.mutation<void, string>({
      query: (id) => ({
        url: `/repayments/${id}`,
        method: "DELETE",
      }),
    }),

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
