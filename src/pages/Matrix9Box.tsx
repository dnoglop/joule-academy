import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3X3, User, Brain, Target, Save, RotateCcw, MapPin, TrendingUp, Star, CheckCircle } from 'lucide-react';

const Matrix9Box: React.FC = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [evaluatorType, setEvaluatorType] = useState('gestor');
  const [potentialAnswers, setPotentialAnswers] = useState<{[key: number]: number}>({});
  const [performanceAnswers, setPerformanceAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);

  const employees = [
    { id: '1', name: 'Ana Maria Silva', role: 'Coordenadora de Projetos', avatar: 'AM' },
    { id: '2', name: 'Carlos Eduardo Santos', role: 'Analista de Marketing', avatar: 'CS' },
    { id: '3', name: 'Marina Costa Lima', role: 'Gestora de Captação', avatar: 'MC' },
    { id: '4', name: 'Pedro Henrique Oliveira', role: 'Designer UX/UI', avatar: 'PH' },
    { id: '5', name: 'Juliana Ferreira', role: 'Analista Financeiro', avatar: 'JF' }
  ];

  const potentialQuestions = [
    "Esse colaborador aprende rápido com feedbacks?",
    "Demonstra curiosidade e vontade de se desenvolver?",
    "Age com protagonismo mesmo em situações desafiadoras?",
    "Consegue pensar estrategicamente ou só executa?",
    "Tem abertura para inovação e mudanças?",
    "Influencia positivamente os outros?",
    "Tem capacidade de assumir desafios maiores?"
  ];

  const performanceQuestions = [
    "Ele entrega o que é esperado (qualidade e prazo)?",
    "Supera as metas frequentemente?",
    "Resolve problemas com autonomia?",
    "Está sempre presente e engajado?",
    "Recebe bons feedbacks de clientes/pares?",
    "Tem impacto direto nos resultados do time?"
  ];

  const scaleLabels = [
    "Nunca",
    "Raramente", 
    "Às vezes",
    "Frequentemente",
    "Sempre"
  ];

  const handlePotentialAnswer = (questionIndex: number, value: number) => {
    setPotentialAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const handlePerformanceAnswer = (questionIndex: number, value: number) => {
    setPerformanceAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const calculateScores = () => {
    const potentialScore = Object.values(potentialAnswers).reduce((sum, val) => sum + val, 0) / potentialQuestions.length;
    const performanceScore = Object.values(performanceAnswers).reduce((sum, val) => sum + val, 0) / performanceQuestions.length;
    return { potential: potentialScore, performance: performanceScore };
  };

  const getMatrixPosition = (potential: number, performance: number) => {
    const potentialLevel = potential <= 2 ? 0 : potential <= 3.5 ? 1 : 2;
    const performanceLevel = performance <= 2 ? 0 : performance <= 3.5 ? 1 : 2;
    return potentialLevel * 3 + performanceLevel;
  };

  const getPositionLabel = (position: number) => {
    const labels = [
      "Baixo Potencial\nBaixo Desempenho",
      "Baixo Potencial\nMédio Desempenho", 
      "Baixo Potencial\nAlto Desempenho",
      "Médio Potencial\nBaixo Desempenho",
      "Médio Potencial\nMédio Desempenho",
      "Médio Potencial\nAlto Desempenho",
      "Alto Potencial\nBaixo Desempenho",
      "Alto Potencial\nMédio Desempenho",
      "Alto Potencial\nAlto Desempenho"
    ];
    return labels[position];
  };

  const getAIRecommendation = (position: number, potential: number, performance: number) => {
    const recommendations = [
      {
        category: "Atenção Especial",
        description: "Colaborador necessita de acompanhamento próximo e plano de melhoria imediato.",
        actions: ["Mentoria intensiva", "Treinamentos básicos", "Acompanhamento semanal", "Definição de metas claras"]
      },
      {
        category: "Desenvolvimento Focado",
        description: "Bom desempenho atual, mas potencial limitado. Foco em especialização.",
        actions: ["Aprofundamento técnico", "Certificações específicas", "Projetos de expertise", "Reconhecimento por resultados"]
      },
      {
        category: "Alto Performer",
        description: "Excelente desempenho atual. Manter motivação e reconhecer contribuições.",
        actions: ["Projetos de liderança", "Mentoria reversa", "Reconhecimento público", "Bônus por performance"]
      },
      {
        category: "Potencial Inexplorado",
        description: "Alto potencial não convertido em performance. Investigar barreiras.",
        actions: ["Coaching individual", "Mudança de contexto", "Projetos desafiadores", "Feedback estruturado"]
      },
      {
        category: "Colaborador Sólido",
        description: "Performance e potencial equilibrados. Candidato a crescimento gradual.",
        actions: ["Plano de carreira estruturado", "Rotação de projetos", "Desenvolvimento de soft skills", "Networking interno"]
      },
      {
        category: "Talento Sólido",
        description: "Boa performance com potencial médio. Foco em consolidação e especialização.",
        actions: ["Liderança de projetos", "Mentoria de juniores", "Especialização técnica", "Participação em decisões"]
      },
      {
        category: "Diamante Bruto",
        description: "Alto potencial com performance baixa. Prioridade máxima para desenvolvimento.",
        actions: ["Mentoria executiva", "Plano de desenvolvimento acelerado", "Projetos estratégicos", "Acompanhamento C-level"]
      },
      {
        category: "Talento Emergente",
        description: "Alto potencial com boa performance. Candidato natural a posições de liderança.",
        actions: ["Fast track de carreira", "Projetos cross-funcionais", "Mentoria com executivos", "Preparação para liderança"]
      },
      {
        category: "Estrela da Organização",
        description: "Máximo potencial e performance. Talento crítico para retenção e crescimento.",
        actions: ["Sucessão executiva", "Projetos transformacionais", "Equity/participação", "Desenvolvimento de outros talentos"]
      }
    ];
    
    return recommendations[position];
  };

  const handleSubmit = () => {
    if (Object.keys(potentialAnswers).length === potentialQuestions.length && 
        Object.keys(performanceAnswers).length === performanceQuestions.length &&
        selectedEmployee) {
      setShowResults(true);
    }
  };

  const resetForm = () => {
    setPotentialAnswers({});
    setPerformanceAnswers({});
    setSelectedEmployee('');
    setShowResults(false);
  };

  const scores = calculateScores();
  const matrixPosition = getMatrixPosition(scores.potential, scores.performance);
  const aiRecommendation = getAIRecommendation(matrixPosition, scores.potential, scores.performance);
  const selectedEmployeeData = employees.find(emp => emp.id === selectedEmployee);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Page Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-2">
          <Grid3X3 className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-black text-gray-900">
            Matriz 9Box - Avaliação de Colaboradores
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Avalie potencial e performance para posicionamento estratégico na matriz
        </p>
      </motion.div>

      {!showResults ? (
        <>
          {/* Form Configuration */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <User className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-900">Configuração da Avaliação</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Colaborador a ser avaliado
                  </label>
                  <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Selecione um colaborador</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} - {emp.role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de avaliador
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setEvaluatorType('gestor')}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        evaluatorType === 'gestor'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-semibold">Gestor</div>
                      <div className="text-xs text-gray-600">Avaliação direta</div>
                    </button>
                    <button
                      onClick={() => setEvaluatorType('rh')}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        evaluatorType === 'rh'
                          ? 'border-orange-500 bg-orange-50 text-orange-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="font-semibold">RH</div>
                      <div className="text-xs text-gray-600">Visão estratégica</div>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {selectedEmployee && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4">Colaborador Selecionado</h3>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {selectedEmployeeData?.avatar}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{selectedEmployeeData?.name}</h4>
                    <p className="text-gray-600">{selectedEmployeeData?.role}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {selectedEmployee && (
            <>
              {/* Potential Questions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <TrendingUp className="w-6 h-6 text-purple-500" />
                  <h3 className="text-xl font-bold text-gray-900">Avaliação de Potencial</h3>
                  <span className="text-sm text-gray-500">({Object.keys(potentialAnswers).length}/{potentialQuestions.length})</span>
                </div>

                <div className="space-y-6">
                  {potentialQuestions.map((question, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <p className="font-semibold text-gray-900 mb-3">{question}</p>
                      <div className="grid grid-cols-5 gap-2">
                        {scaleLabels.map((label, value) => (
                          <button
                            key={value}
                            onClick={() => handlePotentialAnswer(index, value + 1)}
                            className={`p-3 rounded-lg text-sm font-medium transition-all ${
                              potentialAnswers[index] === value + 1
                                ? 'bg-purple-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <div className="text-xs mb-1">{value + 1}</div>
                            <div>{label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Performance Questions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Target className="w-6 h-6 text-orange-500" />
                  <h3 className="text-xl font-bold text-gray-900">Avaliação de Performance</h3>
                  <span className="text-sm text-gray-500">({Object.keys(performanceAnswers).length}/{performanceQuestions.length})</span>
                </div>

                <div className="space-y-6">
                  {performanceQuestions.map((question, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <p className="font-semibold text-gray-900 mb-3">{question}</p>
                      <div className="grid grid-cols-5 gap-2">
                        {scaleLabels.map((label, value) => (
                          <button
                            key={value}
                            onClick={() => handlePerformanceAnswer(index, value + 1)}
                            className={`p-3 rounded-lg text-sm font-medium transition-all ${
                              performanceAnswers[index] === value + 1
                                ? 'bg-orange-500 text-white shadow-lg'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <div className="text-xs mb-1">{value + 1}</div>
                            <div>{label}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex space-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={Object.keys(potentialAnswers).length !== potentialQuestions.length || 
                           Object.keys(performanceAnswers).length !== performanceQuestions.length}
                  className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  <span>Gerar Matriz 9Box</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={resetForm}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Resetar Formulário</span>
                </motion.button>
              </motion.div>
            </>
          )}
        </>
      ) : (
        /* Results Section */
        <>
          {/* Matrix Results */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 9Box Matrix */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-2 bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Grid3X3 className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-900">Resultado da Matriz 9Box</h3>
              </div>

              <div className="grid grid-cols-3 grid-rows-3 gap-1 bg-gray-200 rounded-xl overflow-hidden h-96 mb-4">
                {Array.from({ length: 9 }, (_, index) => (
                  <div
                    key={index}
                    className={`
                      bg-white flex items-center justify-center text-xs font-semibold text-center leading-tight p-2
                      ${matrixPosition === index 
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg relative' 
                        : ''
                      }
                    `}
                  >
                    {getPositionLabel(index).split('\n').map((line, lineIndex) => (
                      <div key={lineIndex}>{line}</div>
                    ))}
                    {matrixPosition === index && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute"
                      >
                        <MapPin className="w-6 h-6 text-white" />
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 text-center">
                <div>
                  <div className="font-semibold text-gray-900 mb-1">← Performance →</div>
                  <div>Baixo ← → Alto</div>
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">← Potencial →</div>
                  <div>Baixo ← → Alto</div>
                </div>
              </div>
            </motion.div>

            {/* Employee Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {selectedEmployeeData?.avatar}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedEmployeeData?.name}</h3>
              <p className="text-gray-600 mb-6">{selectedEmployeeData?.role}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
                  <div className="text-2xl font-black text-orange-600">{scores.performance.toFixed(1)}</div>
                  <div className="text-xs text-gray-600 font-semibold">Performance</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-xl border border-purple-200">
                  <div className="text-2xl font-black text-purple-600">{scores.potential.toFixed(1)}</div>
                  <div className="text-xs text-gray-600 font-semibold">Potencial</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-purple-50 rounded-xl p-4">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-gray-900">{aiRecommendation.category}</span>
                </div>
                <p className="text-sm text-gray-600">{aiRecommendation.description}</p>
              </div>
            </motion.div>
          </div>

          {/* AI Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg relative"
          >
            <div className="absolute -top-3 right-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
              <Brain className="w-3 h-3" />
              <span>IA Analysis</span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4">Recomendações da IA para PDI</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Análise do Posicionamento</h4>
                <p className="text-gray-700 leading-relaxed mb-4">{aiRecommendation.description}</p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-semibold text-blue-900 mb-2">💡 Insight da IA</h5>
                  <p className="text-sm text-blue-700">
                    Com base na avaliação, este colaborador está posicionado como "{aiRecommendation.category}". 
                    O foco deve ser em {scores.potential > scores.performance ? 'converter potencial em resultados' : 'manter alta performance e desenvolver novas competências'}.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Ações Recomendadas</h4>
                <div className="space-y-3">
                  {aiRecommendation.actions.map((action, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                      className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">{action}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex space-x-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
            >
              <Brain className="w-5 h-5" />
              <span>Gerar PDI Automático</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={resetForm}
              className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Nova Avaliação</span>
            </motion.button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default Matrix9Box;