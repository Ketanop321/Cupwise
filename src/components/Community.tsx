import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Share2, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

interface Post {
  id: string;
  content: string;
  image_url: string | null;
  likes_count: number;
  created_at: string;
  profiles: {
    username: string;
    avatar_url: string | null;
  };
  user_liked?: boolean;
}

export default function Community() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Check if user has liked each post
      if (data) {
        const postsWithLikes = await Promise.all(
          data.map(async (post) => {
            const { data: likeData } = await supabase
              .from('likes')
              .select('id')
              .eq('post_id', post.id)
              .eq('user_id', user?.id)
              .single();

            return {
              ...post,
              user_liked: !!likeData,
            };
          })
        );

        setPosts(postsWithLikes);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('Failed to load posts. Please try again later.');
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    setLoading(true);
    setError(null);

    try {
      // First, ensure the user has a profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user?.id)
        .single();

      if (profileError || !profile) {
        throw new Error('Please complete your profile before posting');
      }

      const { error: postError } = await supabase.from('posts').insert([
        {
          content: newPost.trim(),
          image_url: imageUrl || null,
          user_id: user?.id,
        },
      ]);

      if (postError) throw postError;

      setNewPost('');
      setImageUrl('');
      await fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
      setError(error instanceof Error ? error.message : 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string, currentLikes: number, userLiked: boolean) => {
    try {
      if (userLiked) {
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user?.id);

        await supabase
          .from('posts')
          .update({ likes_count: currentLikes - 1 })
          .eq('id', postId);
      } else {
        await supabase.from('likes').insert([
          {
            post_id: postId,
            user_id: user?.id,
          },
        ]);

        await supabase
          .from('posts')
          .update({ likes_count: currentLikes + 1 })
          .eq('id', postId);
      }

      await fetchPosts();
    } catch (error) {
      console.error('Error handling like:', error);
      setError('Failed to update like. Please try again.');
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId);

      if (error) throw error;

      await fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Failed to delete post. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">Share Your Sustainability Journey</h2>
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            {error}
          </div>
        )}
        <form onSubmit={handleCreatePost}>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Share your thoughts, tips, or achievements..."
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
            rows={3}
          />
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Add an image URL (optional)"
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={loading || !newPost.trim()}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Posting...' : 'Post'}
          </button>
        </form>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  {post.profiles.avatar_url ? (
                    <img
                      src={post.profiles.avatar_url}
                      alt={post.profiles.username}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-green-600 font-bold">
                      {post.profiles.username.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{post.profiles.username}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {post.profiles.username === user?.email && (
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
            <p className="mb-4">{post.content}</p>
            {post.image_url && (
              <img
                src={post.image_url}
                alt="Post"
                className="rounded-lg mb-4 max-h-96 w-full object-cover"
              />
            )}
            <div className="flex items-center gap-6 text-gray-500">
              <button
                onClick={() => handleLike(post.id, post.likes_count, !!post.user_liked)}
                className={`flex items-center gap-2 ${
                  post.user_liked ? 'text-red-500' : 'hover:text-red-500'
                }`}
              >
                <Heart className="h-5 w-5" fill={post.user_liked ? 'currentColor' : 'none'} />
                <span>{post.likes_count}</span>
              </button>
              <button className="flex items-center gap-2 hover:text-green-500">
                <MessageSquare className="h-5 w-5" />
                <span>Comment</span>
              </button>
              <button className="flex items-center gap-2 hover:text-green-500">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}