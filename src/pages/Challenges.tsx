import React from 'react';
import { Trophy, Clock, Award, ArrowRight } from 'lucide-react';

const Challenges = () => {
  // Sample data - in production this would come from Supabase
  const challenges = [
    {
      id: 1,
      title: 'Week Without Waste',
      description: 'Use only reusable cups for 7 days straight',
      points: 100,
      duration: '7 days',
      participants: 234,
      difficulty: 'Medium',
    },
    {
      id: 2,
      title: 'Spread the Word',
      description: 'Share your impact on social media and inspire others',
      points: 50,
      duration: '3 days',
      participants: 156,
      difficulty: 'Easy',
    },
    {
      id: 3,
      title: 'Zero Waste Champion',
      description: 'Save 30 cups in one month',
      points: 200,
      duration: '30 days',
      participants: 89,
      difficulty: 'Hard',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Active Challenge */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-8 rounded-lg shadow-lg mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Current Challenge</h2>
            <p className="text-green-100 mb-4">Week Without Waste</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>4 days left</span>
              </div>
              <div className="flex items-center">
                <Trophy className="h-5 w-5 mr-2" />
                <span>100 points</span>
              </div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">57%</div>
            <div className="text-green-100">Progress</div>
          </div>
        </div>
      </div>

      {/* Available Challenges */}
      <h2 className="text-2xl font-bold mb-6">Available Challenges</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <Trophy className="h-8 w-8 text-green-500" />
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                {challenge.difficulty}
              </span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
            <p className="text-gray-600 mb-4">{challenge.description}</p>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {challenge.duration}
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-1" />
                {challenge.points} points
              </div>
            </div>
            <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center">
              Join Challenge
              <ArrowRight className="h-4 w-4 ml-2" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;