import React, { useState, useEffect } from 'react';
import { Settings, Edit2, Award, Share2 } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';
import { getUserProfile, uploadImage, supabase } from '../lib/supabase';

const Profile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    username: '',
    avatar_url: '',
  });

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    try {
      const profileData = await getUserProfile(user.id);
      setProfile(profileData);
      setFormData({
        full_name: profileData.full_name || '',
        username: profileData.username || '',
        avatar_url: profileData.avatar_url || '',
      });
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file, 'avatars');
      setFormData(prev => ({ ...prev, avatar_url: imageUrl }));
    } catch (err) {
      setError('Failed to upload image');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('id', user.id);

      if (error) throw error;
      await loadProfile();
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!profile) return <div className="text-center py-8">Please sign in to view your profile</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profile.avatar_url || 'https://via.placeholder.com/96'}
                alt={profile.full_name}
                className="w-24 h-24 rounded-full object-cover"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-green-500 text-white p-2 rounded-full cursor-pointer hover:bg-green-600">
                  <Edit2 className="h-4 w-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <div>
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Full Name"
                  />
                  <input
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="Username"
                  />
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900">{profile.full_name}</h1>
                  <p className="text-gray-500">@{profile.username}</p>
                  <div className="mt-2 inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full">
                    <Award className="h-4 w-4 mr-2" />
                    Level {Math.floor(profile.points / 100) + 1}
                  </div>
                </>
              )}
            </div>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <Settings className="h-6 w-6 text-gray-500" />
            </button>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard title="Cups Saved" value={profile.cups_saved} />
          <StatCard title="Points Earned" value={profile.points} />
          <StatCard title="Challenges Won" value={profile.challenges_won || 0} />
          <StatCard title="Days Active" value={Math.floor((Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24))} />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="text-center p-4 bg-gray-50 rounded-lg">
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-sm text-gray-500">{title}</p>
  </div>
);

export default Profile;