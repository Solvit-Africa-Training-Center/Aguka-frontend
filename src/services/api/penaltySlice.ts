import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Penalty } from "types/Penalty";

interface PenaltyState {
  penalties: Penalty[];
  selectedPenalty: Penalty | null;
  loading: boolean;
  error: string | null;
}

const initialState: PenaltyState = {
  penalties: [],
  selectedPenalty: null,
  loading: false,
  error: null,
};

const penaltySlice = createSlice({
  name: "penalties",
  initialState,
  reducers: {
    // Set all penalties
    setPenalties: (state, action: PayloadAction<Penalty[]>) => {
      state.penalties = action.payload;
    },

    // Add one penalty
    addPenalty: (state, action: PayloadAction<Penalty>) => {
      state.penalties.push(action.payload);
    },

    // Update one penalty
    updatePenaltyLocal: (state, action: PayloadAction<Penalty>) => {
      const index = state.penalties.findIndex(
        (p) => p.id === action.payload.id
      );
      if (index !== -1) {
        state.penalties[index] = action.payload;
      }
    },

    // Delete one penalty by ID
    deletePenaltyLocal: (state, action: PayloadAction<string>) => {
      state.penalties = state.penalties.filter((p) => p.id !== action.payload);
    },

    // Select a penalty
    selectPenalty: (state, action: PayloadAction<Penalty | null>) => {
      state.selectedPenalty = action.payload;
    },

    // Loading & error state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setPenalties,
  addPenalty,
  updatePenaltyLocal,
  deletePenaltyLocal,
  selectPenalty,
  setLoading,
  setError,
} = penaltySlice.actions;

export const penaltyReducer = penaltySlice.reducer;
