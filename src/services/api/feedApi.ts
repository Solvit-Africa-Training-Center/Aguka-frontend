import { apiSlice } from "./apiSlice";
import type {
  Feed,
  FeedCreate,
  FeedUpdate,
  Comment,
  CommentUpdate,
} from "types/Feed";

export const feedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get paginated feeds
    getFeeds: builder.query<Feed[], { page: number; limit: number }>({
      query: ({ page, limit }) => `feeds?page=${page}&limit=${limit}`,
      transformResponse: (response: { data: Feed[] }) => response.data,
      providesTags: ["Feeds"],
    }),
    //create feed
    createFeed: builder.mutation<Feed, FeedCreate>({
      query: (data) => ({
        url: "/feeds",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Feeds"],
    }),
    // Get comments for a specific feed
    getFeedComments: builder.query<
      Comment[],
      { feedId: string; page: number; limit: number }
    >({
      query: ({ feedId, page, limit }) =>
        `feeds/${feedId}/comments?page=${page}&limit=${limit}`,
      transformResponse: (response: { data: Comment[] }) => response.data,
      providesTags: (_, __, { feedId }) => [{ type: "Comments", id: feedId }],
    }),

    // Like a feed
    likeFeed: builder.mutation<void, string>({
      query: (feedId) => ({
        url: `feeds/${feedId}/like`,
        method: "POST",
      }),
      invalidatesTags: ["Feeds"],
    }),

    // Update feed
    updateFeed: builder.mutation<Feed, { feedId: string; data: FeedUpdate }>({
      query: ({ feedId, data }) => ({
        url: `feeds/${feedId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Feeds"],
    }),

    // Delete feed
    deleteFeed: builder.mutation<void, string>({
      query: (feedId) => ({
        url: `feeds/${feedId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feeds"],
    }),

    // Update a comment
    updateComment: builder.mutation<
      Comment,
      { commentId: string; data: CommentUpdate }
    >({
      query: ({ commentId, data }) => ({
        url: `comments/${commentId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Comments"],
    }),

    // Delete a comment
    deleteComment: builder.mutation<void, string>({
      query: (commentId) => ({
        url: `comments/${commentId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetFeedsQuery,
  useGetFeedCommentsQuery,
  useLikeFeedMutation,
  useUpdateFeedMutation,
  useDeleteFeedMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = feedApi;
