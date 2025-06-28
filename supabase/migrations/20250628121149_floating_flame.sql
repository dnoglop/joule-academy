/*
  # Create notifications table

  1. New Tables
    - `notifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `title` (text)
      - `message` (text)
      - `type` (text) - info, success, warning, error
      - `category` (text) - pdi, training, evaluation, system
      - `is_read` (boolean)
      - `action_url` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `notifications` table
    - Add policy for users to manage their own notifications
*/

CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  type text DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  category text DEFAULT 'system' CHECK (category IN ('pdi', 'training', 'evaluation', 'system')),
  is_read boolean DEFAULT false,
  action_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own notifications"
  ON notifications
  FOR ALL
  TO authenticated
  USING (user_id IN (
    SELECT id FROM user_profiles WHERE user_id = auth.uid()
  ));

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_notifications_user_id_created_at 
ON notifications(user_id, created_at DESC);