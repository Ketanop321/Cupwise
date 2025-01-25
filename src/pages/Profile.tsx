import React, { useState, useEffect } from 'react';
import { User, Edit2, Save, Image } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';

interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string | null;
  total_cups_saved: number;
  points: number;
  created_at: string;
}

function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<UserProfile>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (fetchError) throw fetchError;
      setProfile(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({
      username: profile?.username || '',
      full_name: profile?.full_name || '',
    });
  };

  const handleSave = async () => {
    try {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          username: editedProfile.username,
          full_name: editedProfile.full_name,
        })
        .eq('id', user?.id);

      if (updateError) throw updateError;

      await fetchProfile();
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Profile not found
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-48 bg-green-600">
          <div className="absolute -bottom-16 left-8">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt={profile.full_name}
                className="w-32 h-32 rounded-full border-4 border-white"
              />
            ) : (
              <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 flex items-center justify-center">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            )}
          </div>
        </div>

        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editedProfile.full_name}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, full_name: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      value={editedProfile.username}
                      onChange={(e) =>
                        setEditedProfile({ ...editedProfile, username: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl font-bold">{profile.full_name}</h1>
                  <p className="text-gray-600">@{profile.username}</p>
                </>
              )}
            </div>
            <button
              onClick={isEditing ? handleSave : handleEdit}
              className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              {isEditing ? (
                <>
                  <Save className="h-5 w-5" />
                  <span>Save</span>
                </>
              ) : (
                <>
                  <Edit2 className="h-5 w-5" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Cups Saved</h3>
              <p className="text-2xl font-bold text-green-600">
                {profile.total_cups_saved}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Points Earned</h3>
              <p className="text-2xl font-bold text-green-600">{profile.points}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-semibold text-green-800">Member Since</h3>
              <p className="text-2xl font-bold text-green-600">
                {format(new Date(profile.created_at), 'MMM yyyy')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;