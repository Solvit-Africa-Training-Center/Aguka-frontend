// services/api/adminApi.ts

import { apiSlice } from "./apiSlice";
import type { AdminOverview, User, GroupDistribution } from "types/Admin";

export const adminApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminOverview: builder.query<AdminOverview, void>({
      query: () => "/admin/overview",
      providesTags: ["AdminOverview"],
    }),

    getInactiveUsers: builder.query<User[], void>({
      query: () => "/admin/inactive-users",
      providesTags: ["InactiveUsers"],
    }),

    getGroupDistribution: builder.query<GroupDistribution[], void>({
      query: () => "/admin/group-distribution",
      providesTags: ["GroupDistribution"],
    }),
    
  }),
  overrideExisting: true,
});

export const {
  useGetAdminOverviewQuery,
  useGetInactiveUsersQuery,
  useGetGroupDistributionQuery,
  
} = adminApi;
