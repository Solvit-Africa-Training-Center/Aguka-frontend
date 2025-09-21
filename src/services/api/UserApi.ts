// services/api/userApi.ts
import { apiSlice } from "./apiSlice";
import type { User } from "types/User";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get user by ID
    getUserById: builder.query<User, string>({
      query: (id) => `/users/${id}`,
      providesTags: ["Users"],
    }),

    // Delete user
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // Approve user
    approveUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `/users/${id}/approve`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),

    // Update user (profile updates)
    updateUser: builder.mutation<User, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
  overrideExisting: true,
});

// Export hooks
export const {
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useApproveUserMutation,
  useUpdateUserMutation, // Now defined properly
} = userApi;
