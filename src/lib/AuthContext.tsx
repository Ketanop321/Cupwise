import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';

interface AuthContextType {
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    signUp: async (email: string, password: string, fullName: string) => {
      try {
        // First check if user exists
        const { data: existingUser } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (existingUser?.user) {
          throw new Error('An account with this email already exists. Please sign in instead.');
        }

        const { data: authData, error: authError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (authError) throw authError;

        if (authData.user) {
          // Wait for auth session to be established
          await new Promise(resolve => setTimeout(resolve, 1000));

          // Create initial profile
          const { error: profileError } = await supabase
            .from('profiles')
            .insert([
              {
                id: authData.user.id,
                username: email.split('@')[0],
                full_name: fullName,
                points: 0,
                cups_saved: 0,
              },
            ])
            .select()
            .single();

          if (profileError) {
            console.error('Profile creation error:', profileError);
            // Clean up the auth user if profile creation fails
            await supabase.auth.signOut();
            throw new Error('Failed to create profile. Please try again.');
          }
        }

        return authData;
      } catch (error: any) {
        console.error('Signup error:', error);
        throw error;
      }
    },

    signIn: async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          if (error.message === 'Invalid login credentials') {
            throw new Error('Invalid email or password. Please try again.');
          }
          throw error;
        }

        // Verify profile exists
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select()
          .eq('id', data.user.id)
          .single();

        if (profileError || !profile) {
          await supabase.auth.signOut();
          throw new Error('Profile not found. Please sign up for a new account.');
        }

        return data;
      } catch (error: any) {
        console.error('Sign in error:', error);
        throw error;
      }
    },

    signOut: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        navigate('/');
      } catch (error: any) {
        console.error('Sign out error:', error);
        throw error;
      }
    },

    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};