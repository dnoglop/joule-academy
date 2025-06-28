/*
  # Create 360 evaluation tables

  1. New Tables
    - `evaluation_360_cycles`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `start_date` (date)
      - `end_date` (date)
      - `status` (text)
      - `created_by` (uuid, foreign key)
      - `created_at` (timestamp)

    - `evaluation_360_participants`
      - `id` (uuid, primary key)
      - `cycle_id` (uuid, foreign key)
      - `evaluated_user_id` (uuid, foreign key)
      - `evaluator_user_id` (uuid, foreign key)
      - `evaluation_type` (text) - self, manager, peer, subordinate
      - `status` (text)
      - `submitted_at` (timestamp)
      - `created_at` (timestamp)

    - `evaluation_360_responses`
      - `id` (uuid, primary key)
      - `participant_id` (uuid, foreign key)
      - `competency_id` (uuid, foreign key)
      - `score` (numeric)
      - `comments` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
*/

-- Create evaluation cycles table
CREATE TABLE IF NOT EXISTS evaluation_360_cycles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  status text DEFAULT 'planejado' CHECK (status IN ('planejado', 'ativo', 'concluido', 'cancelado')),
  created_by uuid REFERENCES user_profiles(id),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE evaluation_360_cycles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Managers can manage evaluation cycles"
  ON evaluation_360_cycles
  FOR ALL
  TO authenticated
  USING (created_by IN (
    SELECT id FROM user_profiles WHERE user_id = auth.uid() AND role = 'gestor'
  ));

CREATE POLICY "Users can view active cycles they participate in"
  ON evaluation_360_cycles
  FOR SELECT
  TO authenticated
  USING (status = 'ativo' AND id IN (
    SELECT cycle_id FROM evaluation_360_participants 
    WHERE evaluated_user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
    OR evaluator_user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  ));

-- Create participants table
CREATE TABLE IF NOT EXISTS evaluation_360_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cycle_id uuid REFERENCES evaluation_360_cycles(id) ON DELETE CASCADE,
  evaluated_user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  evaluator_user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  evaluation_type text NOT NULL CHECK (evaluation_type IN ('autoavaliacao', 'gestor', 'par', 'subordinado')),
  status text DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_andamento', 'concluida')),
  submitted_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(cycle_id, evaluated_user_id, evaluator_user_id, evaluation_type)
);

ALTER TABLE evaluation_360_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their evaluation participations"
  ON evaluation_360_participants
  FOR SELECT
  TO authenticated
  USING (
    evaluated_user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
    OR evaluator_user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  );

CREATE POLICY "Users can update their evaluations"
  ON evaluation_360_participants
  FOR UPDATE
  TO authenticated
  USING (evaluator_user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid()));

-- Create responses table
CREATE TABLE IF NOT EXISTS evaluation_360_responses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id uuid REFERENCES evaluation_360_participants(id) ON DELETE CASCADE,
  competency_id uuid REFERENCES competencies(id),
  score numeric(3,2) NOT NULL CHECK (score >= 0 AND score <= 5),
  comments text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(participant_id, competency_id)
);

ALTER TABLE evaluation_360_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their evaluation responses"
  ON evaluation_360_responses
  FOR ALL
  TO authenticated
  USING (participant_id IN (
    SELECT id FROM evaluation_360_participants 
    WHERE evaluator_user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
  ));