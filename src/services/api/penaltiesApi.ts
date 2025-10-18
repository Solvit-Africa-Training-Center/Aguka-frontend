import { apiSlice } from "./apiSlice";
import type { Penalty, PenaltyCreate, PenaltyPayment } from "types/Penalty";

export const penaltyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create penalty
    createPenalty: builder.mutation<Penalty, PenaltyCreate>({
      query: (data) => ({
        url: "/penalties",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Penalties"],
    }),

    // Get all penalties
    getAllPenalties: builder.query<Penalty[], void>({
      query: () => "/penalties",
      transformResponse: (response: { data: Penalty[] }) => response.data,
      providesTags: ["Penalties"],
    }),

    // Get penalties by user ID
    getPenaltiesByUser: builder.query<Penalty[], string>({
      query: (userId) => `/penalties/user/${userId}`,
      transformResponse: (response: { data: Penalty[] }) => response.data,
      providesTags: (_result, _error, userId) => [
        { type: "Penalties", id: userId },
      ],
    }),

    // Pay a penalty
    payPenalty: builder.mutation<
      Penalty,
      { penaltyId: string; data: PenaltyPayment }
    >({
      query: ({ penaltyId, data }) => ({
        url: `/penalties/${penaltyId}/pay`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Penalties"],
    }),

    // Delete penalty
    deletePenalty: builder.mutation<void, string>({
      query: (penaltyId) => ({
        url: `/penalties/${penaltyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Penalties"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreatePenaltyMutation,
  useGetAllPenaltiesQuery,
  useGetPenaltiesByUserQuery,
  usePayPenaltyMutation,
  useDeletePenaltyMutation,
} = penaltyApi;
