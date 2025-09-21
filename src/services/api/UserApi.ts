// services/api/userApi.ts
import { apiSlice } from "./apiSlice";
import type { User } from "types/User";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    approveUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useApproveUserMutation,
} = userApi;
