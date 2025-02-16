import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Leaf } from 'lucide-react';
import { useAuth, AuthProvider } from './lib/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Community from './pages/Community';
import Challenges from './pages/Challenges';
import Profile from './pages/Profile';
import Auth from './pages/Auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth" />;
  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/community"
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              }
            />
            <Route
              path="/challenges"
              element={
                <ProtectedRoute>
                  <Challenges />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Routes>
          
          <footer className="bg-green-800 text-white py-6 mt-20">
            <div className="container mx-auto px-4">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Leaf className="h-6 w-6" />
                <span className="text-xl font-semibold">EcoCup Initiative</span>
              </div>
              <p className="text-center text-green-200">
                Together we can make a difference. Save a cup, save the planet.
              </p>
            </div>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;