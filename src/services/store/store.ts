// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "@services/api/groupSlice";
import authReducer from "@services/api/authSlice";

import { apiSlice } from "@services/api/apiSlice";
import loanReducer from "@services/api/loanSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
      auth: authReducer,
    group: groupReducer,
<<<<<<< HEAD
     loan: loanReducer,
=======
    
>>>>>>> d560c63c1bf4c75c9bd21af28c178c649bfc5179
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
