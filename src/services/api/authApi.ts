import { apiSlice } from "./apiSlice";
import type { User } from "@models/User";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials: { identifier: string; password: string }) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
    registerUser: builder.mutation({
      query: (user: { name: string; email: string; password: string }) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    initiateGoogleLogin: builder.query<string, void>({
      query: () => ({ url: "/auth/google", method: "GET" }),
    }),
    handleGoogleCallback: builder.mutation({
      query: (code: string) => ({
        url: `/auth/google/callback?code=${code}`,
        method: "GET",
      }),
    }),
    completeProfile: builder.mutation({
      query: (profile: { phoneNumber: string; groupId: string }) => ({
        url: "/users/complete-profile",
        method: "PUT",
        body: profile,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
    getUsers: builder.query<{ data: User[] }, void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    updateUser: builder.mutation<User, Partial<User> & { id: string }>({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Users"],
    }),
    approveUser: builder.mutation<User, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: { isApproved: true },
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<{ success: boolean; id: string }, string>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // --- New endpoints ---
    forgotPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (payload) => ({
        url: "/forgot-password",
        method: "POST",
        body: payload,
      }),
    }),
    resetPassword: builder.mutation<
      { message: string },
      { token: string; newPassword: string }
    >({
      query: (payload) => ({
        url: "/reset-password",
        method: "POST",
        body: payload,
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useLazyInitiateGoogleLoginQuery,
  useHandleGoogleCallbackMutation,
  useCompleteProfileMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useApproveUserMutation,
  useDeleteUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useLogoutMutation,
} = authApi;
