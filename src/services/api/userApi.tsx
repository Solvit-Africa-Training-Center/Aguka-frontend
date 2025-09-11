import { apiSlice } from "./apiSlice";




export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation<any, { name: string; email: string; password: string }>({
      query: (body) => ({
        url: "/users", 
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useRegisterUserMutation } = userApi;


