/*
  # Initial Schema Setup for Eco Cup Platform

  1. New Tables
    - users
      - Extended user profile information
      - Tracks user progress and achievements
    - cup_logs
      - Records daily cup usage and savings
    - challenges
      - Stores available challenges and rewards
    - user_challenges
      - Tracks user participation in challenges
    - posts
      - Community forum posts and discussions
    - comments
      - Comments on community posts

  2. Security
    - RLS enabled on all tables
    - Policies for user data protection
    - Public read access for challenges
*/

-- Users table extension
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
    username text UNIQUE,
    full_name text,
    avatar_url text,
    points integer DEFAULT 0,
    cups_saved integer DEFAULT 0,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Cup usage logs
CREATE TABLE public.cup_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    cups_saved integer NOT NULL,
    date date DEFAULT CURRENT_DATE,
    notes text,
    created_at timestamptz DEFAULT now()
);

-- Challenges
CREATE TABLE public.challenges (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL,
    points integer NOT NULL,
    duration_days integer NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- User challenge participation
CREATE TABLE public.user_challenges (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    challenge_id uuid REFERENCES public.challenges(id) ON DELETE CASCADE,
    status text DEFAULT 'in_progress',
    started_at timestamptz DEFAULT now(),
    completed_at timestamptz,
    UNIQUE(user_id, challenge_id)
);

-- Community posts
CREATE TABLE public.posts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    title text NOT NULL,
    content text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);

-- Post comments
CREATE TABLE public.comments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id uuid REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    content text NOT NULL,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cup_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
    FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own cup logs" ON public.cup_logs
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cup logs" ON public.cup_logs
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Challenges are viewable by everyone" ON public.challenges
    FOR SELECT USING (true);

CREATE POLICY "Users can view own challenge participation" ON public.user_challenges
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can participate in challenges" ON public.user_challenges
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own challenge participation" ON public.user_challenges
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Posts are viewable by everyone" ON public.posts
    FOR SELECT USING (true);

CREATE POLICY "Users can create posts" ON public.posts
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON public.posts
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Comments are viewable by everyone" ON public.comments
    FOR SELECT USING (true);

CREATE POLICY "Users can create comments" ON public.comments
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" ON public.comments
    FOR UPDATE USING (auth.uid() = user_id);