import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, Trophy, TreePine, Target, Plus, Minus } from 'lucide-react';
import { getCurrentUser, getUserProfile, updateCupCount } from '../lib/supabase';

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const user = await getCurrentUser();
      if (user) {
        const userProfile = await getUserProfile(user.id);
        setProfile(userProfile);
      }
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCupCount = async (increment: number) => {
    try {
      const user = await getCurrentUser();
      if (!user) throw new Error('Not authenticated');

      await updateCupCount(user.id, increment);
      await loadProfile(); // Reload profile to get updated counts
    } catch (err) {
      setError('Failed to update cup count');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!profile) return <div className="text-center py-8">Please sign in to view your dashboard</div>;

  // Calculate environmental impact (example: 30g CO2 per cup)
  const environmentalImpact = (profile.cups_saved * 0.03).toFixed(2);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Cup Counter Control */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Track Your Cups</h2>
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={() => handleCupCount(-1)}
            className="bg-red-100 text-red-600 p-3 rounded-full hover:bg-red-200 transition-colors"
          >
            <Minus className="h-6 w-6" />
          </button>
          <div className="text-4xl font-bold text-green-600">{profile.cups_saved}</div>
          <button
            onClick={() => handleCupCount(1)}
            className="bg-green-100 text-green-600 p-3 rounded-full hover:bg-green-200 transition-colors"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>
        <p className="text-center text-gray-600 mt-4">
          Click + when you use a reusable cup instead of a disposable one
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Leaf className="h-8 w-8 text-green-500" />}
          title="Total Cups Saved"
          value={profile.cups_saved.toString()}
        />
        <StatCard
          icon={<Trophy className="h-8 w-8 text-green-500" />}
          title="Current Streak"
          value="12 days"
        />
        <StatCard
          icon={<TreePine className="h-8 w-8 text-green-500" />}
          title="CO₂ Saved"
          value={`${environmentalImpact} kg`}
        />
        <StatCard
          icon={<Target className="h-8 w-8 text-green-500" />}
          title="Points Earned"
          value={profile.points.toString()}
        />
      </div>

      {/* Progress Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={[
              { date: '2024-01', cups: Math.floor(profile.cups_saved * 0.2) },
              { date: '2024-02', cups: Math.floor(profile.cups_saved * 0.5) },
              { date: '2024-03', cups: Math.floor(profile.cups_saved * 0.8) },
              { date: '2024-04', cups: profile.cups_saved },
            ]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="cups"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ fill: '#22c55e' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center space-x-4">
      {icon}
      <div>
        <h3 className="text-gray-600 text-sm">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  </div>
);

export default Dashboard;