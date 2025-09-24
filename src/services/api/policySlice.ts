
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Policy } from "@models/Policy";

interface PolicyState {
  policies: Policy[];
  loading: boolean;
  error: string | null;
}

const initialState: PolicyState = {
  policies: [],
  loading: false,
  error: null,
};

export const policySlice = createSlice({
  name: "policy",
  initialState,
  reducers: {
    setPolicies: (state, action: PayloadAction<Policy[]>) => {
      state.policies = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setPolicies, setLoading, setError } = policySlice.actions;
export default policySlice.reducer;
