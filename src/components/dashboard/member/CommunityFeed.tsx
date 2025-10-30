import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { Heart, MessageCircle } from "lucide-react";
import type { RootState } from "@services/store/store";
import {
  useGetFeedsQuery,
  useCreateFeedMutation,
  useCreateCommentMutation,
  useLikeFeedMutation,
} from "@services/api/feedApi";
import type { Feed, FeedCreate } from "types/Feed";

const CommunityFeed: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  const { data: feedsData, isLoading } = useGetFeedsQuery({
    page: 1,
    limit: 50,
  });

  const [createFeed] = useCreateFeedMutation();
  const [createComment] = useCreateCommentMutation();
  const [likeFeed] = useLikeFeedMutation();

  const [newPostContent, setNewPostContent] = useState("");
  const [visibleComments, setVisibleComments] = useState<
    Record<string, boolean>
  >({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [localFeeds, setLocalFeeds] = useState<Feed[]>([]);

  const feeds: Feed[] = Array.isArray(feedsData) ? feedsData : [];
  const combinedFeeds = [...localFeeds, ...feeds];
  const groupFeeds = combinedFeeds.filter(
    (feed) => feed.groupId === user?.groupId
  );

  const formatDate = (dateStr: string) =>
    formatDistanceToNow(new Date(dateStr), { addSuffix: true });

  const getInitials = (fullName: string) => {
    if (!fullName) return "?";
    const parts = fullName.trim().split(" ");
    return parts.length === 1
      ? parts[0][0].toUpperCase()
      : parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || !user) return;

    const feedData: FeedCreate = { message: newPostContent };

    try {
      const createdFeed = await createFeed(feedData).unwrap();

      setLocalFeeds((prev) => [
        {
          ...createdFeed,
          author: { id: user.id, name: user.name, email: user.email },
          comments: [],
          likes: [],
        },
        ...prev,
      ]);

      setNewPostContent("");
    } catch (error) {
      console.error("Failed to create feed:", error);
    }
  };

  const handleLike = async (feedId: string) => {
    try {
      await likeFeed(feedId).unwrap();
      setLikedPosts({ ...likedPosts, [feedId]: true });
    } catch (error) {
      console.error("Failed to like feed:", error);
    }
  };

  const handleAddComment = async (feedId: string) => {
    if (!replyContent.trim() || !user) return;

    try {
      const newComment = await createComment({
        feedId,
        data: { message: replyContent },
      }).unwrap();

      setLocalFeeds((prev) =>
        prev.map((feed) => {
          if (feed.id === feedId) {
            return {
              ...feed,
              comments: [
                ...feed.comments,
                {
                  ...newComment,
                  author: { id: user.id, name: user.name, email: user.email },
                },
              ],
            };
          }
          return feed;
        })
      );

      setReplyingTo(null);
      setReplyContent("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  if (isLoading) return <div>Loading feeds...</div>;

  const getCommentAuthorName = (comment: any) => {
    if (comment.author?.name) return comment.author.name;
    if (comment.authorId === user?.id) return user?.name ?? "Unknown";
    return "Unknown";
  };

  return (
    <div className="flex flex-col font-poppins p-3 sm:p-4 md:p-6 rounded-tl-xl rounded-tr-xl overflow-y-auto max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-6xl mx-auto w-full">
      {/* Create Post */}
      <div className="rounded-2xl p-3 sm:p-4 md:p-5 flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center mb-4 sm:mb-6 bg-primary-400/20 backdrop-blur-sm">
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder={`What's on your mind, ${user?.name || "member"}?`}
          className="w-full min-h-[80px] sm:min-h-[60px] text-white border border-secondary-400 rounded-lg p-2 sm:p-3 resize-none focus:ring-2 focus:ring-secondary-400 focus:outline-none text-sm sm:text-base bg-transparent"
          aria-label="Create new post"
        />
        <div className="flex justify-end">
          <button
            onClick={handleCreatePost}
            className="bg-gradient-to-r from-secondary-800 to-secondary-500 hover:from-secondary-600 hover:to-secondary-800 text-white px-4 py-2 sm:px-5 sm:py-3 text-base sm:text-lg md:text-xl rounded-lg sm:rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!newPostContent.trim()}
          >
            Post
          </button>
        </div>
      </div>

      {/* Feeds */}
      <div className="w-full mx-auto p-3 sm:p-4 md:p-5 space-y-4 sm:space-y-6 overflow-y-auto max-h-[60vh] sm:max-h-[65vh] md:max-h-[70vh] rounded-xl scrollbar-hide">
        {groupFeeds.map((feed) => (
          <div
            key={feed.id}
            className="rounded-xl sm:rounded-2xl shadow-md p-3 sm:p-4 md:p-5 text-white bg-primary-400/30 backdrop-blur-sm hover:bg-primary-400/40 transition-colors"
          >
            {/* Header */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-secondary-300 flex items-center justify-center text-white font-semibold text-sm sm:text-base shadow-md">
                {getInitials(feed.author?.name || "")}
              </div>
              <div>
                <div className="font-semibold text-white text-sm sm:text-base">
                  {feed.author?.name || "Unknown"}
                </div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {formatDate(feed.createdAt)}
                </div>
              </div>
            </div>

            {/* Content */}
            <p className="mt-3 sm:mt-4 text-sm sm:text-base break-words">
              {feed.message}
            </p>

            {/* Actions */}
            <div className="flex items-center gap-4 sm:gap-6 mt-3 sm:mt-4 text-gray-400">
              <button
                onClick={() => handleLike(feed.id)}
                className={`flex items-center gap-1 transition transform hover:scale-105 active:scale-95 ${
                  likedPosts[feed.id]
                    ? "text-yellow-400"
                    : "hover:text-secondary-400"
                }`}
                aria-label={`Like post (${feed.likes.length} likes)`}
              >
                <Heart className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="text-sm sm:text-base">
                  {feed.likes.length}
                </span>
              </button>
              <button
                onClick={() =>
                  setVisibleComments({
                    ...visibleComments,
                    [feed.id]: !visibleComments[feed.id],
                  })
                }
                className="flex items-center gap-1 hover:text-secondary-400 transition transform hover:scale-105 active:scale-95"
                aria-label="Reply to post"
              >
                <MessageCircle className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="text-sm sm:text-base">Reply</span>
              </button>
            </div>

            {/* Comments */}
            {visibleComments[feed.id] && (
              <div className="mt-4 space-y-3 pl-2 sm:pl-3">
                {feed.comments?.map((comment) => {
                  const authorName = getCommentAuthorName(comment);
                  return (
                    <div
                      key={comment.id}
                      className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm"
                    >
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold text-xs sm:text-sm shadow-sm">
                        {getInitials(authorName)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="bg-gray-100 text-black rounded-lg p-2 sm:p-3 break-words">
                          <span className="font-medium">{authorName}</span>
                          <span className="mx-1.5">·</span>
                          {comment.message}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {formatDate(comment.createdAt)}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Reply Box */}
                {replyingTo !== feed.id ? (
                  <button
                    onClick={() => setReplyingTo(feed.id)}
                    className="text-xs sm:text-sm text-secondary-400 hover:text-secondary-500 transition-colors hover:underline transform hover:translate-x-1"
                    aria-label="Start writing a reply"
                  >
                    Write a reply...
                  </button>
                ) : (
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 mt-2">
                    <input
                      type="text"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 border border-secondary-400 rounded-lg px-3 py-1.5 sm:py-2 focus:ring-2 focus:ring-secondary-400 focus:outline-none text-sm bg-transparent text-white"
                      aria-label="Reply input"
                    />
                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        onClick={() => handleAddComment(feed.id)}
                        disabled={!replyContent.trim()}
                        className="bg-secondary-400 hover:bg-secondary-500 text-white px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm transition-colors flex-1 sm:flex-none disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95"
                      >
                        Reply
                      </button>
                      <button
                        onClick={() => {
                          setReplyingTo(null);
                          setReplyContent("");
                        }}
                        className="text-xs sm:text-sm text-gray-400 hover:text-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;
