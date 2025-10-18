import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Contribution } from "types/Contribution";

interface ContributionState {
  contributions: Contribution[];
  selectedContribution: Contribution | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContributionState = {
  contributions: [],
  selectedContribution: null,
  loading: false,
  error: null,
};

const contributionSlice = createSlice({
  name: "contributions",
  initialState,
  reducers: {
    // Set all contributions
    setContributions: (state, action: PayloadAction<Contribution[]>) => {
      state.contributions = action.payload;
    },

    // Add one contribution
    addContribution: (state, action: PayloadAction<Contribution>) => {
      state.contributions.push(action.payload);
    },

    // Update one contribution
    updateContributionLocal: (state, action: PayloadAction<Contribution>) => {
      const index = state.contributions.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.contributions[index] = action.payload;
      }
    },

    // Delete contribution
    deleteContributionLocal: (state, action: PayloadAction<string>) => {
      state.contributions = state.contributions.filter(
        (c) => c.id !== action.payload
      );
    },

    // Select a contribution
    selectContribution: (state, action: PayloadAction<Contribution | null>) => {
      state.selectedContribution = action.payload;
    },

    // Manage loading + errors (optional)
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setContributions,
  addContribution,
  updateContributionLocal,
  deleteContributionLocal,
  selectContribution,
  setLoading,
  setError,
} = contributionSlice.actions;

export default contributionSlice.reducer;
