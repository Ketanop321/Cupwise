import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Coffee, Leaf, Award, TrendingUp, Plus, Minus } from 'lucide-react';
import { supabase } from '../lib/supabase';

function Dashboard() {
  const [cupsSaved, setCupsSaved] = useState(0);
  const [dailyCount, setDailyCount] = useState(0);

  const mockData = [
    { name: 'Mon', cups: 3 },
    { name: 'Tue', cups: 4 },
    { name: 'Wed', cups: 2 },
    { name: 'Thu', cups: 5 },
    { name: 'Fri', cups: 3 },
    { name: 'Sat', cups: 2 },
    { name: 'Sun', cups: 1 },
  ];

  const stats = [
    { icon: Coffee, label: 'Cups Saved', value: cupsSaved },
    { icon: Leaf, label: 'Environmental Impact', value: `${(cupsSaved * 0.01).toFixed(2)}kg CO₂` },
    { icon: Award, label: 'Points Earned', value: cupsSaved * 10 },
    { icon: TrendingUp, label: 'Weekly Streak', value: '5 days' },
  ];

  const handleAddCup = async () => {
    setDailyCount(prev => prev + 1);
    setCupsSaved(prev => prev + 1);
    // Here you would also update the database
  };

  const handleRemoveCup = () => {
    if (dailyCount > 0) {
      setDailyCount(prev => prev - 1);
      setCupsSaved(prev => prev - 1);
      // Here you would also update the database
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Impact Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform">
            <div className="flex items-center space-x-4">
              <stat.icon className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Daily Cup Counter */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-bold mb-4">Today's Cup Count</h2>
        <div className="flex items-center justify-center space-x-6">
          <button
            onClick={handleRemoveCup}
            className="bg-red-100 p-3 rounded-full hover:bg-red-200 transition-colors"
          >
            <Minus className="h-6 w-6 text-red-600" />
          </button>
          <span className="text-4xl font-bold w-16 text-center">{dailyCount}</span>
          <button
            onClick={handleAddCup}
            className="bg-green-100 p-3 rounded-full hover:bg-green-200 transition-colors"
          >
            <Plus className="h-6 w-6 text-green-600" />
          </button>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Weekly Progress</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cups" fill="#059669" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;