import React from 'react';
import { BarChart3, Leaf, Users, Trophy, Coffee } from 'lucide-react';
import StatsCard from './StatsCard';
import ImpactTracker from './ImpactTracker';
import Leaderboard from './Leaderboard';

export default function Dashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Sustainable Cup Initiative</h1>
        <p className="text-gray-600">Join the movement to reduce paper cup waste</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard
          title="Cups Saved"
          value="1,234"
          icon={<Coffee className="text-green-500" />}
          change="+12%"
        />
        <StatsCard
          title="CO₂ Reduced"
          value="56 kg"
          icon={<Leaf className="text-green-500" />}
          change="+8%"
        />
        <StatsCard
          title="Active Users"
          value="789"
          icon={<Users className="text-green-500" />}
          change="+15%"
        />
        <StatsCard
          title="Challenges"
          value="5"
          icon={<Trophy className="text-green-500" />}
          change="Active"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ImpactTracker />
        </div>
        <div>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}