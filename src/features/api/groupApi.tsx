import { apiSlice } from "@features/api/apiSlice"; 

export const groupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation<any, FormData>({
      query: (data) => ({
        url: "/groups",
        method: "POST",
        body: data,
      }),
    }),
    getGroups: builder.query<any, void>({
      query: () => "/groups",
    }),
  }),
});

export const { useCreateGroupMutation, useGetGroupsQuery } = groupApi;
