/*
  # Sistema de Usuários e Perfis

  1. Novas Tabelas
    - `user_profiles` - Perfis detalhados dos usuários
      - `id` (uuid, primary key)
      - `user_id` (uuid, referência ao auth.users)
      - `full_name` (text)
      - `email` (text)
      - `role` (enum: funcionario, gestor)
      - `department` (text)
      - `position` (text)
      - `manager_id` (uuid, auto-referência)
      - `hire_date` (date)
      - `avatar_url` (text)
      - `phone` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Segurança
    - Habilitar RLS em todas as tabelas
    - Políticas para usuários autenticados acessarem seus próprios dados
    - Gestores podem acessar dados de sua equipe
*/

-- Enum para roles de usuário
CREATE TYPE user_role AS ENUM ('funcionario', 'gestor');

-- Tabela de perfis de usuário
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'funcionario',
  department text,
  position text,
  manager_id uuid REFERENCES user_profiles(id),
  hire_date date,
  avatar_url text,
  phone text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança
CREATE POLICY "Usuários podem ver seus próprios perfis"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios perfis"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Gestores podem ver perfis de sua equipe"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles manager
      WHERE manager.user_id = auth.uid()
      AND manager.role = 'gestor'
      AND user_profiles.manager_id = manager.id
    )
  );

-- Função para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para atualizar updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();