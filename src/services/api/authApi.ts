import { apiSlice } from "./apiSlice";

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
    // ✅ New complete-profile mutation
    completeProfile: builder.mutation({
      query: (profile: { phone: string; groupId: string }) => ({
        url: "/users/complete-profile",
        method: "POST",
        body: profile,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterUserMutation,
  useLazyInitiateGoogleLoginQuery,
  useHandleGoogleCallbackMutation,
  useCompleteProfileMutation, // 👈 export hook
} = authApi;
