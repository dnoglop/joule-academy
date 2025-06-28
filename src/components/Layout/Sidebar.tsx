import React from 'react';
import { BarChart3, Users, GraduationCap, TrendingUp, Target, Award, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Equipe', path: '/equipe' },
    { icon: Target, label: 'Matriz 9Box', path: '/matriz' },
    { icon: GraduationCap, label: 'Academia', path: '/academia' },
    { icon: Award, label: 'Avaliação 360°', path: '/avaliacao' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
  ];

  return (
    <motion.aside 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 bg-white/80 backdrop-blur-lg border-r border-white/20 p-6"
    >
      <div className="space-y-2">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 p-4 bg-gradient-to-br from-purple-500/10 to-orange-500/10 rounded-lg border border-purple-200/30"
      >
        <h3 className="font-semibold text-gray-800 mb-2">💡 Dica da IA</h3>
        <p className="text-sm text-gray-600">
          3 colaboradores precisam de atenção especial nos seus PDIs
        </p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 text-xs bg-gradient-to-r from-orange-500 to-purple-600 text-white px-3 py-1 rounded-md"
        >
          Ver Detalhes
        </motion.button>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;