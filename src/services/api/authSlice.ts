import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  role: string | null;
  user: any | null; // Store user info if needed
}

const initialState: AuthState = {
  token: localStorage.getItem("token"),
  role: localStorage.getItem("role"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(
      state,
      action: PayloadAction<{ token: string; role: string; user?: any }>
    ) {
      state.token = action.payload.token;
      state.role = action.payload.role;
      if (action.payload.user) {
        state.user = action.payload.user;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.role);
    },
    clearCredentials(state) {
      state.token = null;
      state.role = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("user");
    },
    logout(state) {
      state.token = null;
      state.role = null;
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, clearCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
