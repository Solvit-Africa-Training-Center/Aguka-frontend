// src/services/api/apiSlice.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || "/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token"); // get token from localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Groups", "GroupMembers"],
  endpoints: () => ({}),
});
