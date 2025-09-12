import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Detect if we’re running locally
const isDev = import.meta.env.DEV;

// If dev => use proxy `/api`, else => use the real API
const baseUrl = isDev ? "/api" : import.meta.env.VITE_API_BASE_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
