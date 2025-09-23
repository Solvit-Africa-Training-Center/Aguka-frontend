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
        headers: {
          // Authorization: `Bearer ${localStorage.getItem("token")}`, // if needed
        },
      }),
      }),
      updateUser: builder.mutation<User, Partial<User> & { id: string }>({
  query: ({ id, ...patch }) => ({
    url: `/users/${id}`,
    method: "PATCH",
    body: patch,
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
  useDeleteUserMutation,
} = authApi;
