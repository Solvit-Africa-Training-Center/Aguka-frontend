import { apiSlice } from "./apiSlice";
import type { Loan, LoanRequest, LoanStatus } from "types/Loan";

export const loanApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    requestLoan: builder.mutation<Loan, LoanRequest>({
      query: (loanData) => ({
        url: "/loans/request",
        method: "POST",
        body: loanData,
      }),
      invalidatesTags: ["Loan"],
    }),

    
    getLoans: builder.query<Loan[], void>({
      query: () => "/loans",
      providesTags: ["Loan"],
    }),

    getLoanById: builder.query<Loan, string>({
      query: (id) => `/loans/${id}`,
      providesTags: (_result, _error, id) => [{ type: "Loan", id }],
    }),

    
    getLoansByStatus: builder.query<Loan[], LoanStatus>({
      query: (status) => `/loans/status/${status}`,
      providesTags: ["Loan"],
    }),

    
     approveLoan: builder.mutation<Loan, string>({ // string = loan id
      query: (id) => ({
        url: `/loans/${id}/approve`,
        method: "PATCH",
      }),
    }),
   
     rejectLoan: builder.mutation<Loan, string>({
      query: (id) => ({
        url: `/loans/${id}/deny`,
        method: "PATCH",
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
  useRequestLoanMutation,
  useGetLoansQuery,
  useGetLoanByIdQuery,
  useGetLoansByStatusQuery,
  useApproveLoanMutation,
  useRejectLoanMutation,
} = loanApi;
