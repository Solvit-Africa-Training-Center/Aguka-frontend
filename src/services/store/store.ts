import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "@services/api/apiSlice";
import authReducer from "@services/api/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, // 👈 register auth slice here
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
