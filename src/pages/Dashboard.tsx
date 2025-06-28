import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Users, Target, Award, Activity, Brain, Zap, Play, BookOpen, UserPlus, FileText, Trophy, UserCheck, PlusCircle } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';
import { GlowingEffect } from '../components/UI/GlowingEffect';

const Dashboard: React.FC = () => {
  const progressData = [
    { name: 'Concluídos', value: 142, color: '#10B981' },
    { name: 'Em Progresso', value: 38, color: '#F59E0B' },
    { name: 'Atrasados', value: 12, color: '#EF4444' }
  ];

  const learningData = [
    { month: 'Jan', value: 20 },
    { month: 'Fev', value: 35 },
    { month: 'Mar', value: 45 },
    { month: 'Abr', value: 60 },
    { month: 'Mai', value: 75 },
    { month: 'Jun', value: 85 }
  ];

  const topPerformers = [
    { name: 'Ana Maria', progress: 95, avatar: 'AM', medal: '🥇' },
    { name: 'Carlos Silva', progress: 88, avatar: 'CS', medal: '🥈' }
  ];

  const recentActivities = [
    {
      icon: UserCheck,
      title: 'Ana Maria completou módulo "Gestão de Projetos"',
      time: 'há 2 horas'
    },
    {
      icon: PlusCircle,
      title: 'Novo colaborador Pedro Santos adicionado',
      time: 'há 4 horas'
    },
    {
      icon: Brain,
      title: 'PDI gerado por IA para 3 colaboradores',
      time: 'há 1 dia'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-2">
          <Rocket className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-black text-gray-900">
            Dashboard do Instituto Joule 🚀
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Gerencie o desenvolvimento da sua equipe e acompanhe o progresso dos PDIs
        </p>
      </motion.div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        
        {/* Team Overview Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -4 }}
          className="relative bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg overflow-hidden"
        >
          <GlowingEffect
            proximity={100}
            spread={30}
            variant="orange"
            borderWidth={2}
            movementDuration={1.5}
          />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Visão Geral da Equipe</h3>
                <p className="text-sm text-gray-600">Status atual dos colaboradores</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white/30 rounded-xl border border-white/20">
                <div className="text-2xl font-black text-gray-900">24</div>
                <div className="text-xs text-gray-600 font-semibold">Total Colaboradores</div>
              </div>
              <div className="text-center p-4 bg-white/30 rounded-xl border border-white/20">
                <div className="text-2xl font-black text-gray-900">18</div>
                <div className="text-xs text-gray-600 font-semibold">PDIs Ativos</div>
              </div>
              <div className="text-center p-4 bg-white/30 rounded-xl border border-white/20">
                <div className="text-2xl font-black text-gray-900">6</div>
                <div className="text-xs text-gray-600 font-semibold">Pendentes</div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-4xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent mb-2">
                75%
              </div>
              <div className="w-full h-2 bg-orange-100 rounded-full overflow-hidden mb-3">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
                />
              </div>
              <p className="text-sm text-gray-600">Engajamento médio da equipe nos PDIs</p>
            </div>

            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg"
              >
                <Users className="w-4 h-4" />
                <span>Ver Equipe</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 bg-white/10 text-gray-700 px-4 py-3 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Novo Colaborador</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* PDI Progress Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          whileHover={{ y: -4 }}
          className="relative bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg overflow-hidden"
        >
          <GlowingEffect
            proximity={100}
            spread={30}
            variant="orange"
            borderWidth={2}
            movementDuration={1.5}
          />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Progresso dos PDIs</h3>
                <p className="text-sm text-gray-600">Junho 2025</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-white/30 rounded-xl border border-white/20">
                <div className="text-2xl font-black text-green-600">142</div>
                <div className="text-xs text-gray-600 font-semibold">Concluídos</div>
              </div>
              <div className="text-center p-4 bg-white/30 rounded-xl border border-white/20">
                <div className="text-2xl font-black text-orange-600">38</div>
                <div className="text-xs text-gray-600 font-semibold">Em Progresso</div>
              </div>
              <div className="text-center p-4 bg-white/30 rounded-xl border border-white/20">
                <div className="text-2xl font-black text-red-600">12</div>
                <div className="text-xs text-gray-600 font-semibold">Atrasados</div>
              </div>
            </div>

            <div className="h-48 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Top Performers */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          whileHover={{ y: -4 }}
          className="relative bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg overflow-hidden"
        >
          <GlowingEffect
            proximity={100}
            spread={30}
            variant="orange"
            borderWidth={2}
            movementDuration={1.5}
          />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Top Performers</h3>
                <p className="text-sm text-gray-600">Melhores evoluções do mês</p>
              </div>
            </div>

            <div className="space-y-3 mb-6">
              {topPerformers.map((performer, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center space-x-3 p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold">
                    {performer.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{performer.name}</div>
                    <div className="text-xs text-gray-600">{performer.progress}% PDI concluído</div>
                  </div>
                  <div className="text-lg">{performer.medal}</div>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold shadow-lg"
            >
              <Trophy className="w-4 h-4" />
              <span>Ver Ranking</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          whileHover={{ y: -4 }}
          className="relative bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg overflow-hidden"
        >
          <GlowingEffect
            proximity={100}
            spread={30}
            variant="orange"
            borderWidth={2}
            movementDuration={1.5}
          />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Atividade Recente</h3>
                <p className="text-sm text-gray-600">Últimas ações</p>
              </div>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.4 }}
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50/50 rounded-lg transition-all"
                >
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white">
                    <activity.icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900 mb-1">{activity.title}</div>
                    <div className="text-xs text-gray-600">{activity.time}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Learning Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -4 }}
          className="relative bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg overflow-hidden"
        >
          <GlowingEffect
            proximity={100}
            spread={30}
            variant="orange"
            borderWidth={2}
            movementDuration={1.5}
          />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Academia</h3>
                <p className="text-sm text-gray-600">Progresso nos cursos</p>
              </div>
            </div>

            <div className="h-48 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={learningData}>
                  <XAxis 
                    dataKey="month" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: '#6B7280' }}
                  />
                  <YAxis hide />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#F59E0B" 
                    strokeWidth={3}
                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#F59E0B', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-lg font-semibold shadow-lg"
              >
                <Play className="w-4 h-4" />
                <span>Continuar Aprendendo</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-2 bg-white/10 text-gray-700 px-4 py-3 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explorar Cursos</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          whileHover={{ y: -4 }}
          className="relative bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg overflow-hidden"
        >
          <GlowingEffect
            proximity={100}
            spread={30}
            variant="orange"
            borderWidth={2}
            movementDuration={1.5}
          />
          
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Ações Rápidas</h3>
                <p className="text-sm text-gray-600">Acesso direto</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center space-y-2 bg-white/10 text-gray-700 p-4 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                <UserPlus className="w-5 h-5" />
                <span className="text-sm">Novo Colaborador</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center space-y-2 bg-white/10 text-gray-700 p-4 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                <Brain className="w-5 h-5" />
                <span className="text-sm">Gerar PDI com IA</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center space-y-2 bg-white/10 text-gray-700 p-4 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                <Play className="w-5 h-5" />
                <span className="text-sm">Academia Joule</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex flex-col items-center justify-center space-y-2 bg-white/10 text-gray-700 p-4 rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                <FileText className="w-5 h-5" />
                <span className="text-sm">Relatórios</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default Dashboard;