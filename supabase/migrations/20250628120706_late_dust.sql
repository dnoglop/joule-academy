/*
  # Sistema Matriz 9Box

  1. Novas Tabelas
    - `matriz_9box_evaluations` - Avaliações da matriz
    - `competencies` - Competências avaliadas
    - `competency_evaluations` - Avaliações de competências

  2. Funcionalidades
    - Posicionamento na matriz 9box
    - Avaliação de performance e potencial
    - Histórico de avaliações
    - Competências por posição

  3. Segurança
    - RLS habilitado
    - Gestores avaliam sua equipe
    - Usuários veem suas próprias avaliações
*/

-- Enums para matriz 9box
CREATE TYPE performance_level AS ENUM ('baixo', 'medio', 'alto');
CREATE TYPE potential_level AS ENUM ('baixo', 'medio', 'alto');
CREATE TYPE competency_type AS ENUM ('tecnica', 'comportamental', 'lideranca');

-- Tabela de competências
CREATE TABLE IF NOT EXISTS competencies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  type competency_type NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Tabela de avaliações 9box
CREATE TABLE IF NOT EXISTS matriz_9box_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE,
  evaluator_id uuid REFERENCES user_profiles(id),
  performance_level performance_level NOT NULL,
  potential_level potential_level NOT NULL,
  performance_score numeric(3,2),
  potential_score numeric(3,2),
  comments text,
  recommendations text,
  evaluation_period text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tabela de avaliações de competências
CREATE TABLE IF NOT EXISTS competency_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  matriz_evaluation_id uuid REFERENCES matriz_9box_evaluations(id) ON DELETE CASCADE,
  competency_id uuid REFERENCES competencies(id),
  score numeric(3,2) NOT NULL CHECK (score >= 0 AND score <= 5),
  comments text,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE competencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE matriz_9box_evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE competency_evaluations ENABLE ROW LEVEL SECURITY;

-- Políticas para competências (todos podem ver)
CREATE POLICY "Todos podem ver competências ativas"
  ON competencies FOR SELECT TO authenticated
  USING (is_active = true);

-- Políticas para avaliações 9box
CREATE POLICY "Usuários podem ver suas avaliações"
  ON matriz_9box_evaluations FOR SELECT TO authenticated
  USING (
    user_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Gestores podem ver avaliações da equipe"
  ON matriz_9box_evaluations FOR SELECT TO authenticated
  USING (
    evaluator_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Gestores podem criar avaliações"
  ON matriz_9box_evaluations FOR INSERT TO authenticated
  WITH CHECK (
    evaluator_id IN (
      SELECT id FROM user_profiles 
      WHERE user_id = auth.uid() AND role = 'gestor'
    )
  );

CREATE POLICY "Gestores podem atualizar avaliações"
  ON matriz_9box_evaluations FOR UPDATE TO authenticated
  USING (
    evaluator_id IN (
      SELECT id FROM user_profiles WHERE user_id = auth.uid()
    )
  );

-- Políticas para avaliações de competências
CREATE POLICY "Acesso via avaliação matriz"
  ON competency_evaluations FOR ALL TO authenticated
  USING (
    matriz_evaluation_id IN (
      SELECT id FROM matriz_9box_evaluations WHERE
      user_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
      OR evaluator_id IN (SELECT id FROM user_profiles WHERE user_id = auth.uid())
    )
  );

-- Trigger para updated_at
CREATE TRIGGER update_matriz_9box_evaluations_updated_at
  BEFORE UPDATE ON matriz_9box_evaluations FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Inserir competências padrão
INSERT INTO competencies (name, description, type) VALUES
('Comunicação', 'Capacidade de se comunicar de forma clara e efetiva', 'comportamental'),
('Trabalho em Equipe', 'Habilidade para colaborar e trabalhar em grupo', 'comportamental'),
('Liderança', 'Capacidade de liderar e influenciar outros', 'lideranca'),
('Resolução de Problemas', 'Habilidade para identificar e resolver problemas', 'tecnica'),
('Adaptabilidade', 'Capacidade de se adaptar a mudanças', 'comportamental'),
('Conhecimento Técnico', 'Domínio das competências técnicas da função', 'tecnica'),
('Visão Estratégica', 'Capacidade de pensar estrategicamente', 'lideranca'),
('Desenvolvimento de Pessoas', 'Habilidade para desenvolver outros', 'lideranca'),
('Inovação', 'Capacidade de inovar e criar soluções', 'tecnica'),
('Orientação a Resultados', 'Foco em alcançar objetivos e metas', 'comportamental');