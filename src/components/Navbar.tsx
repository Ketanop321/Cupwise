import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, LayoutDashboard, Users, Trophy, User, LogOut } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold text-green-800">EcoCup</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            {user ? (
              <>
                <NavLink to="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
                <NavLink to="/community" icon={<Users className="h-5 w-5" />} label="Community" />
                <NavLink to="/challenges" icon={<Trophy className="h-5 w-5" />} label="Challenges" />
                <NavLink to="/profile" icon={<User className="h-5 w-5" />} label="Profile" />
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/auth')}
                className="flex items-center space-x-1 px-3 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  
  return (
    <Link
      to={to}
      className={`flex items-center space-x-1 px-3 py-2 rounded-md transition-colors ${
        isActive
          ? 'text-green-600 bg-green-50'
          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Navbar;