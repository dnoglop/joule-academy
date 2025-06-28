import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  Users, 
  Mail, 
  Calendar, 
  Shield, 
  Globe, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  X, 
  Save, 
  Download, 
  Upload, 
  Eye, 
  EyeOff, 
  Check, 
  AlertTriangle, 
  Clock, 
  MapPin, 
  Phone, 
  Video, 
  MessageSquare,
  Brain,
  Database,
  Lock,
  Zap,
  BarChart3,
  FileText,
  Smartphone,
  Wifi,
  HardDrive,
  Activity,
  UserPlus,
  Send,
  Filter,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Pause
} from 'lucide-react';

const Configuracoes: React.FC = () => {
  const [activeTab, setActiveTab] = useState('usuarios');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [emailTemplate, setEmailTemplate] = useState('welcome');
  const [emailMessage, setEmailMessage] = useState('');

  // Mock data
  const users = [
    {
      id: '1',
      name: 'Ana Maria Silva',
      email: 'ana.silva@joule.org.br',
      role: 'Coordenadora de Projetos',
      department: 'Tecnologia',
      manager: 'Danilo Nogueira',
      admissionDate: '2023-01-15',
      seniority: 'Sênior',
      contractType: 'CLT',
      location: 'São Paulo - SP',
      permission: 'Usuário',
      status: 'Ativo',
      avatar: 'AM',
      pdiProgress: 95,
      lastLogin: '2 horas atrás'
    },
    {
      id: '2',
      name: 'Carlos Eduardo Santos',
      email: 'carlos.santos@joule.org.br',
      role: 'Analista de Marketing',
      department: 'Comercial',
      manager: 'Danilo Nogueira',
      admissionDate: '2022-08-20',
      seniority: 'Pleno',
      contractType: 'CLT',
      location: 'Rio de Janeiro - RJ',
      permission: 'Usuário',
      status: 'Ativo',
      avatar: 'CS',
      pdiProgress: 88,
      lastLogin: '1 dia atrás'
    },
    {
      id: '3',
      name: 'Marina Costa Lima',
      email: 'marina.lima@joule.org.br',
      role: 'Gestora de Captação',
      department: 'Captação',
      manager: 'Danilo Nogueira',
      admissionDate: '2021-03-10',
      seniority: 'Sênior',
      contractType: 'CLT',
      location: 'Brasília - DF',
      permission: 'Gestor',
      status: 'Ativo',
      avatar: 'MC',
      pdiProgress: 72,
      lastLogin: '3 horas atrás'
    },
    {
      id: '4',
      name: 'Pedro Henrique Oliveira',
      email: 'pedro.oliveira@joule.org.br',
      role: 'Designer UX/UI',
      department: 'Tecnologia',
      manager: 'Ana Maria Silva',
      admissionDate: '2023-06-01',
      seniority: 'Júnior',
      contractType: 'PJ',
      location: 'Remoto',
      permission: 'Usuário',
      status: 'Inativo',
      avatar: 'PH',
      pdiProgress: 45,
      lastLogin: '1 semana atrás'
    },
    {
      id: '5',
      name: 'Juliana Ferreira',
      email: 'juliana.ferreira@joule.org.br',
      role: 'Analista Financeiro',
      department: 'Financeiro',
      manager: 'Danilo Nogueira',
      admissionDate: '2022-11-15',
      seniority: 'Pleno',
      contractType: 'CLT',
      location: 'São Paulo - SP',
      permission: 'Usuário',
      status: 'Desligado',
      avatar: 'JF',
      pdiProgress: 100,
      lastLogin: '2 meses atrás'
    }
  ];

  const managers = [
    { id: '1', name: 'Danilo Nogueira', role: 'Diretor Executivo' },
    { id: '2', name: 'Ana Maria Silva', role: 'Coordenadora de Projetos' },
    { id: '3', name: 'Marina Costa Lima', role: 'Gestora de Captação' }
  ];

  const departments = [
    'Tecnologia',
    'Comercial',
    'Marketing',
    'Captação',
    'Financeiro',
    'Recursos Humanos',
    'Operações',
    'Jurídico'
  ];

  const seniorityLevels = [
    'Estagiário',
    'Júnior',
    'Pleno',
    'Sênior',
    'Especialista',
    'Líder',
    'Coordenador',
    'Gerente',
    'Diretor'
  ];

  const contractTypes = [
    'CLT',
    'PJ',
    'Estágio',
    'Terceirizado',
    'Consultoria',
    'Freelancer'
  ];

  const locations = [
    'São Paulo - SP',
    'Rio de Janeiro - RJ',
    'Brasília - DF',
    'Belo Horizonte - MG',
    'Salvador - BA',
    'Recife - PE',
    'Porto Alegre - RS',
    'Remoto',
    'Híbrido'
  ];

  const permissions = [
    'Usuário',
    'Gestor',
    'Admin'
  ];

  const statusOptions = [
    'Ativo',
    'Inativo',
    'Desligado',
    'Férias',
    'Licença'
  ];

  const emailTemplates = [
    { id: 'welcome', name: 'Boas-vindas', subject: 'Bem-vindo(a) ao Instituto Joule!' },
    { id: 'pdi_reminder', name: 'Lembrete PDI', subject: 'Lembrete: Complete seu PDI' },
    { id: 'training', name: 'Novo Treinamento', subject: 'Novo treinamento disponível' },
    { id: 'evaluation', name: 'Avaliação 360°', subject: 'Sua avaliação 360° está disponível' },
    { id: 'custom', name: 'Personalizado', subject: 'Assunto personalizado' }
  ];

  const meetings = [
    {
      id: '1',
      title: '1:1 com Ana Maria',
      participant: 'Ana Maria Silva',
      date: '2025-01-15',
      time: '14:00',
      duration: 60,
      type: 'Online',
      status: 'Confirmado'
    },
    {
      id: '2',
      title: 'Feedback Carlos',
      participant: 'Carlos Eduardo Santos',
      date: '2025-01-16',
      time: '10:30',
      duration: 45,
      type: 'Presencial',
      status: 'Pendente'
    },
    {
      id: '3',
      title: 'Revisão PDI Marina',
      participant: 'Marina Costa Lima',
      date: '2025-01-17',
      time: '16:00',
      duration: 90,
      type: 'Online',
      status: 'Confirmado'
    }
  ];

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    manager: '',
    admissionDate: '',
    seniority: '',
    contractType: '',
    location: '',
    permission: 'Usuário',
    status: 'Ativo',
    tempPassword: ''
  });

  const [newMeeting, setNewMeeting] = useState({
    participant: '',
    date: '',
    time: '',
    duration: 60,
    type: 'Online',
    agenda: ''
  });

  const tabs = [
    { id: 'usuarios', label: 'Usuários', icon: Users },
    { id: 'emails', label: 'E-mails', icon: Mail },
    { id: 'calendario', label: 'Calendário', icon: Calendar },
    { id: 'sistema', label: 'Sistema', icon: Settings },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'integracoes', label: 'Integrações', icon: Globe }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUserSubmit = () => {
    if (editingUser) {
      alert('✅ Usuário atualizado com sucesso!');
    } else {
      alert('✅ Novo usuário criado com sucesso!');
    }
    setShowUserModal(false);
    setEditingUser(null);
    setNewUser({
      name: '',
      email: '',
      role: '',
      department: '',
      manager: '',
      admissionDate: '',
      seniority: '',
      contractType: '',
      location: '',
      permission: 'Usuário',
      status: 'Ativo',
      tempPassword: ''
    });
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      manager: user.manager,
      admissionDate: user.admissionDate,
      seniority: user.seniority,
      contractType: user.contractType,
      location: user.location,
      permission: user.permission,
      status: user.status,
      tempPassword: ''
    });
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      alert('✅ Usuário excluído com sucesso!');
    }
  };

  const handleSendEmail = () => {
    const recipients = selectedUsers.length > 0 ? selectedUsers.length : users.length;
    alert(`📧 E-mail enviado para ${recipients} usuário(s) com sucesso!`);
    setShowEmailModal(false);
    setSelectedUsers([]);
    setEmailMessage('');
  };

  const handleScheduleMeeting = () => {
    alert('📅 Reunião agendada com sucesso!');
    setShowCalendarModal(false);
    setNewMeeting({
      participant: '',
      date: '',
      time: '',
      duration: 60,
      type: 'Online',
      agenda: ''
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-700';
      case 'Inativo': return 'bg-orange-100 text-orange-700';
      case 'Desligado': return 'bg-red-100 text-red-700';
      case 'Férias': return 'bg-blue-100 text-blue-700';
      case 'Licença': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPermissionColor = (permission: string) => {
    switch (permission) {
      case 'Admin': return 'bg-red-100 text-red-700';
      case 'Gestor': return 'bg-orange-100 text-orange-700';
      case 'Usuário': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const generateTempPassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < 8; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewUser(prev => ({ ...prev, tempPassword: password }));
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
        className="mb-8"
      >
        <div className="flex items-center space-x-3 mb-2">
          <Settings className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-black text-gray-900">
            Configurações Administrativas ⚙️
          </h1>
        </div>
        <p className="text-gray-600 text-lg">
          Gerencie usuários, e-mails, calendário e configurações do sistema
        </p>
      </motion.div>

      {/* Tabs Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/90 backdrop-blur-lg rounded-2xl p-2 border border-gray-200/30 shadow-lg"
      >
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {/* Usuários Tab */}
        {activeTab === 'usuarios' && (
          <div className="space-y-6">
            {/* Users Header */}
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Gestão de Usuários</h3>
                  <p className="text-gray-600">Gerencie todos os usuários do sistema</p>
                </div>
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEmailModal(true)}
                    disabled={selectedUsers.length === 0}
                    className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    <span>E-mail Selecionados ({selectedUsers.length})</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowUserModal(true)}
                    className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Novo Usuário</span>
                  </motion.button>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="flex space-x-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar por nome, e-mail ou cargo..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option>Todos os departamentos</option>
                  {departments.map(dept => (
                    <option key={dept}>{dept}</option>
                  ))}
                </select>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                  <option>Todos os status</option>
                  {statusOptions.map(status => (
                    <option key={status}>{status}</option>
                  ))}
                </select>
              </div>

              {/* Users Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(filteredUsers.map(u => u.id));
                            } else {
                              setSelectedUsers([]);
                            }
                          }}
                          className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                        />
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Usuário</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Cargo</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Departamento</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Gestor</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Permissão</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">PDI</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers(prev => [...prev, user.id]);
                              } else {
                                setSelectedUsers(prev => prev.filter(id => id !== user.id));
                              }
                            }}
                            className="rounded border-gray-300 text-orange-500 focus:ring-orange-500"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {user.avatar}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-600">{user.email}</div>
                              <div className="text-xs text-gray-500">{user.lastLogin}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{user.role}</div>
                          <div className="text-sm text-gray-600">{user.seniority}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-gray-900">{user.department}</div>
                          <div className="text-sm text-gray-600">{user.contractType}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-900">{user.manager}</div>
                          <div className="text-xs text-gray-600">{user.location}</div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPermissionColor(user.permission)}`}>
                            {user.permission}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-orange-500 to-orange-600 h-2 rounded-full"
                              style={{ width: `${user.pdiProgress}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-600 mt-1">{user.pdiProgress}%</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleEditUser(user)}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                            >
                              <Edit className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteUser(user.id)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* E-mails Tab */}
        {activeTab === 'emails' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Email Stats */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Estatísticas de E-mail</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Enviados este mês</span>
                    <span className="font-bold text-gray-900">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taxa de abertura</span>
                    <span className="font-bold text-green-600">89%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Taxa de clique</span>
                    <span className="font-bold text-blue-600">67%</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Ações Rápidas</h3>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowEmailModal(true)}
                    className="w-full flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-lg font-semibold"
                  >
                    <Mail className="w-4 h-4" />
                    <span>E-mail para Todos</span>
                  </motion.button>
                  <button className="w-full flex items-center space-x-2 bg-gray-100 text-gray-700 p-3 rounded-lg font-semibold hover:bg-gray-200">
                    <Download className="w-4 h-4" />
                    <span>Exportar Lista</span>
                  </button>
                </div>
              </div>

              {/* Recent Emails */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">E-mails Recentes</h3>
                <div className="space-y-3">
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">Lembrete PDI</div>
                    <div className="text-gray-600">Para 12 usuários • há 2 horas</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">Novo Treinamento</div>
                    <div className="text-gray-600">Para todos • há 1 dia</div>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-900">Boas-vindas</div>
                    <div className="text-gray-600">Para Pedro • há 3 dias</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Calendário Tab */}
        {activeTab === 'calendario' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Calendar Integration */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Sincronização Google Calendar</h3>
                  <div className="flex items-center space-x-2 bg-green-100 px-3 py-1 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-600">Conectado</span>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Sua conta está sincronizada com o Google Calendar. Todas as reuniões agendadas aparecerão automaticamente.
                </p>
                <div className="space-y-3">
                  <button className="w-full flex items-center space-x-2 bg-blue-500 text-white p-3 rounded-lg font-semibold">
                    <Calendar className="w-4 h-4" />
                    <span>Abrir Google Calendar</span>
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowCalendarModal(true)}
                    className="w-full flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white p-3 rounded-lg font-semibold"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Agendar 1:1</span>
                  </motion.button>
                </div>
              </div>

              {/* Upcoming Meetings */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Próximas Reuniões</h3>
                <div className="space-y-4">
                  {meetings.map((meeting) => (
                    <div key={meeting.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{meeting.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          meeting.status === 'Confirmado' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {meeting.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center space-x-2">
                          <User className="w-3 h-3" />
                          <span>{meeting.participant}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-3 h-3" />
                          <span>{meeting.date} às {meeting.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {meeting.type === 'Online' ? <Video className="w-3 h-3" /> : <MapPin className="w-3 h-3" />}
                          <span>{meeting.type} • {meeting.duration} min</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Sistema Tab */}
        {activeTab === 'sistema' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* System Info */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Informações do Sistema</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Versão</span>
                    <span className="font-semibold">v2.1.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Usuários Ativos</span>
                    <span className="font-semibold">24</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Espaço Usado</span>
                    <span className="font-semibold">2.3 GB / 10 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Último Backup</span>
                    <span className="font-semibold">Hoje às 03:00</span>
                  </div>
                </div>
              </div>

              {/* System Settings */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Configurações Gerais</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Notificações por E-mail</span>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Backup Automático</span>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Modo Manutenção</span>
                    <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Segurança Tab */}
        {activeTab === 'seguranca' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Security Settings */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Configurações de Segurança</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Autenticação de Dois Fatores</span>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Sessão Automática (30 min)</span>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Log de Auditoria</span>
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                  </div>
                </div>
              </div>

              {/* Security Logs */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Log de Eventos</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Login: ana.silva@joule.org.br</span>
                    <span className="text-gray-500">há 2h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Usuário criado: pedro.oliveira</span>
                    <span className="text-gray-500">há 1d</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Backup realizado</span>
                    <span className="text-gray-500">há 1d</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Integrações Tab */}
        {activeTab === 'integracoes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Google Workspace */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Google Workspace</h3>
                  <div className="flex items-center space-x-2 bg-green-100 px-2 py-1 rounded-lg">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-semibold text-green-600">Conectado</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">Sincronização com Gmail, Calendar e Drive</p>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold">
                  Configurar
                </button>
              </div>

              {/* Zoom */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Zoom</h3>
                  <div className="flex items-center space-x-2 bg-green-100 px-2 py-1 rounded-lg">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-semibold text-green-600">Conectado</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">Criação automática de salas para 1:1s</p>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold">
                  Configurar
                </button>
              </div>

              {/* Slack */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Slack</h3>
                  <div className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded-lg">
                    <XCircle className="w-3 h-3 text-gray-600" />
                    <span className="text-xs font-semibold text-gray-600">Desconectado</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">Notificações e lembretes automáticos</p>
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg text-sm font-semibold">
                  Conectar
                </button>
              </div>

              {/* Microsoft Teams */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">Microsoft Teams</h3>
                  <div className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded-lg">
                    <XCircle className="w-3 h-3 text-gray-600" />
                    <span className="text-xs font-semibold text-gray-600">Desconectado</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">Integração com Office 365</p>
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg text-sm font-semibold">
                  Conectar
                </button>
              </div>

              {/* WhatsApp Business */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">WhatsApp Business</h3>
                  <div className="flex items-center space-x-2 bg-gray-100 px-2 py-1 rounded-lg">
                    <XCircle className="w-3 h-3 text-gray-600" />
                    <span className="text-xs font-semibold text-gray-600">Desconectado</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">Lembretes via WhatsApp</p>
                <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg text-sm font-semibold">
                  Conectar
                </button>
              </div>

              {/* API Personalizada */}
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-900">API Personalizada</h3>
                  <div className="flex items-center space-x-2 bg-orange-100 px-2 py-1 rounded-lg">
                    <Pause className="w-3 h-3 text-orange-600" />
                    <span className="text-xs font-semibold text-orange-600">Em Desenvolvimento</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4">Integre com seus sistemas internos</p>
                <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-semibold" disabled>
                  Em Breve
                </button>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* User Modal */}
      {showUserModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowUserModal(false)}
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
                  {editingUser ? 'Editar Usuário' : 'Novo Usuário'}
                </h2>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Nome Completo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    value={newUser.name}
                    onChange={(e) => setNewUser(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Digite o nome completo"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                {/* E-mail Corporativo */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    E-mail Corporativo *
                  </label>
                  <input
                    type="email"
                    value={newUser.email}
                    onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="usuario@joule.org.br"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                {/* Cargo Atual */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Cargo Atual *
                  </label>
                  <input
                    type="text"
                    value={newUser.role}
                    onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value }))}
                    placeholder="Ex: Analista de Marketing"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                {/* Área / Departamento */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Área / Departamento *
                  </label>
                  <select
                    value={newUser.department}
                    onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Selecione o departamento</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                {/* Gestor Direto */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gestor Direto *
                  </label>
                  <select
                    value={newUser.manager}
                    onChange={(e) => setNewUser(prev => ({ ...prev, manager: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Selecione o gestor</option>
                    {managers.map(manager => (
                      <option key={manager.id} value={manager.name}>
                        {manager.name} - {manager.role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Data de Admissão */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Data de Admissão *
                  </label>
                  <input
                    type="date"
                    value={newUser.admissionDate}
                    onChange={(e) => setNewUser(prev => ({ ...prev, admissionDate: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                {/* Nível de Senioridade */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nível de Senioridade *
                  </label>
                  <select
                    value={newUser.seniority}
                    onChange={(e) => setNewUser(prev => ({ ...prev, seniority: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Selecione o nível</option>
                    {seniorityLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>

                {/* Tipo de Contrato */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Contrato *
                  </label>
                  <select
                    value={newUser.contractType}
                    onChange={(e) => setNewUser(prev => ({ ...prev, contractType: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Selecione o tipo</option>
                    {contractTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                {/* Unidade / Local de Trabalho */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Unidade / Local de Trabalho *
                  </label>
                  <select
                    value={newUser.location}
                    onChange={(e) => setNewUser(prev => ({ ...prev, location: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Selecione a localização</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Permissão de Acesso */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Permissão de Acesso *
                  </label>
                  <select
                    value={newUser.permission}
                    onChange={(e) => setNewUser(prev => ({ ...prev, permission: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {permissions.map(permission => (
                      <option key={permission} value={permission}>{permission}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Usuário: Acesso básico | Gestor: Gerencia equipe | Admin: Acesso total
                  </p>
                </div>

                {/* Status da Conta */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Status da Conta *
                  </label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser(prev => ({ ...prev, status: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                {/* Senha Temporária */}
                {!editingUser && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Senha Temporária
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newUser.tempPassword}
                        onChange={(e) => setNewUser(prev => ({ ...prev, tempPassword: e.target.value }))}
                        placeholder="Senha será gerada automaticamente"
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                      />
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={generateTempPassword}
                        className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all"
                      >
                        Gerar
                      </motion.button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      O usuário receberá esta senha por e-mail e deverá alterá-la no primeiro acesso
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleUserSubmit}
                  className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
                >
                  <Save className="w-5 h-5" />
                  <span>{editingUser ? 'Atualizar Usuário' : 'Criar Usuário'}</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Email Modal */}
      {showEmailModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowEmailModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Enviar E-mail</h2>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Destinatários
                </label>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">
                    {selectedUsers.length > 0 
                      ? `${selectedUsers.length} usuário(s) selecionado(s)`
                      : `Todos os usuários (${users.length})`
                    }
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Template
                </label>
                <select
                  value={emailTemplate}
                  onChange={(e) => setEmailTemplate(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  {emailTemplates.map(template => (
                    <option key={template.id} value={template.id}>
                      {template.name} - {template.subject}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mensagem
                </label>
                <textarea
                  value={emailMessage}
                  onChange={(e) => setEmailMessage(e.target.value)}
                  rows={8}
                  placeholder="Digite sua mensagem..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendEmail}
                  className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
                >
                  <Send className="w-5 h-5" />
                  <span>Enviar E-mail</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Calendar Modal */}
      {showCalendarModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowCalendarModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Agendar 1:1</h2>
                <button
                  onClick={() => setShowCalendarModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Participante
                </label>
                <select
                  value={newMeeting.participant}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, participant: e.target.value }))}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Selecione um colaborador</option>
                  {users.filter(u => u.status === 'Ativo').map(user => (
                    <option key={user.id} value={user.name}>
                      {user.name} - {user.role}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Data
                  </label>
                  <input
                    type="date"
                    value={newMeeting.date}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Horário
                  </label>
                  <input
                    type="time"
                    value={newMeeting.time}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, time: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duração (minutos)
                  </label>
                  <select
                    value={newMeeting.duration}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value={30}>30 minutos</option>
                    <option value={45}>45 minutos</option>
                    <option value={60}>1 hora</option>
                    <option value={90}>1h 30min</option>
                    <option value={120}>2 horas</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipo de Reunião
                  </label>
                  <select
                    value={newMeeting.type}
                    onChange={(e) => setNewMeeting(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="Online">Online (Zoom)</option>
                    <option value="Presencial">Presencial</option>
                    <option value="Telefone">Telefone</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Agenda da Reunião
                </label>
                <textarea
                  value={newMeeting.agenda}
                  onChange={(e) => setNewMeeting(prev => ({ ...prev, agenda: e.target.value }))}
                  rows={4}
                  placeholder="Tópicos a serem discutidos..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical"
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowCalendarModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleScheduleMeeting}
                  className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Agendar Reunião</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Configuracoes;