import React from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Leaf, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Make Every Cup Count for{' '}
              <span className="text-green-600">Our Planet</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of eco-conscious coffee lovers reducing waste, one reusable cup at a time.
              Track your impact, connect with others, and earn rewards.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/auth"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 transition-colors"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#impact"
                className="inline-flex items-center px-8 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex justify-center">
                <div className="bg-green-100 rounded-full p-3">
                  <Coffee className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <p className="mt-4 text-4xl font-bold text-gray-900">50,000+</p>
              <p className="mt-2 text-gray-600">Cups Saved</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <div className="bg-green-100 rounded-full p-3">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <p className="mt-4 text-4xl font-bold text-gray-900">2.5 tons</p>
              <p className="mt-2 text-gray-600">CO₂ Reduced</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center">
                <div className="bg-green-100 rounded-full p-3">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <p className="mt-4 text-4xl font-bold text-gray-900">10,000+</p>
              <p className="mt-2 text-gray-600">Active Members</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="impact" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              Track your impact, connect with like-minded individuals, and make a difference in the world.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Coffee className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Track Your Impact</h3>
              <p className="text-gray-600">
                Log your reusable cup usage and watch your environmental impact grow over time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Join the Community</h3>
              <p className="text-gray-600">
                Connect with other eco-conscious individuals, share tips, and inspire each other.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="bg-green-100 rounded-full p-3 w-12 h-12 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
              <p className="text-gray-600">
                Get points for your sustainable choices and unlock exclusive rewards and badges.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-green-100 mb-8 max-w-2xl mx-auto">
            Join our community today and start tracking your impact on the environment.
            Every cup counts towards a more sustainable future.
          </p>
          <Link
            to="/auth"
            className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-green-700 bg-white hover:bg-green-50 transition-colors"
          >
            Join Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}