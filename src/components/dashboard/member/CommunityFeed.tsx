import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useUser } from "hooks/useUser";
import { Heart, MessageCircle } from "lucide-react";

interface Post {
  id: string;
  userId: string;
  userName: string; // ✅ display name
  content: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  userId: string;
  userName: string; // ✅ display name
  content: string;
  timestamp: Date;
}

const CommunityFeed: React.FC = () => {
  const { name, email } = useUser();

  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      userId: "alice@example.com",
      userName: "Alice",
      content: "Excited to join this community! 🚀",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      likes: 3,
      comments: [
        {
          id: "c1",
          userId: "bob@example.com",
          userName: "Bob",
          content: "Welcome Alice! 🎉",
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
        },
      ],
    },
    {
      id: "2",
      userId: "charlie@example.com",
      userName: "Charlie",
      content: "Anyone working on React projects? Let's connect!",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      likes: 5,
      comments: [],
    },
  ]);

  const [newPostContent, setNewPostContent] = useState("");
  const [visibleComments, setVisibleComments] = useState<
    Record<string, boolean>
  >({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const formatDate = (date: Date) =>
    formatDistanceToNow(date, { addSuffix: true });

  const getInitials = (fullName: string) => {
    if (!fullName) return "?";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  };

  // ✅ Create Post
  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      userId: email,
      userName: name || email,
      content: newPostContent,
      timestamp: new Date(),
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  // ✅ Like Post
  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  // ✅ Add Comment
  const handleAddComment = (postId: string) => {
    if (!replyContent.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: email,
      userName: name || email,
      content: replyContent,
      timestamp: new Date(),
    };

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );

    setReplyingTo(null);
    setReplyContent("");
  };

  return (
    <div className="min-h-screen bg-[#00353B] p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Create Post */}
        <div className="rounded-2xl p-5 flex gap-3 justify-center">
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder={`What's on your mind, ${name || "member"}?`}
            className="w-full h-20 border border-secondary-400 rounded-lg p-3 resize-none focus:ring-2 focus:ring-secondary-400 focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              onClick={handleCreatePost}
<<<<<<< HEAD

              className="bg-gradient-to-r from-secondary-800 to-secondary-500 hover:from-secondary-600 hover:to-secondary-800 text-white p-6 text-2xl h-20 rounded-xl transition-all">

=======
              className="bg-gradient-to-r from-secondary-800 to-secondary-500 hover:from-secondary-600 hover:to-secondary-800 text-white p-6 text-2xl h-20 rounded-xl transition-all">
>>>>>>> 4c8f63c (commited dashboard)
              Post
            </button>
          </div>
        </div>

        {/* Posts Feed */}
        {posts.map((post) => (
          <div key={post.id} className="rounded-2xl shadow-md p-5 text-white">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary-300 flex items-center justify-center text-white font-semibold">
                {getInitials(post.userName)}
              </div>
              <div>
                <div className="font-semibold text-white">{post.userName}</div>
                <div className="text-sm text-gray-400">
                  {formatDate(post.timestamp)}
                </div>
              </div>
            </div>

            {/* Content */}
            <p className="mt-4">{post.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-6 mt-4 text-gray-400">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1 hover:text-secondary-400 transition">
                <Heart size={18} /> {post.likes}
              </button>
              <button
                onClick={() =>
                  setVisibleComments({
                    ...visibleComments,
                    [post.id]: !visibleComments[post.id],
                  })
                }
                className="flex items-center gap-1 hover:text-secondary-400 transition">
                <MessageCircle size={18} /> {post.comments.length} Reply
              </button>
            </div>

            {/* Comments */}
            {visibleComments[post.id] && (
              <div className="mt-4 space-y-3">
                {post.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="flex items-start gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                      {getInitials(comment.userName)}
                    </div>
                    <div>
                      <div className="bg-gray-100 text-black rounded-lg p-2">
                        <span className="font-medium">{comment.userName}</span>:{" "}
                        {comment.content}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDate(comment.timestamp)}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Reply Box */}
                {replyingTo !== post.id ? (
                  <button
                    onClick={() => setReplyingTo(post.id)}
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
                      onClick={() => handleAddComment(post.id)}
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
