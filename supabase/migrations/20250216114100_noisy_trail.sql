/*
  # Add Image Support for Posts

  1. Changes
    - Add image_url column to posts table
    - Create storage bucket for post images
    - Update RLS policies for storage access

  2. Security
    - Public read access for post images
    - Authenticated users can upload images
    - Maintain existing RLS protections
*/

-- Add image_url column to posts table
ALTER TABLE public.posts
ADD COLUMN IF NOT EXISTS image_url text;

-- Create storage bucket for post images
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for post images
CREATE POLICY "Post images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'post-images');

CREATE POLICY "Authenticated users can upload post images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'post-images'
  AND auth.role() = 'authenticated'
);