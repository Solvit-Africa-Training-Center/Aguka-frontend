// services/api/contributionApi.ts
import { apiSlice } from "./apiSlice";
import type { Contribution, ContributionCreate, ContributionUpdate } from "types/Contribution";


export const contributionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContribution: builder.mutation<Contribution, ContributionCreate>({
      query: (data) => ({
        url: "/contributions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contributions"],
    }),
    getContributionsByUser: builder.query<Contribution[], string>({
      query: (userId) => `/contributions/user/${userId}`,
      providesTags: ["Contributions"],
    }),
    getTodayContribution: builder.query<Contribution[], void>({
      query: () => "/contributions/today",
      providesTags: ["Contributions"],
    }),
    updateContribution: builder.mutation<
      Contribution,
      { id: string; data: Partial<Contribution> }
    >({
      query: ({ id, data }) => ({
        url: `/contributions/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Contributions"],
    }),
    deleteContribution: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contributions/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contributions"],
    }),
    getGroupContributions: builder.query<Contribution[], string>({
      query: (groupId) => `/contributions/group/${groupId}`,
      providesTags: ["Contributions"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateContributionMutation,
  useGetContributionsByUserQuery,
  useGetTodayContributionQuery,
  useUpdateContributionMutation,
  useDeleteContributionMutation,
  useGetGroupContributionsQuery,
} = contributionApi;
