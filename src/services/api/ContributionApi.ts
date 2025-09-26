// services/api/contributionApi.ts
import { apiSlice } from "./apiSlice";
import type {
  Contribution,
  ContributionCreate,
  ContributionCreateMe,
} from "types/Contribution";

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

    createContributionMe: builder.mutation<Contribution, ContributionCreateMe>({
      query: (data) => ({
        url: "/contributions/me",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contributions"],
    }),

    getContributionsByUser: builder.query<Contribution[], void>({
      query: () => "/contributions/me",
      transformResponse: (response: { data: Contribution[] }) => response.data,
      providesTags: ["Contributions"],
    }),

    getAllContributionsByUser: builder.query<Contribution[], string>({
      query: (userId) => `/contributions/${userId}/all`,
      providesTags: ["Contributions"],
    }),

    getTodayContributionByUser: builder.query<Contribution[], string>({
      query: (userId) => `/contributions/${userId}`,
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

    getGroupContributionsToday: builder.query<Contribution[], string>({
      query: (groupId) => `/contributions/${groupId}/today`,
      providesTags: ["Contributions"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateContributionMutation,
  useCreateContributionMeMutation,
  useGetContributionsByUserQuery,
  useGetAllContributionsByUserQuery,
  useGetTodayContributionByUserQuery,
  useUpdateContributionMutation,
  useDeleteContributionMutation,
  useGetGroupContributionsTodayQuery,
} = contributionApi;
