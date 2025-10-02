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

    getGroups: builder.query<Group[], void>({
      query: () => "/groups",
      providesTags: ["Groups"],
    }),

    getGroupById: builder.query<Group, string>({
      query: (id) => `/groups/${id}`,
      providesTags: (_, __, id) => [{ type: "Groups", id }],
    }),

    updateGroup: builder.mutation<Group, { id: string; data: Partial<Group> }>({
      query: ({ id, data }) => ({
        url: `/groups/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Groups", id }],
    }),

    joinGroup: builder.mutation<void, string>({
      query: (id) => ({
        url: `/groups/${id}/join`,
        method: "POST",
      }),
      invalidatesTags: ["Groups"],
    }),

    deleteGroup: builder.mutation<void, string>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Groups"],
    }),

    getGroupMembers: builder.query<any[], string>({
      query: (id) => `/groups/${id}/members`,
      providesTags: (_, __, id) => [{ type: "Groups", id }],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateGroupMutation,
  useGetGroupsQuery,
  useGetGroupByIdQuery,
  useUpdateGroupMutation,
  useJoinGroupMutation,
  useDeleteGroupMutation,
  useGetGroupMembersQuery,
} = groupApi;
