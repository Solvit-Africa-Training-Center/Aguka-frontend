import { apiSlice } from "./apiSlice";

export interface Group {
  id: string;
  name: string;
  description?: string;
  groupId?: string; // the join code
  location?: string[] | string;
  meetingLocation?: string;
  interestRate?: number;
  contact?: string;
  email?: string;
  minContribution?: number;
  createdAt?: string;
}

export const groupApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new group
    createGroup: builder.mutation<Group, FormData>({
      query: (data) => ({
        url: "/groups",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Groups"],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateGroupMutation } = groupApi;
