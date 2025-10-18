// src/features/repayments/repaymentSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { Repayment } from "types/Repayment";
import type { PayloadAction } from "@reduxjs/toolkit";

interface RepaymentState {
  selectedRepayment: Repayment | null;
}

const initialState: RepaymentState = {
  selectedRepayment: null,
};

const repaymentSlice = createSlice({
  name: "repayment",
  initialState,
  reducers: {
    setSelectedRepayment: (state, action: PayloadAction<Repayment | null>) => {
      state.selectedRepayment = action.payload;
    },
  },
});

export const { setSelectedRepayment } = repaymentSlice.actions;
export default repaymentSlice.reducer;
