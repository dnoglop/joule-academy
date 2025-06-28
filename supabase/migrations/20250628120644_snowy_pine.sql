/*
  # Sistema de PDI (Plano de Desenvolvimento Individual)

  1. Novas Tabelas
    - `pdis` - Planos de desenvolvimento
    - `pdi_goals` - Metas do PDI
    - `pdi_actions` - Ações específicas
    - `pdi_progress` - Acompanhamento de progresso

  2. Funcionalidades
    - Criação e gestão de PDIs
    - Definição de metas e ações
    - Acompanhamento de progresso
    - Status e prazos

  3. Segurança
    - RLS habilitado
    - Usuários acessam seus PDIs
    - Gestores acessam PDIs da equipe
*/

-- Enums para status
CREATE TYPE pdi_status AS ENUM ('rascunho', 'ativo', 'concluido', 'cancelado');
CREATE TYPE goal_status AS ENUM ('nao_iniciado', 'em_andamento', 'concluido', 'atrasado');
CREATE TYPE action_status AS ENUM ('pendente', 'em_andamento', 'concluida', 'cancelada');

-- Tabela principal de PDIs
CREATE TABLE IF NOT EXISTS pdis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  manager_id uuid REFERENCES user_profiles(id),
  title text NOT NULL,
  description text,
  status pdi_status DEFAULT 'rascunho',
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_by uuid REFERENCES user_profiles(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de metas do PDI
CREATE TABLE IF NOT EXISTS pdi_goals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pdi_id uuid REFERENCES pdis(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status goal_status DEFAULT 'nao_iniciado',
  target_date date,
  weight numeric(3,2) DEFAULT 1.0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de ações específicas
CREATE TABLE IF NOT EXISTS pdi_actions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id uuid REFERENCES pdi_goals(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  status action_status DEFAULT 'pendente',
  due_date date,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de progresso
CREATE TABLE IF NOT EXISTS pdi_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pdi_id uuid REFERENCES pdis(id) ON DELETE CASCADE,
  goal_id uuid REFERENCES pdi_goals(id),
  progress_percentage numeric(5,2) DEFAULT 0,
  notes text,
  recorded_by uuid REFERENCES user_profiles(id),
  recorded_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE pdis ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdi_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdi_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdi_progress ENABLE ROW LEVEL SECURITY;

-- Políticas para PDIs
CREATE POLICY "Usuários podem ver seus próprios PDIs"
  ON pdis FOR SELECT TO authenticated
  USING (
    user_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Gestores podem ver PDIs da equipe"
  ON pdis FOR SELECT TO authenticated
  USING (
    manager_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Gestores podem criar PDIs para equipe"
  ON pdis FOR INSERT TO authenticated
  WITH CHECK (
    created_by IN (
      SELECT id FROM user_profiles 
      WHERE user_id = auth.uid() AND role = 'gestor'
    )
  );

-- Políticas para metas
CREATE POLICY "Acesso a metas via PDI"
  ON pdi_goals FOR ALL TO authenticated
  USING (
    pdi_id IN (
      SELECT id FROM pdis WHERE 
      user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
      OR manager_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
    )
  );

-- Políticas para ações
CREATE POLICY "Acesso a ações via metas"
  ON pdi_actions FOR ALL TO authenticated
  USING (
    goal_id IN (
      SELECT pg.id FROM pdi_goals pg
      JOIN pdis p ON pg.pdi_id = p.id
      WHERE p.user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
      OR p.manager_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
    )
  );

-- Políticas para progresso
CREATE POLICY "Acesso a progresso via PDI"
  ON pdi_progress FOR ALL TO authenticated
  USING (
    pdi_id IN (
      SELECT id FROM pdis WHERE 
      user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
      OR manager_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
    )
  );

-- Triggers para updated_at
CREATE TRIGGER update_pdis_updated_at
  BEFORE UPDATE ON pdis FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pdi_goals_updated_at
  BEFORE UPDATE ON pdi_goals FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pdi_actions_updated_at
  BEFORE UPDATE ON pdi_actions FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();