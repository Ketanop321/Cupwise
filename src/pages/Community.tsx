import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Share2, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import CreatePostModal from '../components/CreatePostModal';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
  profiles: {
    full_name: string;
    avatar_url: string | null;
  };
  likes: number;
  comments: number;
  user_has_liked?: boolean;
}

function Community() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const { data, error: postsError } = await supabase
        .from('posts')
        .select(`
          *,
          profiles (
            full_name,
            avatar_url
          )
        `)
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;

      if (!data) {
        setPosts([]);
        return;
      }

      // Fetch likes and comments count for each post
      const postsWithCounts = await Promise.all(
        data.map(async (post) => {
          const [likesData, commentsData, userLikeData] = await Promise.all([
            supabase
              .from('post_likes')
              .select('id', { count: 'exact' })
              .eq('post_id', post.id),
            supabase
              .from('comments')
              .select('id', { count: 'exact' })
              .eq('post_id', post.id),
            user
              ? supabase
                  .from('post_likes')
                  .select('id')
                  .eq('post_id', post.id)
                  .eq('user_id', user.id)
                  .single()
              : Promise.resolve({ data: null }),
          ]);

          return {
            ...post,
            likes: likesData.count || 0,
            comments: commentsData.count || 0,
            user_has_liked: !!userLikeData.data,
          };
        })
      );

      setPosts(postsWithCounts);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('Failed to load posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const handleLike = async (postId: string) => {
    if (!user) return;

    try {
      const { data: existingLike } = await supabase
        .from('post_likes')
        .select('id')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

      if (existingLike) {
        await supabase
          .from('post_likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', user.id);
      } else {
        await supabase
          .from('post_likes')
          .insert([{ post_id: postId, user_id: user.id }]);
      }

      await fetchPosts();
    } catch (err) {
      console.error('Error handling like:', err);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Community Forum</h1>
        {user && (
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Create Post
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="flex space-x-4 mb-8">
        <button className="bg-green-100 text-green-600 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors">
          Recent
        </button>
        <button className="bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          Popular
        </button>
        <button className="bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          Success Stories
        </button>
        <button className="bg-white text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          Questions
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No posts yet. Be the first to share!</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                {post.profiles.avatar_url ? (
                  <img
                    src={post.profiles.avatar_url}
                    alt={post.profiles.full_name}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                )}
                <div>
                  <h3 className="font-medium">{post.profiles.full_name}</h3>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
              
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
              
              <div className="flex items-center space-x-6 text-gray-500">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 transition-colors ${
                    post.user_has_liked ? 'text-green-600' : 'hover:text-green-600'
                  }`}
                  disabled={!user}
                >
                  <ThumbsUp className="h-5 w-5" />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-green-600 transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span>{post.comments}</span>
                </button>
                <button className="flex items-center space-x-2 hover:text-green-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onPostCreated={fetchPosts}
      />
    </div>
  );
}

export default Community;