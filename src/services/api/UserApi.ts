// services/api/userApi.ts
import { apiSlice } from "./apiSlice";
import type { User } from "types/User";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get all users
    getUsers: builder.query<User[], void>({
      query: () => "/users",
      providesTags: ["Users"],
    }),

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
    approveUser: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (id) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { isApproved: true },
      }),
      invalidatesTags: ["Users"],
    }),

    // Update user (profile updates)
    updateUser: builder.mutation<User, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
  overrideExisting: true,
});

// Export hooks
export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,
  useApproveUserMutation,
  useUpdateUserMutation,
} = userApi;
