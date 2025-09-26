// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import groupReducer from "@services/api/groupSlice";
import authReducer from "@services/api/authSlice";

import { apiSlice } from "@services/api/apiSlice";
import loanReducer from "@services/api/loanSlice";
import contributionReducer from "@services/api/contributionSlice";
import emailReducer from "@services/api/EmailSlice";
import feedReducer from "@services/api/feedSlice";
import { penaltyReducer } from "@services/api/penaltySlice";
import repaymentReducer from "@services/api/repaymentSlice";
import announcementReducer from "@services/api/announcementSlice";
import dividendReducer from "@services/api/dividendSlice";
import adminReducer from "@services/api/adminSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    group: groupReducer,
    loan: loanReducer,
    contributions: contributionReducer,
    email: emailReducer,
    feeds: feedReducer,
    penalties: penaltyReducer,
    repayments: repaymentReducer,
    announcements: announcementReducer,
    dividends: dividendReducer,
    admin: adminReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
