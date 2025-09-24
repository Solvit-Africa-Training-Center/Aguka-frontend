// features/admin/adminSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AdminOverview, User, GroupDistribution } from "types/Admin";

interface AdminState {
  overview: AdminOverview | null;
  inactiveUsers: User[];
  groupDistribution: GroupDistribution[];
  loading: boolean;
  error: string | null;
}

const initialState: AdminState = {
  overview: null,
  inactiveUsers: [],
  groupDistribution: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setOverview: (state, action: PayloadAction<AdminOverview>) => {
      state.overview = action.payload;
    },
    setInactiveUsers: (state, action: PayloadAction<User[]>) => {
      state.inactiveUsers = action.payload;
    },
    setGroupDistribution: (
      state,
      action: PayloadAction<GroupDistribution[]>
    ) => {
      state.groupDistribution = action.payload;
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
  setOverview,
  setInactiveUsers,
  setGroupDistribution,
  setLoading,
  setError,
} = adminSlice.actions;

export default adminSlice.reducer;
