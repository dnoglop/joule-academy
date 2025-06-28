import React from 'react';
import { motion } from 'framer-motion';
import { Zap, UserPlus, Brain, FileText, GraduationCap } from 'lucide-react';

const QuickActions: React.FC = () => {
  const actions = [
    {
      icon: UserPlus,
      label: 'Novo Colaborador',
      description: 'Adicionar nova pessoa',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Brain,
      label: 'Gerar PDI com IA',
      description: 'Criação automática',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: FileText,
      label: 'Relatórios',
      description: 'Exportar dados',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: GraduationCap,
      label: 'Academia Joule',
      description: 'Plataforma de cursos',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg h-full"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Ações Rápidas</h3>
          <p className="text-sm text-gray-600">Acesso direto</p>
        </div>
      </div>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <motion.button
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center space-x-4 p-4 rounded-lg bg-gray-50/50 hover:bg-white/60 border border-gray-100 transition-all group"
          >
            <div className={`p-3 rounded-lg bg-gradient-to-r ${action.color} shadow-lg group-hover:shadow-xl transition-shadow`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h4 className="font-semibold text-gray-900 group-hover:text-gray-800">
                {action.label}
              </h4>
              <p className="text-xs text-gray-600">{action.description}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 p-4 bg-gradient-to-br from-orange-50 to-purple-50 rounded-lg border border-orange-200/30"
      >
        <h4 className="font-semibold text-gray-800 mb-2">🤖 IA Insights</h4>
        <p className="text-sm text-gray-600 mb-3">
          A IA identificou que módulos de Comunicação precisam de atenção especial
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="w-full bg-gradient-to-r from-orange-500 to-purple-600 text-white py-2 rounded-lg text-sm font-medium"
        >
          Ver Análise Completa
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default QuickActions;