import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ token: string; role: string }>
    ) {
      state.token = action.payload.token;
      state.role = action.payload.role;
    },
    clearCredentials(state) {
      state.token = null;
      state.role = null;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
