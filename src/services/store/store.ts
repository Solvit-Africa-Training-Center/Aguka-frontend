// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "@services/api/groupSlice";
import authReducer from "@services/api/authSlice";

import { apiSlice } from "@services/api/apiSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
    group: groupReducer,
    
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
