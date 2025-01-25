import React from 'react';
import { Trophy } from 'lucide-react';

const leaders = [
  { name: 'Sarah Johnson', points: 1250, rank: 1 },
  { name: 'Mike Chen', points: 980, rank: 2 },
  { name: 'Emma Davis', points: 845, rank: 3 },
  { name: 'Alex Kim', points: 720, rank: 4 },
  { name: 'Lisa Wong', points: 690, rank: 5 },
];

export default function Leaderboard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-800">Top Reducers</h2>
      </div>
      <div className="space-y-4">
        {leaders.map((leader) => (
          <div
            key={leader.name}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-gray-600">#{leader.rank}</span>
              <span className="font-medium">{leader.name}</span>
            </div>
            <span className="font-semibold text-green-600">{leader.points} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}