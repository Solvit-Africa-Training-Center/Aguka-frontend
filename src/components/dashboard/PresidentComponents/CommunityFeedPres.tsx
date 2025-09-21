import React, { useState } from "react";
import { formatDistanceToNow } from "date-fns";
import { useSelector } from "react-redux";
import { Heart, MessageCircle } from "lucide-react";
import type { RootState } from "@services/store/store";

interface Post {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: Date;
}

const CommunityFeed: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const name = user?.name;
  const email = user?.email;

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
    {
    id: "3",
    userId: "diana@example.com",
    userName: "Diana",
    content: "Loving the community vibes here!",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    likes: 2,
    comments: [],
  },
  {
    id: "4",
    userId: "eric@example.com",
    userName: "Eric",
    content: "Just finished a cool React project, anyone wants to see?",
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    likes: 4,
    comments: [],
  },
  {
    id: "5",
    userId: "fiona@example.com",
    userName: "Fiona",
    content: "Does anyone have tips for Redux beginners?",
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    likes: 1,
    comments: [],
  },
  {
    id: "6",
    userId: "george@example.com",
    userName: "George",
    content: "Happy to be part of this community! 😊",
    timestamp: new Date(Date.now() - 1000 * 60 * 360),
    likes: 3,
    comments: [],
  },
  {
    id: "7",
    userId: "hannah@example.com",
    userName: "Hannah",
    content: "Anyone wants to collaborate on a small React project?",
    timestamp: new Date(Date.now() - 1000 * 60 * 420),
    likes: 2,
    comments: [],
  },
  {
    id: "8",
    userId: "ian@example.com",
    userName: "Ian",
    content: "Good morning everyone! ☀️",
    timestamp: new Date(Date.now() - 1000 * 60 * 480),
    likes: 0,
    comments: [],
  },
  {
    id: "9",
    userId: "julia@example.com",
    userName: "Julia",
    content: "I just learned about Tailwind CSS, loving it!",
    timestamp: new Date(Date.now() - 1000 * 60 * 540),
    likes: 5,
    comments: [],
  },
  {
    id: "10",
    userId: "kyle@example.com",
    userName: "Kyle",
    content: "Does anyone have a good React learning path?",
    timestamp: new Date(Date.now() - 1000 * 60 * 600),
    likes: 1,
    comments: [],
  },
  ]);

  const [newPostContent, setNewPostContent] = useState("");
  const [visibleComments, setVisibleComments] = useState<Record<string, boolean>>({});
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});

  const formatDate = (date: Date) =>
    formatDistanceToNow(date, { addSuffix: true });

  const getInitials = (fullName: string) => {
    if (!fullName) return "?";
    const parts = fullName.trim().split(" ");
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim()) return;

    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      userId: email || "unknown",
      userName: name || email || "Anonymous",
      content: newPostContent,
      timestamp: new Date(),
      likes: 0,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostContent("");
  };

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, likes: post.likes + 1 } : post
      )
    );
    setLikedPosts({ ...likedPosts, [postId]: true });
  };

  const handleAddComment = (postId: string) => {
    if (!replyContent.trim()) return;

    const newComment: Comment = {
      id: Math.random().toString(36).substr(2, 9),
      userId: email || "unknown",
      userName: name || email || "Anonymous",
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
    <div className="bg-[#003B42] h-[550px] flex flex-col font-poppins border-b-4 border-l-4 border-[#DCE4E5] p-6 rounded-tl-xl rounded-tr-xl overflow-y-auto">

      {/* Create Post */}
        <h3 className="font-bold text-2xl mb-4 text-[#F9A825] text-center">Community feeds</h3>
      <div className="rounded-2xl p-5 flex gap-3 justify-center mb-6">
        
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder={`What's on your mind, ${name || "member"}?`}
          className="w-full h-15 text-white border border-secondary-400 rounded-lg p-3 resize-none focus:ring-2 focus:ring-secondary-400 focus:outline-none"/>
        
        <div className="flex justify-end">
          <button
            onClick={handleCreatePost}
            className="bg-gradient-to-r from-secondary-800 to-secondary-500 hover:from-secondary-600 hover:to-secondary-800 text-white p-3 text-2xl h-15 rounded-xl transition-all"
          >
            Post
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="max-w-3xl mx-auto space-y-6 overflow-y-auto max-h-[450px] p-10 rounded-xl">
        {posts.map((post) => (
          <div key={post.id} className="rounded-2xl shadow-md p-5 text-white">
            {/* Header */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-secondary-300 flex items-center justify-center text-white font-semibold">
                {getInitials(post.userName)}
              </div>
              <div>
                <div className="font-semibold text-white">{post.userName}</div>
                <div className="text-sm text-gray-400">{formatDate(post.timestamp)}</div>
              </div>
            </div>

            {/* Content */}
            <p className="mt-4">{post.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-6 mt-4 text-gray-400">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-1 transition ${
                  likedPosts[post.id] ? "text-yellow-400" : "hover:text-secondary-400"
                }`}
              >
                <Heart size={18} /> {post.likes}
              </button>
              <button
                onClick={() =>
                  setVisibleComments({
                    ...visibleComments,
                    [post.id]: !visibleComments[post.id],
                  })
                }
                className="flex items-center gap-1 hover:text-secondary-400 transition"
              >
                <MessageCircle size={18} /> {post.comments.length} Reply
              </button>
            </div>

            {/* Comments */}
            {visibleComments[post.id] && (
              <div className="mt-4 space-y-3">
                {post.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-white font-semibold">
                      {getInitials(comment.userName)}
                    </div>
                    <div>
                      <div className="bg-gray-100 text-black rounded-lg p-2">
                        <span className="font-medium">{comment.userName}</span>: {comment.content}
                      </div>
                      <div className="text-xs text-gray-500">{formatDate(comment.timestamp)}</div>
                    </div>
                  </div>
                ))}

                {/* Reply Box */}
                {replyingTo !== post.id ? (
                  <button
                    onClick={() => setReplyingTo(post.id)}
                    className="text-sm text-secondary-400 hover:underline"
                  >
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
                      className="bg-secondary-400 hover:bg-secondary-500 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => {
                        setReplyingTo(null);
                        setReplyContent("");
                      }}
                      className="text-xs text-gray-400 hover:underline"
                    >
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
