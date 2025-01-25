import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  return (
    <nav className="bg-green-600 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <Coffee className="h-6 w-6" />
          <span className="font-bold text-xl">CupWise</span>
        </Link>
        {user && (
          <div className="flex items-center gap-4">
            <Link to="/" className="px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Dashboard
            </Link>
            <Link to="/community" className="px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Community
            </Link>
            <Link to="/profile" className="px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Profile
            </Link>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}