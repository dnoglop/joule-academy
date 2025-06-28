import React from 'react';
import { motion } from 'framer-motion';
import { Award, Trophy } from 'lucide-react';

const TopPerformers: React.FC = () => {
  const performers = [
    {
      name: 'Ana Maria',
      role: 'Coordenadora de Projetos',
      progress: 95,
      avatar: 'AM',
      badge: 'gold'
    },
    {
      name: 'Carlos Silva',
      role: 'Analista de Marketing',
      progress: 88,
      avatar: 'CS',
      badge: 'silver'
    },
    {
      name: 'Marina Costa',
      role: 'Gestora de Captação',
      progress: 85,
      avatar: 'MC',
      badge: 'bronze'
    },
    {
      name: 'Pedro Santos',
      role: 'Designer UX/UI',
      progress: 82,
      avatar: 'PS',
      badge: null
    }
  ];

  const getBadgeColor = (badge: string | null) => {
    switch (badge) {
      case 'gold': return 'from-yellow-400 to-yellow-600';
      case 'silver': return 'from-gray-300 to-gray-500';
      case 'bronze': return 'from-orange-400 to-orange-600';
      default: return 'from-gray-200 to-gray-300';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg h-full"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">Top Performers</h3>
            <p className="text-sm text-gray-600">Melhores evoluções do mês</p>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg"
        >
          <Trophy className="w-4 h-4 inline mr-2" />
          Ver Ranking
        </motion.button>
      </div>

      <div className="space-y-4">
        {performers.map((performer, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ x: 4 }}
            className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50/50 transition-all cursor-pointer"
          >
            <div className="relative">
              <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getBadgeColor(performer.badge)} flex items-center justify-center text-white font-bold`}>
                {performer.avatar}
              </div>
              {performer.badge && (
                <div className="absolute -top-1 -right-1 w-5 h-5">
                  <Trophy className={`w-full h-full ${
                    performer.badge === 'gold' ? 'text-yellow-500' :
                    performer.badge === 'silver' ? 'text-gray-400' :
                    'text-orange-500'
                  }`} />
                </div>
              )}
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-semibold text-gray-900">{performer.name}</h4>
                <span className="text-sm font-bold text-gray-700">{performer.progress}%</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">{performer.role}</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${performer.progress}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                  className="bg-gradient-to-r from-orange-500 to-purple-600 h-2 rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default TopPerformers;