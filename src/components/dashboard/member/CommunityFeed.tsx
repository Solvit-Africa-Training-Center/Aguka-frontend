import React, { useState, useEffect } from "react";

// Type definitions
interface User {
  id: string;
  name: string;
  avatar?: string;
}

interface Comment {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
}

interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  likes: number;
  comments: Comment[];
}

interface Group {
  id: string;
  name: string;
  members: User[];
  nextContributionDeadline: Date;
}

// Mock Data
const mockUsers: User[] = [
  {
    id: "1",
    name: "MDMUHOZA Diane",
    avatar: "https://example.com/avatar1.jpg",
  },
  { id: "2", name: "Rwema Gilbert" }, // no avatar, will show initials
];

const mockPosts: Post[] = [
  {
    id: "1",
    userId: "1",
    content:
      "Just received my quarterly payout. Thanks to all group members\n\nReminder: our next contribution deadline is December 29th.\n\nLet's keep up the great work everyone!",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    likes: 5,
    comments: [],
  },
  {
    id: "2",
    userId: "2",
    content:
      "New member joining our group next month! Welcome to\n\nThanks to our Agatha savings, I was able to pay for my child's fees.",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    likes: 3,
    comments: [],
  },
];

const mockGroup: Group = {
  id: "1",
  name: "Community Savings Group",
  members: mockUsers,
  nextContributionDeadline: new Date("2023-12-29"),
};

// API Simulation
const fetchPosts = async (): Promise<Post[]> =>
  new Promise((resolve) => setTimeout(() => resolve(mockPosts), 1000));

const createPost = async (content: string): Promise<Post> =>
  new Promise((resolve) =>
    setTimeout(() => {
      const newPost: Post = {
        id: Math.random().toString(36).substr(2, 9),
        userId: "1",
        content,
        timestamp: new Date(),
        likes: 0,
        comments: [],
      };
      resolve(newPost);
    }, 500)
  );

// Helper to get initials
const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

// Component
const CommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const postsData = await fetchPosts();
      setPosts(postsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;
    try {
      const newPost = await createPost(newPostContent);
      setPosts([newPost, ...posts]);
      setNewPostContent("");
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (date: Date) => {
    const diffHours = Math.floor(
      (Date.now() - date.getTime()) / (1000 * 60 * 60)
    );
    return diffHours <= 0
      ? "Just now"
      : `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  };

  if (loading)
    return (
      <div className="text-center text-secondary-300 p-5">Loading posts...</div>
    );

  return (
    <div className="font-poppins p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold text-secondary-300 mb-4">
        Updates and discussions from your groups
      </h1>

      {/* New Post */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Share an update with the group..."
          className="flex-1 p-3 rounded-xl border-2 border-secondary-300 focus:ring-2 focus:ring-secondary-600 focus:outline-none resize-none h-24"
        />
        <button
          onClick={handleCreatePost}
          disabled={!newPostContent.trim()}
          className="bg-gradient-to-r from-secondary-600 to-secondary-300 text-white font-semibold rounded-xl px-6 py-3 hover:opacity-90 transition disabled:opacity-50">
          Post
        </button>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {posts.map((post) => {
          const user = mockUsers.find((u) => u.id === post.userId);
          return (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-md p-5 border border-gray-100">
              {/* Header */}
              <div className="flex items-center gap-3">
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full border border-gray-200 object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-secondary-300 flex items-center justify-center text-white font-semibold border border-gray-200">
                    {getInitials(user?.name || "")}
                  </div>
                )}

                <div>
                  <div className="font-semibold text-gray-800">
                    {user?.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatDate(post.timestamp)}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="mt-4 text-gray-700 leading-relaxed">
                {post.content.split("\n").map((p, i) => (
                  <p key={i} className="mb-2">
                    {p}
                  </p>
                ))}
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100 text-gray-600">
                <button className="flex items-center gap-2 hover:text-secondary-600 transition">
                  👍 Like{" "}
                  <span className="text-sm text-gray-400">({post.likes})</span>
                </button>
                <button className="flex items-center gap-2 hover:text-secondary-500 transition">
                  💬 Comment
                </button>
                <button className="flex items-center gap-2 hover:text-secondary-400 transition">
                  🔗 Share
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CommunityFeed;
