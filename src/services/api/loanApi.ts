import { apiSlice } from "./apiSlice";
import type { Loan, LoanRequest, LoanStatus } from "types/Loan";

export const loanApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Request a new loan
    requestLoan: builder.mutation<Loan, LoanRequest>({
      query: (loanData) => ({
        url: "/loans/request",
        method: "POST",
        body: loanData,
      }),
      invalidatesTags: ["Loan"],
    }),

    // ✅ Get all loans
    getLoans: builder.query<Loan[], void>({
      query: () => "/loans",
      providesTags: ["Loan"],
    }),

    // ✅ Get single loan by ID
    getLoanById: builder.query<Loan, string>({
      query: (id) => `/loans/${id}`,
      providesTags: (result, error, id) => [{ type: "Loan", id }],
    }),

    // ✅ Get loans by status
    getLoansByStatus: builder.query<Loan[], LoanStatus>({
      query: (status) => `/loans/status/${status}`,
      providesTags: ["Loan"],
    }),

    // ✅ Approve loan
    approveLoan: builder.mutation<Loan, string>({
      query: (id) => ({
        url: `/loans/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Loan", id }],
    }),

    // ✅ Deny loan
    denyLoan: builder.mutation<Loan, string>({
      query: (id) => ({
        url: `/loans/${id}/deny`,
        method: "PATCH",
      }),
      invalidatesTags: (result, error, id) => [{ type: "Loan", id }],
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
  useDenyLoanMutation,
} = loanApi;
