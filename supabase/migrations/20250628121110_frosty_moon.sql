/*
  # Create training categories table

  1. New Tables
    - `training_categories`
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `color` (text) - for UI theming
      - `icon` (text) - icon name for UI
      - `is_active` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `training_categories` table
    - Add policy for authenticated users to read active categories
*/

CREATE TABLE IF NOT EXISTS training_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  color text DEFAULT '#F59E0B',
  icon text DEFAULT 'book',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE training_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read active categories"
  ON training_categories
  FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Insert default categories
INSERT INTO training_categories (name, description, color, icon) VALUES
('Liderança', 'Desenvolvimento de habilidades de liderança e gestão', '#8B5CF6', 'users'),
('Comunicação', 'Técnicas de comunicação eficaz e apresentação', '#10B981', 'message-circle'),
('Tecnologia', 'Competências técnicas e digitais', '#3B82F6', 'laptop'),
('Vendas', 'Estratégias e técnicas de vendas', '#EF4444', 'trending-up'),
('Desenvolvimento Pessoal', 'Crescimento pessoal e profissional', '#F59E0B', 'user-check'),
('Gestão de Projetos', 'Metodologias e ferramentas de gestão', '#6366F1', 'folder');