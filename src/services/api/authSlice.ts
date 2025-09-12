import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"; // 👈 type-only import

interface AuthState {
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ role: string; token: string }>
    ) => {
      state.role = action.payload.role;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.role = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
