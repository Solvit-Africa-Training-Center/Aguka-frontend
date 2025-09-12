// src/slices/groupSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface GroupState {
  createdGroupId: string | null;
  successMessage: string | null;
  errorMessage: string | null;
}

const initialState: GroupState = {
  createdGroupId: null,
  successMessage: null,
  errorMessage: null,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroupSuccess: (
      state,
      action: PayloadAction<{ groupId: string; message?: string }>
    ) => {
      state.createdGroupId = action.payload.groupId;
      state.successMessage = action.payload.message ?? "Group created";
      state.errorMessage = null;
    },
    setGroupError: (
      state,
      action: PayloadAction<{ message: string; groupId?: string | null }>
    ) => {
      state.errorMessage = action.payload.message;
      state.successMessage = null;
      state.createdGroupId = action.payload.groupId ?? null;
    },
    clearGroupMessages: (state) => {
      state.successMessage = null;
      state.errorMessage = null;
      state.createdGroupId = null;
    },
  },
});

export const { setGroupSuccess, setGroupError, clearGroupMessages } =
  groupSlice.actions;
export default groupSlice.reducer;
