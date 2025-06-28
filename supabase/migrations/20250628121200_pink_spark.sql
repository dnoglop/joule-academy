/*
  # Insert sample data for development

  1. Sample Data
    - Sample competencies
    - Sample trainings
    - Sample user profiles (for demo)

  Note: This is for development/demo purposes only
*/

-- Insert sample competencies if they don't exist
INSERT INTO competencies (name, description, type) VALUES
('Comunicação Eficaz', 'Capacidade de transmitir ideias de forma clara e objetiva', 'comportamental'),
('Liderança Inspiradora', 'Habilidade de motivar e guiar equipes para alcançar objetivos', 'lideranca'),
('Pensamento Analítico', 'Capacidade de analisar problemas complexos e encontrar soluções', 'comportamental'),
('Gestão de Tempo', 'Habilidade de organizar e priorizar tarefas eficientemente', 'comportamental'),
('Trabalho em Equipe', 'Capacidade de colaborar efetivamente com outros', 'comportamental'),
('Inovação e Criatividade', 'Habilidade de gerar ideias novas e soluções criativas', 'comportamental'),
('Orientação a Resultados', 'Foco em alcançar metas e objetivos estabelecidos', 'comportamental'),
('Desenvolvimento de Pessoas', 'Capacidade de desenvolver e orientar outros profissionais', 'lideranca'),
('Visão Estratégica', 'Habilidade de pensar a longo prazo e definir direções', 'lideranca'),
('Tecnologias Digitais', 'Conhecimento e uso eficaz de ferramentas digitais', 'tecnica'),
('Gestão de Projetos', 'Capacidade de planejar, executar e controlar projetos', 'tecnica'),
('Análise de Dados', 'Habilidade de interpretar e utilizar dados para decisões', 'tecnica')
ON CONFLICT (name) DO NOTHING;

-- Insert sample trainings
DO $$
DECLARE
    cat_lideranca uuid;
    cat_comunicacao uuid;
    cat_tecnologia uuid;
    cat_vendas uuid;
    cat_desenvolvimento uuid;
    cat_projetos uuid;
BEGIN
    -- Get category IDs
    SELECT id INTO cat_lideranca FROM training_categories WHERE name = 'Liderança';
    SELECT id INTO cat_comunicacao FROM training_categories WHERE name = 'Comunicação';
    SELECT id INTO cat_tecnologia FROM training_categories WHERE name = 'Tecnologia';
    SELECT id INTO cat_vendas FROM training_categories WHERE name = 'Vendas';
    SELECT id INTO cat_desenvolvimento FROM training_categories WHERE name = 'Desenvolvimento Pessoal';
    SELECT id INTO cat_projetos FROM training_categories WHERE name = 'Gestão de Projetos';

    -- Insert sample trainings
    INSERT INTO trainings (title, description, category_id, instructor, duration_minutes, difficulty_level, tags) VALUES
    ('Fundamentos da Liderança', 'Aprenda os princípios básicos da liderança eficaz', cat_lideranca, 'Dr. Maria Silva', 120, 'iniciante', ARRAY['liderança', 'gestão', 'equipe']),
    ('Comunicação Assertiva', 'Desenvolva habilidades de comunicação clara e eficaz', cat_comunicacao, 'Prof. João Santos', 90, 'intermediario', ARRAY['comunicação', 'assertividade', 'relacionamento']),
    ('Excel Avançado para Gestores', 'Domine ferramentas avançadas do Excel para análise de dados', cat_tecnologia, 'Ana Costa', 180, 'avancado', ARRAY['excel', 'dados', 'análise']),
    ('Técnicas de Vendas Consultivas', 'Aprenda a vender através da consultoria e relacionamento', cat_vendas, 'Carlos Oliveira', 150, 'intermediario', ARRAY['vendas', 'consultoria', 'relacionamento']),
    ('Inteligência Emocional no Trabalho', 'Desenvolva sua inteligência emocional para melhor performance', cat_desenvolvimento, 'Dra. Fernanda Lima', 100, 'iniciante', ARRAY['inteligência emocional', 'autoconhecimento', 'relacionamento']),
    ('Metodologias Ágeis', 'Introdução ao Scrum e outras metodologias ágeis', cat_projetos, 'Roberto Ferreira', 200, 'intermediario', ARRAY['scrum', 'agile', 'projetos']),
    ('Liderança em Tempos de Crise', 'Como liderar equipes durante períodos desafiadores', cat_lideranca, 'Dr. Maria Silva', 110, 'avancado', ARRAY['liderança', 'crise', 'gestão']),
    ('Apresentações Impactantes', 'Crie e apresente conteúdo de forma envolvente', cat_comunicacao, 'Prof. João Santos', 80, 'intermediario', ARRAY['apresentação', 'público', 'storytelling']),
    ('Power BI para Iniciantes', 'Aprenda a criar dashboards e relatórios no Power BI', cat_tecnologia, 'Ana Costa', 160, 'iniciante', ARRAY['power bi', 'dashboards', 'relatórios']),
    ('Gestão de Conflitos', 'Técnicas para resolver conflitos de forma construtiva', cat_desenvolvimento, 'Dra. Fernanda Lima', 95, 'intermediario', ARRAY['conflitos', 'mediação', 'relacionamento'])
    ON CONFLICT DO NOTHING;
END $$;