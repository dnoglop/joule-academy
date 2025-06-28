/*
  # Create system settings table

  1. New Tables
    - `system_settings`
      - `id` (uuid, primary key)
      - `key` (text, unique)
      - `value` (jsonb)
      - `description` (text)
      - `category` (text)
      - `is_public` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `system_settings` table
    - Add policy for public settings
    - Add policy for managers to manage settings
*/

CREATE TABLE IF NOT EXISTS system_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  category text DEFAULT 'general',
  is_public boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read public settings"
  ON system_settings
  FOR SELECT
  TO authenticated
  USING (is_public = true);

CREATE POLICY "Managers can manage all settings"
  ON system_settings
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_id = auth.uid() AND role = 'gestor'
  ));

CREATE TRIGGER update_system_settings_updated_at
  BEFORE UPDATE ON system_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default settings
INSERT INTO system_settings (key, value, description, category, is_public) VALUES
('app_name', '"Joule Academy"', 'Nome da aplicação', 'general', true),
('app_version', '"1.0.0"', 'Versão da aplicação', 'general', true),
('maintenance_mode', 'false', 'Modo de manutenção', 'general', false),
('max_pdi_goals', '10', 'Máximo de metas por PDI', 'pdi', true),
('evaluation_360_enabled', 'true', 'Avaliação 360 habilitada', 'evaluation', true),
('training_auto_complete_threshold', '90', 'Porcentagem para conclusão automática de treinamento', 'training', true);