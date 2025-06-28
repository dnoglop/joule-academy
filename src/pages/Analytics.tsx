import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  CheckCircle, 
  Activity, 
  Clock, 
  Download, 
  Plus, 
  Search, 
  Filter,
  Brain,
  AlertTriangle,
  Lightbulb,
  Target,
  Eye,
  Calendar,
  Star,
  MessageCircle,
  X
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const Analytics: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('Todos os departamentos');
  const [selectedStatus, setSelectedStatus] = useState('Todos os status');
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);

  // Overview data
  const overviewData = [
    {
      title: 'Total de Colaboradores',
      value: '24',
      change: '+3 este mês',
      changeType: 'positive',
      icon: Users
    },
    {
      title: 'PDIs Concluídos',
      value: '142',
      change: '+18 este mês',
      changeType: 'positive',
      icon: CheckCircle
    },
    {
      title: 'Engajamento Médio',
      value: '87%',
      change: '+5% este mês',
      changeType: 'positive',
      icon: Activity
    },
    {
      title: 'Tempo Médio de Conclusão',
      value: '4.2',
      change: 'semanas',
      changeType: 'neutral',
      icon: Clock
    }
  ];

  // AI Insights data
  const aiInsights = [
    {
      icon: TrendingUp,
      title: 'Performance Destacada',
      text: 'Ana Maria e Carlos Silva estão 15% acima da média de conclusão de PDIs. Considere utilizá-los como mentores para os demais colaboradores.'
    },
    {
      icon: AlertTriangle,
      title: 'Atenção Necessária',
      text: '3 colaboradores estão com baixo engajamento (< 60%). Recomendamos agendar 1:1s para entender possíveis bloqueios e necessidades.'
    },
    {
      icon: Lightbulb,
      title: 'Oportunidade de Melhoria',
      text: 'Módulos de "Comunicação" têm 23% mais tempo de conclusão. Considere dividir em sessões menores ou adicionar mais exemplos práticos.'
    },
    {
      icon: Target,
      title: 'Recomendação Estratégica',
      text: 'Baseado no perfil da equipe, priorize treinamentos em "Gestão de Pessoas" e "Liderança Digital" para os próximos trimestres.'
    }
  ];

  // Chart data
  const teamEvolutionData = [
    { month: 'Jan', pdis: 15, engagement: 70 },
    { month: 'Fev', pdis: 25, engagement: 75 },
    { month: 'Mar', pdis: 42, engagement: 78 },
    { month: 'Abr', pdis: 68, engagement: 82 },
    { month: 'Mai', pdis: 95, engagement: 85 },
    { month: 'Jun', pdis: 142, engagement: 87 }
  ];

  const statusDistributionData = [
    { name: 'Ativo', value: 18, color: '#10B981' },
    { name: 'Atenção', value: 4, color: '#F59E0B' },
    { name: 'Inativo', value: 2, color: '#EF4444' }
  ];

  // Employee data
  const employees = [
    {
      id: 1,
      name: 'Ana Maria Santos',
      role: 'Gerente de Projetos',
      department: 'Tecnologia',
      avatar: 'AM',
      status: 'active',
      pdiProgress: 95,
      modules: 12,
      engagement: 98,
      activities: [
        { type: 'completed', text: 'Concluiu "Gestão de Projetos Ágeis"' },
        { type: 'in-progress', text: 'Iniciou "Liderança de Equipes Remotas"' }
      ]
    },
    {
      id: 2,
      name: 'Carlos Silva',
      role: 'Coordenador Comercial',
      department: 'Comercial',
      avatar: 'CS',
      status: 'active',
      pdiProgress: 88,
      modules: 10,
      engagement: 92,
      activities: [
        { type: 'completed', text: 'Concluiu "Técnicas de Vendas"' },
        { type: 'in-progress', text: '50% de "Negociação Avançada"' }
      ]
    },
    {
      id: 3,
      name: 'Mariana Fernandes',
      role: 'Analista de Marketing',
      department: 'Marketing',
      avatar: 'MF',
      status: 'attention',
      pdiProgress: 45,
      modules: 6,
      engagement: 58,
      activities: [
        { type: 'pending', text: 'Pausou "Marketing Digital"' },
        { type: 'pending', text: 'Sem atividade há 5 dias' }
      ]
    },
    {
      id: 4,
      name: 'Pedro Santos',
      role: 'Desenvolvedor Senior',
      department: 'Tecnologia',
      avatar: 'PS',
      status: 'active',
      pdiProgress: 72,
      modules: 8,
      engagement: 85,
      activities: [
        { type: 'completed', text: 'Concluiu "Arquitetura de Software"' },
        { type: 'in-progress', text: 'Iniciou "DevOps Fundamentals"' }
      ]
    },
    {
      id: 5,
      name: 'Julia Costa',
      role: 'Analista de RH',
      department: 'Recursos Humanos',
      avatar: 'JC',
      status: 'active',
      pdiProgress: 83,
      modules: 9,
      engagement: 91,
      activities: [
        { type: 'completed', text: 'Concluiu "Gestão de Talentos"' },
        { type: 'in-progress', text: '70% de "People Analytics"' }
      ]
    },
    {
      id: 6,
      name: 'Roberto Lima',
      role: 'Designer UX/UI',
      department: 'Tecnologia',
      avatar: 'RL',
      status: 'inactive',
      pdiProgress: 25,
      modules: 3,
      engagement: 32,
      activities: [
        { type: 'pending', text: 'Sem atividade há 3 semanas' },
        { type: 'pending', text: 'Pausou "Design Systems"' }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'attention': return 'bg-orange-100 text-orange-700';
      case 'inactive': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'attention': return 'Atenção';
      case 'inactive': return 'Inativo';
      default: return 'Desconhecido';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'completed': return 'bg-green-200 text-green-700';
      case 'in-progress': return 'bg-orange-200 text-orange-700';
      case 'pending': return 'bg-red-200 text-red-700';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'Todos os departamentos' || 
                             employee.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'Todos os status' || 
                         employee.status === selectedStatus.toLowerCase();
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const openEmployeeModal = (employee: any) => {
    setSelectedEmployee(employee);
  };

  const closeEmployeeModal = () => {
    setSelectedEmployee(null);
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
        className="flex justify-between items-start mb-8"
      >
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            <h1 className="text-3xl font-black text-gray-900">
              Analytics da Equipe
            </h1>
          </div>
          <p className="text-gray-600 text-lg">
            Acompanhe o desenvolvimento e performance de todos os colaboradores
          </p>
        </div>
        
        <div className="flex space-x-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-white/90 text-gray-700 px-6 py-3 rounded-lg font-semibold border border-gray-200 hover:bg-gray-50 transition-all shadow-lg"
          >
            <Download className="w-5 h-5" />
            <span>Exportar Relatório</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
          >
            <Plus className="w-5 h-5" />
            <span>Novo Colaborador</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -4 }}
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="text-sm font-semibold text-gray-600">{item.title}</div>
              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <item.icon className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-3xl font-black text-gray-900 mb-2">{item.value}</div>
            <div className={`flex items-center space-x-1 text-sm font-semibold ${
              item.changeType === 'positive' ? 'text-green-600' : 
              item.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {item.changeType === 'positive' && <TrendingUp className="w-4 h-4" />}
              <span>{item.change}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* AI Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Insights da IA</h2>
            <p className="text-purple-100 text-sm">Análises automatizadas baseadas em dados da equipe</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiInsights.map((insight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
              className="bg-white/10 border border-white/20 rounded-xl p-5"
            >
              <div className="flex items-center space-x-2 mb-3">
                <insight.icon className="w-4 h-4" />
                <h3 className="font-semibold">{insight.title}</h3>
              </div>
              <p className="text-sm text-purple-100 leading-relaxed">{insight.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-2 bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Evolução da Equipe</h3>
            <select className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold">
              <option>Últimos 6 meses</option>
              <option>Último ano</option>
            </select>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={teamEvolutionData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="pdis" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  name="PDIs Concluídos"
                />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  name="Engajamento (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">Distribuição por Status</h3>
          
          <div className="h-64 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  dataKey="value"
                >
                  {statusDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {statusDistributionData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                </div>
                <span className="text-sm font-bold text-gray-900">{item.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Team Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-6"
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Users className="w-6 h-6 text-orange-500" />
            <h2 className="text-2xl font-black text-gray-900">Equipe Completa</h2>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar colaborador..."
                className="pl-10 pr-4 py-2 w-64 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/50"
              />
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold"
            >
              <option>Todos os departamentos</option>
              <option>Tecnologia</option>
              <option>Comercial</option>
              <option>Marketing</option>
              <option>Recursos Humanos</option>
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-semibold"
            >
              <option>Todos os status</option>
              <option>Ativo</option>
              <option>Atenção</option>
              <option>Inativo</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredEmployees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
              whileHover={{ y: -4 }}
              onClick={() => openEmployeeModal(employee)}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-5">
                <div className="w-15 h-15 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {employee.avatar}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{employee.name}</h3>
                  <p className="text-gray-600 text-sm">{employee.role}</p>
                  <p className="text-gray-500 text-xs">{employee.department}</p>
                </div>
                <div className={`px-3 py-1 rounded-xl text-xs font-semibold ${getStatusColor(employee.status)}`}>
                  {getStatusLabel(employee.status)}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="text-center p-3 bg-white/50 rounded-xl">
                  <div className="text-xl font-black text-gray-900">{employee.pdiProgress}%</div>
                  <div className="text-xs text-gray-600 font-semibold">PDI Concluído</div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-xl">
                  <div className="text-xl font-black text-gray-900">{employee.modules}</div>
                  <div className="text-xs text-gray-600 font-semibold">Módulos</div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-xl">
                  <div className="text-xl font-black text-gray-900">{employee.engagement}%</div>
                  <div className="text-xs text-gray-600 font-semibold">Engajamento</div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold text-gray-700">Progresso Geral</span>
                  <span className="text-sm font-bold text-orange-600">{employee.pdiProgress}%</span>
                </div>
                <div className="w-full h-2 bg-orange-100 rounded-full">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-1000"
                    style={{ width: `${employee.pdiProgress}%` }}
                  />
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Atividades Recentes</h4>
                <div className="space-y-2">
                  {employee.activities.map((activity, actIndex) => (
                    <div key={actIndex} className="flex items-center space-x-2 text-xs text-gray-600">
                      <div className={`w-4 h-4 rounded flex items-center justify-center ${getActivityIcon(activity.type)}`}>
                        {activity.type === 'completed' && <CheckCircle className="w-2 h-2" />}
                        {activity.type === 'in-progress' && <Clock className="w-2 h-2" />}
                        {activity.type === 'pending' && <X className="w-2 h-2" />}
                      </div>
                      <span>{activity.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeEmployeeModal}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Detalhes - {selectedEmployee.name}
                </h2>
                <button
                  onClick={closeEmployeeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Informações Gerais</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Cargo:</strong> {selectedEmployee.role}</p>
                    <p><strong>Departamento:</strong> {selectedEmployee.department}</p>
                    <p><strong>Data de Início:</strong> Janeiro 2023</p>
                    <p><strong>Gestor:</strong> Danilo Nogueira</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Progresso PDI</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Status:</strong> Em andamento</p>
                    <p><strong>Módulos Concluídos:</strong> {selectedEmployee.modules}/15</p>
                    <p><strong>Tempo Médio por Módulo:</strong> 3.2 dias</p>
                    <p><strong>Última Atividade:</strong> Ontem</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Performance</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Engajamento:</strong> {selectedEmployee.engagement}%</p>
                    <p><strong>Avaliação Média:</strong> 4.9/5</p>
                    <p><strong>Feedbacks Positivos:</strong> 23</p>
                    <p><strong>Rank na Equipe:</strong> 1º lugar</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Próximos Passos</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Próximo Módulo:</strong> Liderança Digital</p>
                    <p><strong>Previsão de Conclusão:</strong> 15 dias</p>
                    <p><strong>Recomendação IA:</strong> Candidata a mentora</p>
                  </div>
                </div>
              </div>
              
              <div className="text-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg inline-flex"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Enviar Mensagem</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all inline-flex"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Agendar 1:1</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Analytics;