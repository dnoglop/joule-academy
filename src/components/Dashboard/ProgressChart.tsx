import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const ProgressChart: React.FC = () => {
  const data = [
    { name: 'Concluídos', value: 142, color: '#10B981' },
    { name: 'Em Progresso', value: 38, color: '#F59E0B' },
    { name: 'Atrasados', value: 12, color: '#EF4444' },
    { name: 'Pendentes', value: 6, color: '#6B7280' }
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -4 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg h-full"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg">
          <PieChart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-gray-900">Progresso dos PDIs</h3>
          <p className="text-sm text-gray-600">Distribuição atual</p>
        </div>
      </div>

      <div className="relative h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={80}
              startAngle={90}
              endAngle={450}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-black text-gray-900">{total}</div>
            <div className="text-xs text-gray-600">Total PDIs</div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm font-medium text-gray-700">{item.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-bold text-gray-900">{item.value}</span>
              <span className="text-xs text-gray-500">
                ({Math.round((item.value / total) * 100)}%)
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProgressChart;