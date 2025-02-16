import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to get the current user
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

// Helper function to get user profile
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
  return data;
};

// Helper function to update cup count
export const updateCupCount = async (userId: string, increment: number) => {
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('cups_saved')
    .eq('id', userId)
    .single();

  if (profileError) throw profileError;

  const newCount = Math.max(0, (profile?.cups_saved || 0) + increment);
  const points = increment > 0 ? 10 : -10; // 10 points per cup

  const { error } = await supabase
    .from('profiles')
    .update({ 
      cups_saved: newCount,
      points: supabase.sql`points + ${points}`,
    })
    .eq('id', userId);

  if (error) throw error;

  // Log the cup count change
  const { error: logError } = await supabase
    .from('cup_logs')
    .insert([
      {
        user_id: userId,
        cups_saved: increment,
        notes: increment > 0 ? 'Cup saved' : 'Cup count adjusted'
      }
    ]);

  if (logError) throw logError;

  return newCount;
};

// Helper function to create a post
export const createPost = async (userId: string, title: string, content: string, imageUrl?: string) => {
  const { error } = await supabase
    .from('posts')
    .insert([
      {
        user_id: userId,
        title,
        content,
        image_url: imageUrl
      }
    ]);

  if (error) throw error;
};

// Helper function to get all posts with user information
export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:user_id (
        username,
        full_name,
        avatar_url
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Helper function to upload image
export const uploadImage = async (file: File, bucket: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file);

  if (error) throw error;

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(filePath);

  return data.publicUrl;
};