import React from 'react';
import { ArrowRight, Coffee, TreePine, Droplets } from 'lucide-react';

function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Make Every Cup Count
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Join the movement to reduce paper cup waste and create a sustainable future
            </p>
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold text-lg hover:bg-green-50 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Coffee className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">16 Billion</h3>
              <p className="text-gray-600">Paper cups used annually</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <TreePine className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">20 Million</h3>
              <p className="text-gray-600">Trees cut down yearly</p>
            </div>
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <Droplets className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-900 mb-2">4 Billion</h3>
              <p className="text-gray-600">Gallons of water wasted</p>
            </div>
          </div>
        </div>
      </section>

      {/* Take Action Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Take Action Today</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Track Your Impact</h3>
              <p className="text-gray-600 mb-4">
                Monitor your daily cup usage and see your environmental impact in real-time.
              </p>
              <a href="/dashboard" className="text-green-600 font-medium flex items-center hover:text-green-700">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Join Challenges</h3>
              <p className="text-gray-600 mb-4">
                Participate in community challenges and earn rewards for sustainable choices.
              </p>
              <a href="/challenges" className="text-green-600 font-medium flex items-center hover:text-green-700">
                View Challenges <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">Share Knowledge</h3>
              <p className="text-gray-600 mb-4">
                Connect with others and share tips for reducing paper cup usage.
              </p>
              <a href="/community" className="text-green-600 font-medium flex items-center hover:text-green-700">
                Join Community <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;