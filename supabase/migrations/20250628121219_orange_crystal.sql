/*
  # Create indexes and optimizations

  1. Performance Indexes
    - Indexes for frequently queried columns
    - Composite indexes for common query patterns

  2. Optimizations
    - Views for common queries
    - Functions for complex operations
*/

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_user_profiles_manager_id ON user_profiles(manager_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_role ON user_profiles(role);
CREATE INDEX IF NOT EXISTS idx_user_profiles_department ON user_profiles(department);

CREATE INDEX IF NOT EXISTS idx_pdis_user_id ON pdis(user_id);
CREATE INDEX IF NOT EXISTS idx_pdis_manager_id ON pdis(manager_id);
CREATE INDEX IF NOT EXISTS idx_pdis_status ON pdis(status);
CREATE INDEX IF NOT EXISTS idx_pdis_start_date ON pdis(start_date);
CREATE INDEX IF NOT EXISTS idx_pdis_end_date ON pdis(end_date);

CREATE INDEX IF NOT EXISTS idx_pdi_goals_pdi_id ON pdi_goals(pdi_id);
CREATE INDEX IF NOT EXISTS idx_pdi_goals_status ON pdi_goals(status);
CREATE INDEX IF NOT EXISTS idx_pdi_goals_target_date ON pdi_goals(target_date);

CREATE INDEX IF NOT EXISTS idx_pdi_actions_goal_id ON pdi_actions(goal_id);
CREATE INDEX IF NOT EXISTS idx_pdi_actions_status ON pdi_actions(status);
CREATE INDEX IF NOT EXISTS idx_pdi_actions_due_date ON pdi_actions(due_date);

CREATE INDEX IF NOT EXISTS idx_matriz_evaluations_user_id ON matriz_9box_evaluations(user_id);
CREATE INDEX IF NOT EXISTS idx_matriz_evaluations_evaluator_id ON matriz_9box_evaluations(evaluator_id);
CREATE INDEX IF NOT EXISTS idx_matriz_evaluations_period ON matriz_9box_evaluations(evaluation_period);

CREATE INDEX IF NOT EXISTS idx_competency_evaluations_matriz_id ON competency_evaluations(matriz_evaluation_id);
CREATE INDEX IF NOT EXISTS idx_competency_evaluations_competency_id ON competency_evaluations(competency_id);

CREATE INDEX IF NOT EXISTS idx_trainings_category_id ON trainings(category_id);
CREATE INDEX IF NOT EXISTS idx_trainings_difficulty ON trainings(difficulty_level);
CREATE INDEX IF NOT EXISTS idx_trainings_active ON trainings(is_active);

CREATE INDEX IF NOT EXISTS idx_training_progress_user_id ON training_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_training_progress_training_id ON training_progress(training_id);
CREATE INDEX IF NOT EXISTS idx_training_progress_completed ON training_progress(completed_at);

-- Create view for team overview
CREATE OR REPLACE VIEW team_overview AS
SELECT 
  up.id,
  up.full_name,
  up.email,
  up.department,
  up.position,
  up.role,
  manager.full_name as manager_name,
  COUNT(DISTINCT p.id) as total_pdis,
  COUNT(DISTINCT CASE WHEN p.status = 'ativo' THEN p.id END) as active_pdis,
  COUNT(DISTINCT tp.id) as completed_trainings,
  AVG(me.performance_score) as avg_performance,
  AVG(me.potential_score) as avg_potential
FROM user_profiles up
LEFT JOIN user_profiles manager ON up.manager_id = manager.id
LEFT JOIN pdis p ON up.id = p.user_id
LEFT JOIN training_progress tp ON up.id = tp.user_id AND tp.completed_at IS NOT NULL
LEFT JOIN matriz_9box_evaluations me ON up.id = me.user_id
GROUP BY up.id, up.full_name, up.email, up.department, up.position, up.role, manager.full_name;

-- Create view for PDI dashboard
CREATE OR REPLACE VIEW pdi_dashboard AS
SELECT 
  p.id,
  p.title,
  p.status,
  p.start_date,
  p.end_date,
  up.full_name as user_name,
  manager.full_name as manager_name,
  COUNT(DISTINCT pg.id) as total_goals,
  COUNT(DISTINCT CASE WHEN pg.status = 'concluido' THEN pg.id END) as completed_goals,
  COUNT(DISTINCT pa.id) as total_actions,
  COUNT(DISTINCT CASE WHEN pa.status = 'concluida' THEN pa.id END) as completed_actions,
  ROUND(
    COALESCE(
      COUNT(DISTINCT CASE WHEN pg.status = 'concluido' THEN pg.id END) * 100.0 / 
      NULLIF(COUNT(DISTINCT pg.id), 0), 
      0
    ), 2
  ) as completion_percentage
FROM pdis p
JOIN user_profiles up ON p.user_id = up.id
LEFT JOIN user_profiles manager ON p.manager_id = manager.id
LEFT JOIN pdi_goals pg ON p.id = pg.pdi_id
LEFT JOIN pdi_actions pa ON pg.id = pa.goal_id
GROUP BY p.id, p.title, p.status, p.start_date, p.end_date, up.full_name, manager.full_name;

-- Grant access to views
GRANT SELECT ON team_overview TO authenticated;
GRANT SELECT ON pdi_dashboard TO authenticated;

-- Create RLS policies for views
ALTER VIEW team_overview SET (security_invoker = true);
ALTER VIEW pdi_dashboard SET (security_invoker = true);