// services/api/groupApi.ts
import { apiSlice } from "./apiSlice";
import type { Group } from "types/auth";

export const groupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation<Group, FormData>({
      query: (formData) => ({
        url: "/groups",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Groups"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateGroupMutation } = groupApi;
