// src/services/api/loanSlice.ts
import type { PayloadAction } from "@reduxjs/toolkit";
import type { LoanResponse } from "./loanApi";
import { createSlice } from "@reduxjs/toolkit";

interface LoanState {
  loan: LoanResponse | null;
  error: string | null;
}

const initialState: LoanState = {
  loan: null,
  error: null,
};

const loanSlice = createSlice({
  name: "loan",
  initialState,
  reducers: {
    setLoan: (state, action: PayloadAction<LoanResponse>) => {
      state.loan = action.payload;
      state.error = null;
    },
    setLoanError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loan = null;
    },
    resetLoan: (state) => {
      state.loan = null;
      state.error = null;
    },
  },
});

export const { setLoan, setLoanError, resetLoan } = loanSlice.actions;
export default loanSlice.reducer;
