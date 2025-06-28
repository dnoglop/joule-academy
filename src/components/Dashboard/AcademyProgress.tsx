import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Play, BookOpen, TrendingUp } from 'lucide-react';

const AcademyProgress: React.FC = () => {
  const progressData = [
    { month: 'Jan', value: 45 },
    { month: 'Fev', value: 52 },
    { month: 'Mar', value: 61 },
    { month: 'Abr', value: 68 },
    { month: 'Mai', value: 75 },
    { month: 'Jun', value: 82 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
          <GraduationCap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Academia</h3>
          <p className="text-sm text-gray-600">Progresso nos cursos</p>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="relative h-32 mb-6 bg-gradient-to-r from-purple-50 to-orange-50 rounded-lg p-4">
        <svg className="w-full h-full" viewBox="0 0 300 80">
          <defs>
            <linearGradient id="academyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          
          {/* Line Chart */}
          <polyline
            fill="none"
            stroke="url(#academyGradient)"
            strokeWidth="3"
            points={progressData.map((point, index) => 
              `${(index * 50) + 25},${80 - (point.value * 0.8)}`
            ).join(' ')}
          />
          
          {/* Data Points */}
          {progressData.map((point, index) => (
            <motion.circle
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 }}
              cx={(index * 50) + 25}
              cy={80 - (point.value * 0.8)}
              r="4"
              fill="#F59E0B"
              className="drop-shadow-sm"
            />
          ))}
        </svg>
        
        <div className="absolute bottom-1 left-0 right-0 flex justify-between text-xs text-gray-500 px-4">
          {progressData.map((point, index) => (
            <span key={index}>{point.month}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-black text-purple-600">82%</div>
          <div className="text-xs text-gray-600">Conclusão Média</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-black text-orange-600">156</div>
          <div className="text-xs text-gray-600">Horas Estudadas</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white py-3 rounded-lg font-medium shadow-lg"
        >
          <Play className="w-4 h-4" />
          <span>Continuar Aprendendo</span>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-200 transition-all"
        >
          <BookOpen className="w-4 h-4" />
          <span>Explorar Cursos</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AcademyProgress;