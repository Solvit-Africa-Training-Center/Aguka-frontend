// services/api/announcementApi.ts

import { apiSlice } from "./apiSlice";
import type {
  Announcement,
  AnnouncementCreate,
  AnnouncementUpdate,
} from "types/Announcement";

export const announcementApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Create
    createAnnouncement: builder.mutation<Announcement, AnnouncementCreate>({
      query: (data) => ({
        url: "/announcements",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Announcements"],
    }),

    // Get paginated list
    getAnnouncements: builder.query<Announcement[], { page: number; limit: number }>({
      query: ({ page, limit }) => `/announcements?page=${page}&limit=${limit}`,
      transformResponse: (response: { data: Announcement[] }) => response.data,
      providesTags: ["Announcements"],
    }),

    // Get by ID
    getAnnouncementById: builder.query<Announcement, string>({
  query: (id) => `/announcements/${id}`,
  providesTags: (_, __, id) => [{ type: "Announcements", id }],
}),

    // Update (PATCH)
    updateAnnouncement: builder.mutation<Announcement, { id: string; data: AnnouncementUpdate }>({
      query: ({ id, data }) => ({
        url: `/announcements/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Announcements"],
    }),

    // Delete
    deleteAnnouncement: builder.mutation<void, string>({
      query: (id) => ({
        url: `/announcements/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Announcements"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useCreateAnnouncementMutation,
  useGetAnnouncementsQuery,
  useGetAnnouncementByIdQuery,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation,
} = announcementApi;
