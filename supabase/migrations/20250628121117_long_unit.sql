/*
  # Create trainings table

  1. New Tables
    - `trainings`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `category_id` (uuid, foreign key)
      - `instructor` (text)
      - `duration_minutes` (integer)
      - `difficulty_level` (text)
      - `video_url` (text)
      - `thumbnail_url` (text)
      - `materials_url` (text)
      - `tags` (text array)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `trainings` table
    - Add policy for authenticated users to read active trainings
*/

CREATE TABLE IF NOT EXISTS trainings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  category_id uuid REFERENCES training_categories(id),
  instructor text,
  duration_minutes integer DEFAULT 0,
  difficulty_level text DEFAULT 'iniciante' CHECK (difficulty_level IN ('iniciante', 'intermediario', 'avancado')),
  video_url text,
  thumbnail_url text,
  materials_url text,
  tags text[] DEFAULT '{}',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE trainings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read active trainings"
  ON trainings
  FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE TRIGGER update_trainings_updated_at
  BEFORE UPDATE ON trainings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();