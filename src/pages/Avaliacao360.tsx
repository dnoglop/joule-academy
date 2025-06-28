import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  User, 
  Users, 
  Star, 
  Save, 
  RotateCcw, 
  Eye, 
  EyeOff,
  CheckCircle,
  MessageSquare,
  Target,
  Heart,
  Brain,
  TrendingUp,
  Shield
} from 'lucide-react';

const Avaliacao360: React.FC = () => {
  const [selectedView, setSelectedView] = useState<'funcionario' | 'gestor'>('funcionario');
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [autoavaliacaoAnswers, setAutoavaliacaoAnswers] = useState<{[key: number]: number}>({});
  const [gestorAvaliacaoAnswers, setGestorAvaliacaoAnswers] = useState<{[key: number]: number}>({});
  const [openAnswers, setOpenAnswers] = useState<{[key: string]: string}>({});
  const [showResults, setShowResults] = useState(false);

  const employees = [
    { id: '1', name: 'Ana Maria Silva', role: 'Coordenadora de Projetos', avatar: 'AM', manager: 'Danilo Nogueira' },
    { id: '2', name: 'Carlos Eduardo Santos', role: 'Analista de Marketing', avatar: 'CS', manager: 'Danilo Nogueira' },
    { id: '3', name: 'Marina Costa Lima', role: 'Gestora de Captação', avatar: 'MC', manager: 'Danilo Nogueira' },
    { id: '4', name: 'Pedro Henrique Oliveira', role: 'Designer UX/UI', avatar: 'PH', manager: 'Danilo Nogueira' },
    { id: '5', name: 'Juliana Ferreira', role: 'Analista Financeiro', avatar: 'JF', manager: 'Danilo Nogueira' }
  ];

  // Perguntas de Autoavaliação
  const autoavaliacaoQuestions = {
    bloco1: {
      title: "Entregas e Performance",
      icon: Target,
      questions: [
        "Eu entrego minhas tarefas dentro do prazo e com qualidade.",
        "Eu sou proativo e busco soluções antes de ser solicitado.",
        "Eu mantenho um bom nível de produtividade, mesmo em situações de pressão.",
        "Meus resultados ajudam a equipe a alcançar seus objetivos."
      ]
    },
    bloco2: {
      title: "Comportamentos e Soft Skills",
      icon: Heart,
      questions: [
        "Eu colaboro com colegas e ajudo quando posso.",
        "Eu me comunico de forma clara e respeitosa.",
        "Eu aceito e aplico feedbacks no meu dia a dia.",
        "Eu ajo com responsabilidade e ética em todas as situações."
      ]
    },
    bloco3: {
      title: "Potencial e Desenvolvimento",
      icon: Brain,
      questions: [
        "Eu busco aprender coisas novas e me desenvolver constantemente.",
        "Eu tenho interesse em assumir responsabilidades maiores.",
        "Eu consigo ver além das minhas tarefas e pensar estrategicamente.",
        "Eu consigo influenciar positivamente as pessoas ao meu redor."
      ]
    }
  };

  const autoavaliacaoOpenQuestions = [
    "Qual foi sua maior conquista nos últimos meses?",
    "Qual habilidade você mais gostaria de desenvolver neste momento?",
    "Como você acredita que poderia contribuir mais para o time?"
  ];

  // Perguntas sobre o Gestor
  const gestorAvaliacaoQuestions = {
    bloco1: {
      title: "Liderança e Suporte",
      icon: Shield,
      questions: [
        "Meu gestor acompanha meu desenvolvimento e dá feedbacks regulares.",
        "Meu gestor é justo nas decisões e na distribuição das tarefas.",
        "Meu gestor confia em mim e me dá autonomia para trabalhar.",
        "Sinto que posso contar com meu gestor quando preciso."
      ]
    },
    bloco2: {
      title: "Comunicação e Ambiente",
      icon: MessageSquare,
      questions: [
        "Meu gestor se comunica com clareza e escuta minhas ideias.",
        "O ambiente do time é saudável e colaborativo sob a liderança dele.",
        "Meu gestor respeita a diversidade e promove um ambiente seguro."
      ]
    },
    bloco3: {
      title: "Desenvolvimento e Inspiração",
      icon: TrendingUp,
      questions: [
        "Meu gestor estimula o aprendizado e o crescimento profissional.",
        "Meu gestor dá exemplo com suas atitudes e decisões.",
        "Eu gostaria de continuar trabalhando com esse gestor no futuro."
      ]
    }
  };

  const gestorOpenQuestions = [
    "O que esse gestor faz bem e deveria continuar fazendo?",
    "Que sugestão você daria para ele melhorar ainda mais sua liderança?"
  ];

  const scaleLabels = [
    "Discordo Totalmente",
    "Discordo Parcialmente", 
    "Neutro",
    "Concordo Parcialmente",
    "Concordo Totalmente"
  ];

  const handleAutoavaliacaoAnswer = (questionIndex: number, value: number) => {
    setAutoavaliacaoAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const handleGestorAvaliacaoAnswer = (questionIndex: number, value: number) => {
    setGestorAvaliacaoAnswers(prev => ({
      ...prev,
      [questionIndex]: value
    }));
  };

  const handleOpenAnswer = (questionKey: string, value: string) => {
    setOpenAnswers(prev => ({
      ...prev,
      [questionKey]: value
    }));
  };

  const getTotalQuestions = () => {
    if (selectedView === 'funcionario') {
      const autoQuestions = Object.values(autoavaliacaoQuestions).reduce((sum, bloco) => sum + bloco.questions.length, 0);
      const gestorQuestions = Object.values(gestorAvaliacaoQuestions).reduce((sum, bloco) => sum + bloco.questions.length, 0);
      return autoQuestions + gestorQuestions + autoavaliacaoOpenQuestions.length + gestorOpenQuestions.length;
    } else {
      // Para gestor avaliando funcionário (implementar no futuro)
      return 0;
    }
  };

  const getAnsweredQuestions = () => {
    if (selectedView === 'funcionario') {
      const autoAnswered = Object.keys(autoavaliacaoAnswers).length;
      const gestorAnswered = Object.keys(gestorAvaliacaoAnswers).length;
      const openAnswered = Object.keys(openAnswers).length;
      return autoAnswered + gestorAnswered + openAnswered;
    }
    return 0;
  };

  const handleSubmit = () => {
    const totalQuestions = getTotalQuestions();
    const answeredQuestions = getAnsweredQuestions();
    
    if (answeredQuestions === totalQuestions) {
      setShowResults(true);
    } else {
      alert(`Por favor, responda todas as ${totalQuestions} perguntas antes de enviar.`);
    }
  };

  const resetForm = () => {
    setAutoavaliacaoAnswers({});
    setGestorAvaliacaoAnswers({});
    setOpenAnswers({});
    setSelectedEmployee('');
    setShowResults(false);
  };

  const selectedEmployeeData = employees.find(emp => emp.id === selectedEmployee);
  const totalQuestions = getTotalQuestions();
  const answeredQuestions = getAnsweredQuestions();
  const progressPercentage = totalQuestions > 0 ? Math.round((answeredQuestions / totalQuestions) * 100) : 0;

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
          <Award className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-black text-gray-900">
            Avaliação 360° 🎯
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Avaliação completa com visão do funcionário e do gestor para desenvolvimento integral
        </p>
      </motion.div>

      {!showResults ? (
        <>
          {/* View Selector */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tipo de Avaliação</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedView('funcionario')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedView === 'funcionario'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <User className="w-6 h-6" />
                  <h4 className="font-bold text-lg">Visão do Funcionário</h4>
                </div>
                <p className="text-sm text-left">
                  O funcionário avalia a si mesmo e também avalia seu gestor direto
                </p>
                <div className="mt-3 text-xs font-semibold">
                  • Autoavaliação (12 perguntas + 3 abertas)
                  <br />
                  • Avaliação do gestor (10 perguntas + 2 abertas)
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedView('gestor')}
                className={`p-6 rounded-xl border-2 transition-all ${
                  selectedView === 'gestor'
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="w-6 h-6" />
                  <h4 className="font-bold text-lg">Visão do Gestor</h4>
                </div>
                <p className="text-sm text-left">
                  O gestor avalia a si mesmo e também avalia um funcionário específico
                </p>
                <div className="mt-3 text-xs font-semibold text-gray-500">
                  🚧 Em desenvolvimento
                  <br />
                  Disponível em breve
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Employee Selection - Only for Funcionário view */}
          {selectedView === 'funcionario' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
            >
              <div className="flex items-center space-x-3 mb-4">
                <User className="w-6 h-6 text-orange-500" />
                <h3 className="text-xl font-bold text-gray-900">Seleção do Funcionário</h3>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Funcionário que será avaliado
                  </label>
                  <select
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Selecione um funcionário</option>
                    {employees.map(emp => (
                      <option key={emp.id} value={emp.id}>
                        {emp.name} - {emp.role}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedEmployee && selectedEmployeeData && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-orange-50 rounded-xl p-4 border border-orange-200"
                  >
                    <h4 className="font-semibold text-gray-900 mb-3">Funcionário Selecionado</h4>
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                        {selectedEmployeeData.avatar}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">{selectedEmployeeData.name}</div>
                        <div className="text-sm text-gray-600">{selectedEmployeeData.role}</div>
                        <div className="text-xs text-gray-500">Gestor: {selectedEmployeeData.manager}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Progress Indicator */}
          {selectedEmployee && selectedView === 'funcionario' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Progresso da Avaliação</h3>
                <span className="text-sm text-gray-600">
                  {answeredQuestions}/{totalQuestions} perguntas respondidas
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                />
              </div>
              <div className="text-center mt-2 text-sm font-semibold text-orange-600">
                {progressPercentage}% concluído
              </div>
            </motion.div>
          )}

          {/* Autoavaliação Section */}
          {selectedEmployee && selectedView === 'funcionario' && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Autoavaliação</h3>
                    <p className="text-sm text-gray-600">Avalie seu próprio desempenho e comportamentos</p>
                  </div>
                </div>

                {Object.entries(autoavaliacaoQuestions).map(([blocoKey, bloco], blocoIndex) => (
                  <motion.div
                    key={blocoKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: blocoIndex * 0.1 + 0.4 }}
                    className="mb-8"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <bloco.icon className="w-5 h-5 text-orange-500" />
                      <h4 className="text-lg font-bold text-gray-900">Bloco {blocoIndex + 1} - {bloco.title}</h4>
                    </div>

                    <div className="space-y-6">
                      {bloco.questions.map((question, questionIndex) => {
                        const globalIndex = Object.values(autoavaliacaoQuestions)
                          .slice(0, blocoIndex)
                          .reduce((sum, b) => sum + b.questions.length, 0) + questionIndex;

                        return (
                          <div key={globalIndex} className="border-b border-gray-200 pb-4">
                            <p className="font-semibold text-gray-900 mb-3">{question}</p>
                            <div className="grid grid-cols-5 gap-2">
                              {scaleLabels.map((label, value) => (
                                <button
                                  key={value}
                                  onClick={() => handleAutoavaliacaoAnswer(globalIndex, value + 1)}
                                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                                    autoavaliacaoAnswers[globalIndex] === value + 1
                                      ? 'bg-orange-500 text-white shadow-lg'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  <div className="text-xs mb-1">{value + 1}</div>
                                  <div className="text-xs leading-tight">{label}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}

                {/* Perguntas Abertas - Autoavaliação */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mt-8"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-orange-500" />
                    <h4 className="text-lg font-bold text-gray-900">Perguntas Reflexivas</h4>
                  </div>

                  <div className="space-y-6">
                    {autoavaliacaoOpenQuestions.map((question, index) => (
                      <div key={`auto-open-${index}`}>
                        <label className="block font-semibold text-gray-900 mb-2">
                          {question}
                        </label>
                        <textarea
                          value={openAnswers[`auto-open-${index}`] || ''}
                          onChange={(e) => handleOpenAnswer(`auto-open-${index}`, e.target.value)}
                          rows={4}
                          placeholder="Compartilhe seus pensamentos..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Avaliação do Gestor Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Avaliação do Gestor</h3>
                    <p className="text-sm text-gray-600">
                      Avalie seu gestor direto: <strong>{selectedEmployeeData?.manager}</strong>
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 bg-purple-100 px-3 py-1 rounded-lg">
                    <Eye className="w-4 h-4 text-purple-600" />
                    <span className="text-xs font-semibold text-purple-600">Confidencial</span>
                  </div>
                </div>

                {Object.entries(gestorAvaliacaoQuestions).map(([blocoKey, bloco], blocoIndex) => (
                  <motion.div
                    key={blocoKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: blocoIndex * 0.1 + 0.9 }}
                    className="mb-8"
                  >
                    <div className="flex items-center space-x-2 mb-4">
                      <bloco.icon className="w-5 h-5 text-purple-500" />
                      <h4 className="text-lg font-bold text-gray-900">Bloco {blocoIndex + 1} - {bloco.title}</h4>
                    </div>

                    <div className="space-y-6">
                      {bloco.questions.map((question, questionIndex) => {
                        const globalIndex = Object.values(gestorAvaliacaoQuestions)
                          .slice(0, blocoIndex)
                          .reduce((sum, b) => sum + b.questions.length, 0) + questionIndex;

                        return (
                          <div key={globalIndex} className="border-b border-gray-200 pb-4">
                            <p className="font-semibold text-gray-900 mb-3">{question}</p>
                            <div className="grid grid-cols-5 gap-2">
                              {scaleLabels.map((label, value) => (
                                <button
                                  key={value}
                                  onClick={() => handleGestorAvaliacaoAnswer(globalIndex, value + 1)}
                                  className={`p-3 rounded-lg text-sm font-medium transition-all ${
                                    gestorAvaliacaoAnswers[globalIndex] === value + 1
                                      ? 'bg-purple-500 text-white shadow-lg'
                                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  <div className="text-xs mb-1">{value + 1}</div>
                                  <div className="text-xs leading-tight">{label}</div>
                                </button>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}

                {/* Perguntas Abertas - Gestor */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="mt-8"
                >
                  <div className="flex items-center space-x-2 mb-4">
                    <MessageSquare className="w-5 h-5 text-purple-500" />
                    <h4 className="text-lg font-bold text-gray-900">Feedback sobre Liderança</h4>
                  </div>

                  <div className="space-y-6">
                    {gestorOpenQuestions.map((question, index) => (
                      <div key={`gestor-open-${index}`}>
                        <label className="block font-semibold text-gray-900 mb-2">
                          {question}
                        </label>
                        <textarea
                          value={openAnswers[`gestor-open-${index}`] || ''}
                          onChange={(e) => handleOpenAnswer(`gestor-open-${index}`, e.target.value)}
                          rows={4}
                          placeholder="Compartilhe seu feedback..."
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-vertical"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.3 }}
                className="flex space-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmit}
                  disabled={progressPercentage < 100}
                  className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-5 h-5" />
                  <span>Enviar Avaliação 360°</span>
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

          {/* Gestor View - Coming Soon */}
          {selectedView === 'gestor' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-12 border border-gray-200/30 shadow-lg text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visão do Gestor</h3>
              <p className="text-gray-600 text-lg mb-6">
                Esta funcionalidade está em desenvolvimento e estará disponível em breve.
              </p>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-900 mb-2">🚀 Em breve você poderá:</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Avaliar seus próprios comportamentos de liderança</li>
                  <li>• Avaliar o desempenho de funcionários específicos</li>
                  <li>• Receber insights da IA sobre sua equipe</li>
                  <li>• Comparar autoavaliações com avaliações dos funcionários</li>
                </ul>
              </div>
            </motion.div>
          )}
        </>
      ) : (
        /* Results Section */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/30 shadow-lg text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Avaliação 360° Concluída!</h3>
          <p className="text-gray-600 text-lg mb-6">
            Sua avaliação foi enviada com sucesso. Os resultados serão processados pela IA e estarão disponíveis em breve.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-green-900 mb-2">✅ Próximos passos:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Análise automática dos dados pela IA</li>
              <li>• Geração de insights personalizados</li>
              <li>• Criação de plano de desenvolvimento</li>
              <li>• Notificação quando os resultados estiverem prontos</li>
            </ul>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetForm}
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg mx-auto"
          >
            <RotateCcw className="w-5 h-5" />
            <span>Nova Avaliação</span>
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Avaliacao360;