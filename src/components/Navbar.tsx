import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Home, BarChart2, Trophy, Users } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

function Navbar() {
  const { user, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Coffee className="h-8 w-8" />
            <span className="font-bold text-xl">CupWise</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="flex items-center space-x-1 hover:text-green-200">
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/dashboard" className="flex items-center space-x-1 hover:text-green-200">
              <BarChart2 className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link to="/challenges" className="flex items-center space-x-1 hover:text-green-200">
              <Trophy className="h-5 w-5" />
              <span>Challenges</span>
            </Link>
            <Link to="/community" className="flex items-center space-x-1 hover:text-green-200">
              <Users className="h-5 w-5" />
              <span>Community</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button
                onClick={() => signOut()}
                className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50"
              >
                Sign Out
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </nav>
  );
}

export default Navbar;