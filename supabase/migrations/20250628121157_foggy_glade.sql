/*
  # Create audit logs table

  1. New Tables
    - `audit_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `action` (text)
      - `table_name` (text)
      - `record_id` (uuid)
      - `old_values` (jsonb)
      - `new_values` (jsonb)
      - `ip_address` (text)
      - `user_agent` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on `audit_logs` table
    - Add policy for managers to view audit logs
*/

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id),
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Managers can view audit logs"
  ON audit_logs
  FOR SELECT
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE user_id = auth.uid() AND role = 'gestor'
  ));

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_record 
ON audit_logs(table_name, record_id);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_created 
ON audit_logs(user_id, created_at DESC);