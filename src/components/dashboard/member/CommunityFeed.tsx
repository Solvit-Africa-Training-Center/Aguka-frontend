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
    <div className=" flex flex-col font-poppins    p-6 rounded-tl-xl rounded-tr-xl overflow-y-auto">
      {/* Create Post */}
      <div className="rounded-2xl p-5 flex gap-3 justify-center mb-6">
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder={`What's on your mind, ${user?.name || "member"}?`}
          className="w-full h-15 text-white border border-secondary-400 rounded-lg p-3 resize-none focus:ring-2 focus:ring-secondary-400 focus:outline-none"
        />
        <div className="flex justify-end">
          <button
            onClick={handleCreatePost}
            className="bg-gradient-to-r from-secondary-800 to-secondary-500 hover:from-secondary-600 hover:to-secondary-800 text-white p-3 text-2xl h-15 rounded-xl transition-all">
            Post
          </button>
        </div>
      </div>

      {/* Feeds */}
      <div className="max-w-5xl w-full mx-auto p-6 sm:p-8 md:p-10 space-y-6 overflow-y-auto max-h-[450px] rounded-xl scrollbar-hide bg-transparent">
        {groupFeeds.map((feed) => (
          <div
            key={feed.id}
            className="rounded-2xl shadow-md p-5 text-white bg-transparent">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary-300 flex items-center justify-center text-white font-semibold">
                {getInitials(feed.author?.name || "")}
              </div>
              <div>
                <div className="font-semibold text-white">
                  {feed.author?.name || "Unknown"}
                </div>
                <div className="text-sm text-gray-400">
                  {formatDate(feed.createdAt)}
                </div>
              </div>
            </div>

            {/* Content */}
            <p className="mt-4">{feed.message}</p>

            {/* Actions */}
            <div className="flex items-center gap-6 mt-4 text-gray-400">
              <button
                onClick={() => handleLike(feed.id)}
                className={`flex items-center gap-1 transition ${
                  likedPosts[feed.id]
                    ? "text-yellow-400"
                    : "hover:text-secondary-400"
                }`}>
                <Heart size={18} /> {feed.likes.length}
              </button>
              <button
                onClick={() =>
                  setVisibleComments({
                    ...visibleComments,
                    [feed.id]: !visibleComments[feed.id],
                  })
                }
                className="flex items-center gap-1 hover:text-secondary-400 transition">
                <MessageCircle size={18} /> Reply
              </button>
            </div>

            {/* Comments */}
            {visibleComments[feed.id] && (
              <div className="mt-4 space-y-3">
                {feed.comments?.map((comment) => {
                  const authorName = getCommentAuthorName(comment);
                  return (
                    <div
                      key={comment.id}
                      className="flex items-start gap-3 text-sm">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                        {getInitials(authorName)}
                      </div>
                      <div>
                        <div className="bg-gray-100 text-black rounded-lg p-2">
                          <span className="font-medium">{authorName}</span>:{" "}
                          {comment.message}
                        </div>
                        <div className="text-xs text-gray-500">
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
                    className="text-sm text-secondary-400 hover:underline">
                    Write a reply...
                  </button>
                ) : (
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="text"
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 border border-secondary-400 rounded-lg px-3 py-1 focus:ring-2 focus:ring-secondary-400 focus:outline-none"
                    />
                    <button
                      onClick={() => handleAddComment(feed.id)}
                      className="bg-secondary-400 hover:bg-secondary-500 text-white px-3 py-1 rounded-lg text-sm">
                      Reply
                    </button>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent("");
                      }}
                      className="text-xs text-gray-400 hover:underline">
                      Cancel
                    </button>
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
