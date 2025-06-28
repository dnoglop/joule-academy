import React from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle, UserPlus, Clock } from 'lucide-react';

const RecentActivity: React.FC = () => {
  const activities = [
    {
      icon: CheckCircle,
      title: 'Ana Maria completou módulo "Gestão de Projetos"',
      time: 'há 2 horas',
      type: 'success',
      avatar: 'AM'
    },
    {
      icon: UserPlus,
      title: 'Novo colaborador Pedro Santos adicionado',
      time: 'há 4 horas',
      type: 'info',
      avatar: 'PS'
    },
    {
      icon: Clock,
      title: 'PDI gerado por IA para 3 colaboradores',
      time: 'há 1 dia',
      type: 'ai',
      avatar: '🤖'
    },
    {
      icon: CheckCircle,
      title: 'Carlos Silva finalizou avaliação 360°',
      time: 'há 2 dias',
      type: 'success',
      avatar: 'CS'
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'success': return 'text-green-600 bg-green-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      case 'ai': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Atividade Recente</h3>
          <p className="text-sm text-gray-600">Últimas ações</p>
        </div>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50/50 transition-all"
          >
            <div className={`p-2 rounded-lg ${getTypeColor(activity.type)}`}>
              <activity.icon className="w-4 h-4" />
            </div>
            
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900 mb-1">
                {activity.title}
              </p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>

            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center text-white text-xs font-bold">
              {activity.avatar}
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        className="w-full mt-4 text-center text-sm text-orange-600 hover:text-orange-700 font-medium py-2"
      >
        Ver todas as atividades →
      </motion.button>
    </motion.div>
  );
};

export default RecentActivity;