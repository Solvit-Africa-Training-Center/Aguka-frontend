// features/dividend/dividendSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Dividend } from "types/Dividend";

interface DividendState {
  dividends: Dividend[];
  loading: boolean;
  error: string | null;
}

const initialState: DividendState = {
  dividends: [],
  loading: false,
  error: null,
};

const dividendSlice = createSlice({
  name: "dividends",
  initialState,
  reducers: {
    setDividends: (state, action: PayloadAction<Dividend[]>) => {
      state.dividends = action.payload;
    },

    addDividend: (state, action: PayloadAction<Dividend>) => {
      state.dividends.push(action.payload);
    },

    clearDividends: (state) => {
      state.dividends = [];
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
  setDividends,
  addDividend,
  clearDividends,
  setLoading,
  setError,
} = dividendSlice.actions;

export default dividendSlice.reducer;
