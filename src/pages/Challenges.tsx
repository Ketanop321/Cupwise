import React from 'react';
import { Trophy, Clock, Users, Star, ChevronRight } from 'lucide-react';

function Challenges() {
  const challenges = [
    {
      id: 1,
      title: "30-Day Zero Waste Challenge",
      description: "Use only reusable cups for 30 days straight",
      participants: 1234,
      points: 500,
      daysLeft: 15,
      difficulty: "Medium",
    },
    {
      id: 2,
      title: "Community Impact Leader",
      description: "Convince 5 friends to switch to reusable cups",
      participants: 856,
      points: 300,
      daysLeft: 20,
      difficulty: "Easy",
    },
    {
      id: 3,
      title: "Business Champion",
      description: "Partner with a local café to promote reusable cups",
      participants: 432,
      points: 1000,
      daysLeft: 25,
      difficulty: "Hard",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Active Challenges</h1>
        <div className="flex items-center space-x-4">
          <div className="bg-green-100 px-4 py-2 rounded-lg">
            <span className="text-green-600 font-medium">Your Points: 750</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Trophy className="h-8 w-8 text-green-600" />
                <span className={`px-3 py-1 rounded-full text-sm font-medium
                  ${challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-600' :
                    challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'}`}>
                  {challenge.difficulty}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
              <p className="text-gray-600 mb-4">{challenge.description}</p>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{challenge.daysLeft} days left</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{challenge.participants.toLocaleString()} participants</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Star className="h-4 w-4 mr-2" />
                  <span>{challenge.points} points</span>
                </div>
              </div>
            </div>
            
            <button className="w-full bg-green-600 text-white py-3 px-4 flex items-center justify-center hover:bg-green-700 transition-colors">
              Join Challenge
              <ChevronRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Challenges;