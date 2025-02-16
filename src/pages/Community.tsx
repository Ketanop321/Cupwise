import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Share2, Image as ImageIcon, Loader } from 'lucide-react';
import { getCurrentUser, createPost, getPosts, uploadImage } from '../lib/supabase';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const postsData = await getPosts();
      setPosts(postsData);
    } catch (err) {
      setError('Failed to load posts');
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('Please sign in to post');

      let imageUrl = null;
      if (image) {
        imageUrl = await uploadImage(image, 'post-images');
      }

      await createPost(user.id, title, content, imageUrl);
      
      // Reset form and reload posts
      setTitle('');
      setContent('');
      setImage(null);
      await loadPosts();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Create Post */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Share Your Journey</h2>
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-md mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="What's on your mind?"
            rows={4}
            required
          />
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <ImageIcon className="h-5 w-5 text-gray-600" />
              <span>Add Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {image && (
              <span className="text-sm text-green-600">
                Image selected: {image.name}
              </span>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Posting...</span>
                </>
              ) : (
                <span>Post</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
            {/* Author Info */}
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={post.profiles.avatar_url || 'https://via.placeholder.com/40'}
                alt={post.profiles.full_name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-gray-900">
                  {post.profiles.full_name}
                </h3>
                <p className="text-gray-500 text-sm">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <h4 className="text-xl font-semibold mb-2">{post.title}</h4>
            <p className="text-gray-700 mb-4">{post.content}</p>

            {/* Post Image */}
            {post.image_url && (
              <div className="mb-4">
                <img
                  src={post.image_url}
                  alt="Post"
                  className="rounded-lg max-h-96 w-full object-cover"
                />
              </div>
            )}

            {/* Engagement */}
            <div className="flex items-center space-x-6 text-gray-500">
              <button className="flex items-center space-x-2 hover:text-green-500">
                <ThumbsUp className="h-5 w-5" />
                <span>Like</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-green-500">
                <MessageSquare className="h-5 w-5" />
                <span>Comment</span>
              </button>
              <button className="flex items-center space-x-2 hover:text-green-500">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;