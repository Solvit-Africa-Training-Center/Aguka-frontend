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
  transformResponse: (response: { data: Contribution[] }) => response.data, // <-- extract array
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
  query: (groupId) => `/contributions/${groupId}/all`, 
  providesTags: ["Contributions"],
}),


    // ✅ New approve contribution endpoint (POST)
    approveContribution: builder.mutation<Contribution, string>({
      query: (contributionId) => ({
        url: `/contributions/${contributionId}/approve`,
        method: "POST",
      }),
      invalidatesTags: ["Contributions"],
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
  useCreateContributionMeMutation,
  useGetGroupContributionsQuery,
  useApproveContributionMutation, 
} = contributionApi;
