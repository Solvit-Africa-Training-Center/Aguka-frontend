
import { apiSlice } from "./apiSlice";
import type { UserDividend, Dividend, DividendResponse } from "types/Dividend";

export const dividendApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserDividends: builder.query<UserDividend, void>({
      query: () => "/dividends/me",
      transformResponse: (response: { data: UserDividend }) => response.data,
    }),

    getGroupDividends: builder.query<Dividend[], void>({
      query: () => "/dividends/group",
      transformResponse: (response: DividendResponse) => response.data,
      providesTags: ["Dividends"],
    }),
  }),
  overrideExisting: true,
});

export const { useGetUserDividendsQuery, useGetGroupDividendsQuery } =
  dividendApi;
