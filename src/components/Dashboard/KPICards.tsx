import React from 'react';
import { motion } from 'framer-motion';
import { Users, Target, CheckCircle, Clock, TrendingUp, UserPlus } from 'lucide-react';

const KPICards: React.FC = () => {
  const kpis = [
    {
      title: 'Visão Geral da Equipe',
      subtitle: 'Status atual dos colaboradores',
      metrics: [
        { label: 'Total Colaboradores', value: '24', icon: Users },
        { label: 'PDIs Ativos', value: '18', icon: Target },
        { label: 'Pendentes', value: '6', icon: Clock }
      ],
      engagement: { value: 75, label: 'Engajamento médio da equipe nos PDIs' },
      actions: [
        { label: 'Ver Equipe', primary: true },
        { label: 'Novo Colaborador', icon: UserPlus }
      ]
    },
    {
      title: 'Progresso dos PDIs',
      subtitle: 'Junho 2025',
      metrics: [
        { label: 'Concluídos', value: '142', color: 'text-green-600' },
        { label: 'Em Progresso', value: '38', color: 'text-orange-600' },
        { label: 'Atrasados', value: '12', color: 'text-red-600' }
      ],
      chart: true
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {kpis.map((kpi, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -4, boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)' }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          {/* Header */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg">
              {index === 0 ? <Users className="w-5 h-5 text-white" /> : <Target className="w-5 h-5 text-white" />}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">{kpi.title}</h3>
              <p className="text-sm text-gray-600">{kpi.subtitle}</p>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {kpi.metrics.map((metric, metricIndex) => (
              <motion.div
                key={metricIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 + metricIndex * 0.05 }}
                className="text-center"
              >
                <div className={`text-2xl font-black ${metric.color || 'text-gray-900'}`}>
                  {metric.value}
                </div>
                <div className="text-xs text-gray-600 font-medium">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Chart or Engagement */}
          {kpi.chart ? (
            <div className="mb-6">
              <div className="relative h-24 bg-gradient-to-r from-orange-100 to-purple-100 rounded-lg p-4">
                <svg className="w-full h-full" viewBox="0 0 200 60">
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#F59E0B" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                  <circle cx="100" cy="30" r="25" fill="none" stroke="#E5E7EB" strokeWidth="8"/>
                  <circle 
                    cx="100" 
                    cy="30" 
                    r="25" 
                    fill="none" 
                    stroke="url(#chartGradient)" 
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 25 * 0.74} ${2 * Math.PI * 25}`}
                    strokeDashoffset="0"
                    transform="rotate(-90 100 30)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-700">74%</span>
                </div>
              </div>
            </div>
          ) : (
            kpi.engagement && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-3xl font-black text-orange-500">{kpi.engagement.value}%</span>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${kpi.engagement.value}%` }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                  />
                </div>
                <p className="text-xs text-gray-600">{kpi.engagement.label}</p>
              </div>
            )
          )}

          {/* Actions */}
          {kpi.actions && (
            <div className="flex space-x-3">
              {kpi.actions.map((action, actionIndex) => (
                <motion.button
                  key={actionIndex}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    action.primary
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {action.icon && <action.icon className="w-4 h-4" />}
                  <span className="text-sm">{action.label}</span>
                </motion.button>
              ))}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default KPICards;