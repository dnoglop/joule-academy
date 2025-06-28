import React from 'react';
import { Bell, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 py-4 sticky top-0 z-50"
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-black bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent"
        >
          JOULE ACADEMY
        </motion.div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar colaborador..."
              className="pl-10 pr-4 py-2 w-64 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
            />
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="relative"
          >
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-2 rounded-lg cursor-pointer"
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">
              DN
            </div>
            <span className="font-medium">Diretor</span>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;