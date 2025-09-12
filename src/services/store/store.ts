// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "@services/api/groupSlice";
import { apiSlice } from "@services/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    group: groupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
