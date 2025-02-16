/*
  # Fix Profile Creation Policies

  1. Changes
    - Add policy to allow profile creation during signup
    - Ensure users can only create their own profile
    - Maintain existing policies for profile updates and viewing

  2. Security
    - Users can only create their own profile
    - Profile creation is tied to auth.uid()
    - Maintains existing RLS protections
*/

-- Drop existing policies for profiles table
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Create comprehensive policies for profiles table
CREATE POLICY "Profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true);

CREATE POLICY "Users can insert their own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;