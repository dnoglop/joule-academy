import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Grid3X3, Brain, Target, Calendar, Download, Play, ChevronRight, MapPin, TrendingUp } from 'lucide-react';

const Team: React.FC = () => {
  const [selectedCell, setSelectedCell] = useState(5); // Middle-right cell (Médio Desempenho / Alto Potencial)
  const [selectedEmployee, setSelectedEmployee] = useState({
    name: 'Danilo Nogueira',
    role: 'Coordenador de Projetos',
    avatar: 'DN',
    performance: 7.2,
    potential: 8.5,
    pdiProgress: 65
  });

  const nineBoxLabels = [
    'Alto Desempenho\nBaixo Potencial',
    'Alto Desempenho\nMédio Potencial', 
    'Alto Desempenho\nAlto Potencial',
    'Médio Desempenho\nBaixo Potencial',
    'Médio Desempenho\nMédio Potencial',
    'Médio Desempenho\nAlto Potencial',
    'Baixo Desempenho\nBaixo Potencial',
    'Baixo Desempenho\nMédio Potencial',
    'Baixo Desempenho\nAlto Potencial'
  ];

  const pdiTimeline = [
    {
      title: 'Liderança Situacional',
      description: 'Desenvolver competências de liderança adaptativa através do programa "Líder 360°". Inclui mentoria individual, workshops práticos e projeto piloto de gestão de equipe.',
      recommendation: 'Assista "Liderança Situacional na Prática" na Academia Joule',
      duration: '3 meses',
      priority: 'high'
    },
    {
      title: 'Gestão Estratégica de Projetos',
      description: 'Certificação PMP e aplicação prática em projeto estratégico da organização. Foco em metodologias ágeis e gestão de stakeholders complexos.',
      recommendation: 'Veja "Gestão Ágil de Projetos" e "Stakeholder Management" na Academia Joule',
      duration: '4 meses',
      priority: 'high'
    },
    {
      title: 'Comunicação Executiva',
      description: 'Desenvolver habilidades de comunicação para audiências executivas. Inclui apresentações, storytelling e influência sem autoridade formal.',
      recommendation: 'Assista "Comunicação Executiva e Storytelling" na Academia Joule',
      duration: '2 meses',
      priority: 'medium'
    },
    {
      title: 'Inteligência Emocional',
      description: 'Fortalecimento da inteligência emocional para liderança efetiva. Autoconhecimento, empatia, regulação emocional e habilidades sociais.',
      recommendation: 'Explore "Inteligência Emocional no Trabalho" na Academia Joule',
      duration: '6 semanas',
      priority: 'medium'
    },
    {
      title: 'Inovação & Design Thinking',
      description: 'Metodologias de inovação aplicadas ao contexto de ONGs. Criação de soluções criativas para desafios sociais complexos.',
      recommendation: 'Veja "Design Thinking para ONGs" na Academia Joule',
      duration: '5 semanas',
      priority: 'low'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Alta Prioridade';
      case 'medium': return 'Média Prioridade';
      case 'low': return 'Baixa Prioridade';
      default: return 'Prioridade';
    }
  };

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
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
          <span className="text-orange-500 cursor-pointer hover:underline">Dashboard</span>
          <ChevronRight className="w-4 h-4" />
          <span>Plano de Desenvolvimento Individual</span>
        </div>
        <div className="flex items-center space-x-3 mb-2">
          <Users className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-black text-gray-900">
            Análise 9Box & PDI Personalizado
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Desenvolvido com Inteligência Artificial para seu crescimento profissional
        </p>
      </motion.div>

      {/* 9Box Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* 9Box Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Grid3X3 className="w-6 h-6 text-orange-500" />
            <h3 className="text-xl font-bold text-gray-900">Matriz 9Box - Posicionamento Atual</h3>
          </div>

          <div className="grid grid-cols-3 grid-rows-3 gap-1 bg-gray-200 rounded-xl overflow-hidden h-96 mb-4">
            {nineBoxLabels.map((label, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedCell(index)}
                className={`
                  bg-white flex items-center justify-center cursor-pointer transition-all duration-300 p-2
                  text-xs font-semibold text-center leading-tight
                  ${selectedCell === index 
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' 
                    : 'hover:bg-orange-50'
                  }
                `}
              >
                {label.split('\n').map((line, lineIndex) => (
                  <div key={lineIndex}>{line}</div>
                ))}
                {selectedCell === index && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute"
                  >
                    <MapPin className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 text-center">
            <div>
              <div className="font-semibold text-gray-900 mb-1">← Desempenho →</div>
              <div>Baixo ← → Alto</div>
            </div>
            <div>
              <div className="font-semibold text-gray-900 mb-1">← Potencial →</div>
              <div>Baixo ← → Alto</div>
            </div>
          </div>
        </motion.div>

        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg text-center"
        >
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="w-24 h-24 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-black mx-auto mb-4 shadow-lg"
          >
            {selectedEmployee.avatar}
          </motion.div>
          
          <h3 className="text-xl font-black text-gray-900 mb-2">{selectedEmployee.name}</h3>
          <p className="text-gray-600 mb-6">{selectedEmployee.role}</p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="text-xl font-black text-orange-600">{selectedEmployee.performance}</div>
              <div className="text-xs text-gray-600 font-semibold">Desempenho</div>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-xl border border-orange-200">
              <div className="text-xl font-black text-orange-600">{selectedEmployee.potential}</div>
              <div className="text-xs text-gray-600 font-semibold">Potencial</div>
            </div>
          </div>

          <div className="bg-orange-50 rounded-xl p-4">
            <div className="w-full h-2 bg-orange-200 rounded-full overflow-hidden mb-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${selectedEmployee.pdiProgress}%` }}
                transition={{ delay: 0.5, duration: 1 }}
                className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
              />
            </div>
            <div className="text-sm text-gray-600">{selectedEmployee.pdiProgress}% do PDI concluído</div>
          </div>
        </motion.div>
      </div>

      {/* AI Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg relative"
        >
          <div className="absolute -top-3 right-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Brain className="w-3 h-3" />
            <span>IA Analysis</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4">Análise de Perfil</h3>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p><strong>Posicionamento:</strong> Você está no quadrante "Médio Desempenho / Alto Potencial", conhecido como <em>\"Talento Emergente"</em>.</p>
            
            <div>
              <strong>Características identificadas:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Demonstra alta capacidade de aprendizagem</li>
                <li>Apresenta potencial para crescimento rápido</li>
                <li>Necessita de desenvolvimento em competências específicas</li>
                <li>Motivação elevada para novos desafios</li>
              </ul>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg relative"
        >
          <div className="absolute -top-3 right-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
            <Target className="w-3 h-3" />
            <span>IA Recommendations</span>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-4">Recomendações Estratégicas</h3>
          <div className="text-gray-700 leading-relaxed space-y-3">
            <p><strong>Foco prioritário:</strong> Desenvolvimento acelerado para maximizar o alto potencial identificado.</p>
            
            <div>
              <strong>Ações recomendadas:</strong>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                <li>Mentoria especializada em liderança</li>
                <li>Projetos desafiadores com autonomia</li>
                <li>Certificações em gestão estratégica</li>
                <li>Networking com líderes seniores</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>

      {/* PDI Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
      >
        <div className="flex items-center space-x-3 mb-6">
          <Target className="w-6 h-6 text-orange-500" />
          <h3 className="text-xl font-bold text-gray-900">Plano de Desenvolvimento Personalizado (PDI)</h3>
        </div>

        <div className="relative pl-8">
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 to-orange-600"></div>
          
          {pdiTimeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="relative mb-8 bg-white rounded-xl p-6 border-l-4 border-orange-500 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="absolute -left-10 top-6 w-4 h-4 bg-orange-500 rounded-full border-3 border-white shadow-sm"></div>
              
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-bold text-gray-900">{item.title}</h4>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-orange-600">{item.duration}</span>
                  <span className={`px-2 py-1 rounded-md text-xs font-semibold ${getPriorityColor(item.priority)}`}>
                    {getPriorityLabel(item.priority)}
                  </span>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-4">{item.description}</p>
              
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-purple-700">
                  <Play className="w-4 h-4" />
                  <span className="text-sm font-semibold">Recomendado:</span>
                </div>
                <p className="text-sm text-purple-600 mt-1">{item.recommendation}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-wrap gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          <Play className="w-5 h-5" />
          <span>Iniciar PDI</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          <Brain className="w-5 h-5" />
          <span>Refinar com IA</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-white/10 text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition-all"
        >
          <Calendar className="w-5 h-5" />
          <span>Agendar Mentoria</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-2 bg-white/10 text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition-all"
        >
          <Download className="w-5 h-5" />
          <span>Exportar PDF</span>
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Team;