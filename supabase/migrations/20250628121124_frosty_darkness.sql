/*
  # Create training progress table

  1. New Tables
    - `training_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `training_id` (uuid, foreign key)
      - `progress_percentage` (numeric)
      - `completed_at` (timestamp)
      - `last_watched_at` (timestamp)
      - `watch_time_minutes` (integer)
      - `rating` (integer) - 1-5 stars
      - `comments` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `training_progress` table
    - Add policies for users to manage their own progress
    - Add policy for managers to view team progress
*/

CREATE TABLE IF NOT EXISTS training_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  training_id uuid REFERENCES trainings(id) ON DELETE CASCADE,
  progress_percentage numeric(5,2) DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  completed_at timestamptz,
  last_watched_at timestamptz DEFAULT now(),
  watch_time_minutes integer DEFAULT 0,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comments text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, training_id)
);

ALTER TABLE training_progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own training progress"
  ON training_progress
  FOR ALL
  TO authenticated
  USING (user_id IN (
    SELECT id FROM user_profiles WHERE user_id = auth.uid()
  ));

CREATE POLICY "Managers can view team training progress"
  ON training_progress
  FOR SELECT
  TO authenticated
  USING (user_id IN (
    SELECT up.id FROM user_profiles up
    JOIN user_profiles manager ON manager.id = up.manager_id
    WHERE manager.user_id = auth.uid() AND manager.role = 'gestor'
  ));

CREATE TRIGGER update_training_progress_updated_at
  BEFORE UPDATE ON training_progress
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();