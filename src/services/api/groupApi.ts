// services/api/groupApi.ts
import { apiSlice } from "./apiSlice";
import type { Group } from "types/auth";

export const groupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Create group
    createGroup: builder.mutation<Group, FormData>({
      query: (formData) => ({
        url: "/groups",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Groups"],
    }),

    // ✅ Get all groups
    getGroups: builder.query<Group[], void>({
      query: () => "/groups",
      providesTags: ["Groups"],
    }),

    // // ✅ Get group by ID
    // getGroupById: builder.query<Group, string>({
    //   query: (id) => `/groups/${id}`,
    //   providesTags: (result, error, id) => [{ type: "Groups", id }],
    // }),

    // // ✅ Update group by ID
    // updateGroup: builder.mutation<Group, { id: string; data: Partial<Group> }>({
    //   query: ({ id, data }) => ({
    //     url: `/groups/${id}`,
    //     method: "PUT",
    //     body: data,
    //   }),
    //   invalidatesTags: (result, error, { id }) => [{ type: "Groups", id }],
    // }),

    // ✅ Join group
    joinGroup: builder.mutation<void, string>({
      query: (id) => ({
        url: `/groups/${id}/join`,
        method: "POST",
      }),
      invalidatesTags: ["Groups"],
    }),

    // ✅ Delete group
    deleteGroup: builder.mutation<void, string>({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Groups"],
    }),

    // ✅ Get members of a group
    // getGroupMembers: builder.query<any[], string>({
    //   query: (id) => `/groups/${id}/members`,
    //   providesTags: (result, error, id) => [{ type: "Groups", id }],
    // }),
  }),
  overrideExisting: true,
});

export const {
  useCreateGroupMutation,
  useGetGroupsQuery,
  useJoinGroupMutation,
  useDeleteGroupMutation,
} = groupApi;
