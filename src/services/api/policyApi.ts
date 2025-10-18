
import { apiSlice } from "./apiSlice";
import type { Policy } from "@models/Policy";


export const policyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPolicies: builder.query<Policy[], void>({
      query: () => "/policies",
      providesTags: ["Policies"], 
    }),
      createPolicy: builder.mutation<Policy, Partial<Policy>>({
      query: (policy) => ({
        url: "/policies",
        method: "POST",
        body: policy,
      }),
      invalidatesTags: ["Policies"],
    }),
  }),
});

export const { useGetPoliciesQuery, useCreatePolicyMutation } = policyApi;
