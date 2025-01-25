/*
  # Add profile creation procedure

  1. New Functions
    - `create_new_profile`: Creates a new profile with proper RLS bypass
      - Parameters:
        - user_id (uuid): The user's ID from auth.users
        - user_username (text): The username for the profile
        - user_full_name (text): The user's full name

  2. Security
    - Function runs with SECURITY DEFINER to bypass RLS
    - Only authenticated users can execute the function
*/

-- Create stored procedure for profile creation
CREATE OR REPLACE FUNCTION create_new_profile(
  user_id uuid,
  user_username text,
  user_full_name text
) RETURNS void AS $$
BEGIN
  INSERT INTO profiles (id, username, full_name)
  VALUES (user_id, user_username, user_full_name);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION create_new_profile TO authenticated;