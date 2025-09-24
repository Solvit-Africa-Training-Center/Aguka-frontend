// features/repayment/repaymentSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Repayment } from "types/Repayment";

interface RepaymentState {
  repayments: Repayment[];
  selectedRepayment: Repayment | null;
  loading: boolean;
  error: string | null;
}

const initialState: RepaymentState = {
  repayments: [],
  selectedRepayment: null,
  loading: false,
  error: null,
};

const repaymentSlice = createSlice({
  name: "repayments",
  initialState,
  reducers: {
    setRepayments: (state, action: PayloadAction<Repayment[]>) => {
      state.repayments = action.payload;
    },

    addRepayment: (state, action: PayloadAction<Repayment>) => {
      state.repayments.push(action.payload);
    },

    updateRepaymentLocal: (state, action: PayloadAction<Repayment>) => {
      const index = state.repayments.findIndex(r => r.id === action.payload.id);
      if (index !== -1) {
        state.repayments[index] = action.payload;
      }
    },

    deleteRepaymentLocal: (state, action: PayloadAction<string>) => {
      state.repayments = state.repayments.filter(r => r.id !== action.payload);
    },

    selectRepayment: (state, action: PayloadAction<Repayment | null>) => {
      state.selectedRepayment = action.payload;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setRepayments,
  addRepayment,
  updateRepaymentLocal,
  deleteRepaymentLocal,
  selectRepayment,
  setLoading,
  setError,
} = repaymentSlice.actions;

export default repaymentSlice.reducer;
