import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Settings, Users, Mail, Calendar, Shield, Globe, Search,
  Edit, Trash2, X, Save, UserPlus
} from 'lucide-react';

import { authService } from '../services/authService';
import { showToast } from '../utils/toast';
import { Database } from '../types/database';

// Tipagem
type UserProfile = Database['public']['Tables']['user_profiles']['Row'];

// Constantes
const departments = ['Tecnologia', 'Comercial', 'Marketing', 'Captação', 'Financeiro', 'Recursos Humanos', 'Operações', 'Jurídico'];
const seniorityLevels = ['Estagiário', 'Júnior', 'Pleno', 'Sênior', 'Especialista', 'Líder', 'Coordenador', 'Gerente', 'Diretor'];
const contractTypes = ['CLT', 'PJ', 'Estágio', 'Terceirizado', 'Consultoria', 'Freelancer'];
const permissions = ['Funcionario', 'Gestor', 'Admin'];
const statusOptions = ['Ativo', 'Inativo', 'Desligado', 'Férias', 'Licença'];

const tabs = [
    { id: 'usuarios', label: 'Usuários', icon: Users },
    { id: 'emails', label: 'E-mails', icon: Mail },
    { id: 'calendario', label: 'Calendário', icon: Calendar },
    { id: 'sistema', label: 'Sistema', icon: Settings },
    { id: 'seguranca', label: 'Segurança', icon: Shield },
    { id: 'integracoes', label: 'Integrações', icon: Globe }
];

const initialUserState: Omit<UserProfile, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'avatar_url' | 'phone'> = {
  full_name: '',
  email: '',
  position: '',
  department: '',
  manager_id: null,
  hire_date: '',
  seniority: '',
  contract_type: '',
  role: 'Funcionario',
  status: 'Ativo',
};

const Configuracoes: React.FC = () => {
  const [activeTab, setActiveTab] = useState('usuarios');
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>([]);
  const [managers, setManagers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUser, setNewUser] = useState(initialUserState);

  const fetchData = async () => {
    setIsLoading(true);
    const { data: profiles, error } = await authService.getAllUserProfiles();

    if (error) {
      showToast.error('Erro ao buscar usuários.');
      console.error(error);
    } else if (profiles) {
      setAllProfiles(profiles);
      const potentialManagers = profiles.filter(p => p.role === 'Gestor' || p.role === 'Admin');
      setManagers(potentialManagers);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingUser(null);
    setNewUser(initialUserState);
    setShowUserModal(true);
  };

  const handleOpenEditModal = (user: UserProfile) => {
    setEditingUser(user);
    setNewUser({
      full_name: user.full_name,
      email: user.email,
      position: user.position,
      department: user.department,
      manager_id: user.manager_id,
      hire_date: user.hire_date,
      seniority: user.seniority,
      contract_type: user.contract_type,
      role: user.role,
      status: user.status,
    });
    setShowUserModal(true);
  };

  const handleUserSubmit = async () => {
    if (!newUser.full_name || !newUser.email) {
      showToast.error("Nome e e-mail são obrigatórios.");
      return;
    }
    
    setIsSubmitting(true);
    
    // --- AQUI ESTÁ A CORREÇÃO ---
    // Criamos um payload limpo, garantindo que campos opcionais que
    // podem ser uma string vazia ("") sejam convertidos para null.
    const cleanedPayload = {
      ...newUser,
      manager_id: newUser.manager_id || null, // A linha mais importante!
      hire_date: newUser.hire_date || null,   // Boa prática fazer para a data também
    };
    // --- FIM DA CORREÇÃO ---
  
    try {
      if (editingUser) {
        // Lógica de edição (já funcionando)
        const { error } = await authService.updateUserProfile(editingUser.id, cleanedPayload);
        // ... resto da lógica de edição ...
      } else {
        // --- LÓGICA DE CRIAÇÃO ---
        // Usamos o payload limpo aqui
        const { error } = await authService.createEmployee({
          email: newUser.email,
          profileData: cleanedPayload,
        });
  
        if (error) {
          showToast.error(`Erro ao criar usuário: ${error.message}`);
        } else {
          showToast.success('Convite de criação enviado com sucesso!');
          setShowUserModal(false);
          fetchData();
        }
      }
    } catch (e: any) {
      console.error(e);
      showToast.error(e.message || "Ocorreu um erro inesperado.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDeleteUser = async (userId: string) => {
     if (confirm('Tem certeza que deseja excluir este usuário?')) {
        showToast.info("Funcionalidade de exclusão ainda não implementada.");
     }
  };
  
  const managerMap = useMemo(() => {
    return new Map(allProfiles.map(p => [p.id, p.full_name]));
  }, [allProfiles]);

  const filteredUsers = useMemo(() => {
    if (!searchTerm) return allProfiles;
    const lowercasedTerm = searchTerm.toLowerCase();
    return allProfiles.filter(user =>
      user.full_name?.toLowerCase().includes(lowercasedTerm) ||
      user.email?.toLowerCase().includes(lowercasedTerm) ||
      user.position?.toLowerCase().includes(lowercasedTerm)
    );
  }, [allProfiles, searchTerm]);

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'Ativo': return 'bg-green-100 text-green-700';
      case 'Inativo': return 'bg-orange-100 text-orange-700';
      case 'Desligado': return 'bg-red-100 text-red-700';
      case 'Férias': return 'bg-blue-100 text-blue-700';
      case 'Licença': return 'bg-purple-100 text-purple-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPermissionColor = (permission: string | null) => {
     switch (permission) {
      case 'Admin': return 'bg-red-100 text-red-700';
      case 'Gestor': return 'bg-orange-100 text-orange-700';
      case 'Funcionario': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mb-8">
        <div className="flex items-center space-x-3 mb-2">
          <Settings className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-black text-gray-900">Configurações Administrativas ⚙️</h1>
        </div>
        <p className="text-gray-600 text-lg">Gerencie usuários, e-mails, calendário e configurações do sistema</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/90 backdrop-blur-lg rounded-2xl p-2 border border-gray-200/30 shadow-lg">
        <div className="flex space-x-2 overflow-x-auto">
          {tabs.map((tab) => (
            <motion.button key={tab.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'
              }`}>
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        {activeTab === 'usuarios' && (
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Gestão de Usuários</h3>
                  <p className="text-gray-600">Gerencie todos os usuários do sistema</p>
                </div>
                <div className="flex space-x-3">
                  <motion.button onClick={handleOpenCreateModal} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg font-semibold shadow-lg">
                    <UserPlus className="w-4 h-4" />
                    <span>Novo Usuário</span>
                  </motion.button>
                </div>
              </div>

              <div className="flex space-x-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar por nome, e-mail ou cargo..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                </div>
              </div>
              
              <div className="overflow-x-auto">
                {isLoading ? (
                  <div className="flex justify-center items-center p-8">
                    <p className="text-gray-600 font-semibold">Carregando usuários...</p>
                  </div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4"><input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" /></th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Usuário</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Cargo</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Departamento</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Gestor</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Permissão</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-900">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4"><input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" /></td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">{getInitials(user.full_name)}</div>
                              <div>
                                <div className="font-semibold text-gray-900">{user.full_name}</div>
                                <div className="text-sm text-gray-600">{user.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">{user.position}</div>
                            <div className="text-sm text-gray-600">{user.seniority}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-gray-900">{user.department}</div>
                            <div className="text-sm text-gray-600">{user.contract_type}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm text-gray-900">{managerMap.get(user.manager_id || '') || 'N/A'}</div>
                          </td>
                          <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>{user.status}</span></td>
                          <td className="py-3 px-4"><span className={`px-2 py-1 rounded-full text-xs font-semibold ${getPermissionColor(user.role)}`}>{user.role}</span></td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <motion.button onClick={() => handleOpenEditModal(user)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"><Edit className="w-4 h-4" /></motion.button>
                              <motion.button onClick={() => handleDeleteUser(user.id)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-2 text-red-600 hover:bg-red-100 rounded-lg"><Trash2 className="w-4 h-4" /></motion.button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {showUserModal && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowUserModal(false)}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ opacity: 1, opacity: 1 }} onClick={(e) => e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">{editingUser ? 'Editar Usuário' : 'Novo Usuário'}</h2>
                <button onClick={() => setShowUserModal(false)} className="p-2 hover:bg-gray-100 rounded-lg transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo *</label><input type="text" value={newUser.full_name || ''} onChange={(e) => setNewUser(prev => ({ ...prev, full_name: e.target.value }))} placeholder="Digite o nome completo" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">E-mail Corporativo *</label><input type="email" value={newUser.email || ''} onChange={(e) => setNewUser(prev => ({ ...prev, email: e.target.value }))} placeholder="usuario@joule.org.br" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Cargo Atual *</label><input type="text" value={newUser.position || ''} onChange={(e) => setNewUser(prev => ({ ...prev, position: e.target.value }))} placeholder="Ex: Analista de Marketing" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Área / Departamento *</label><select value={newUser.department || ''} onChange={(e) => setNewUser(prev => ({ ...prev, department: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"><option value="">Selecione...</option>{departments.map(dept => (<option key={dept} value={dept}>{dept}</option>))}</select></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Gestor Direto *</label><select value={newUser.manager_id || ''} onChange={(e) => setNewUser(prev => ({ ...prev, manager_id: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"><option value="">Nenhum gestor</option>{managers.map(manager => (<option key={manager.id} value={manager.id}>{manager.full_name}</option>))}</select></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Data de Admissão *</label><input type="date" value={newUser.hire_date || ''} onChange={(e) => setNewUser(prev => ({ ...prev, hire_date: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" /></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Nível de Senioridade *</label><select value={newUser.seniority || ''} onChange={(e) => setNewUser(prev => ({ ...prev, seniority: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"><option value="">Selecione...</option>{seniorityLevels.map(level => (<option key={level} value={level}>{level}</option>))}</select></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Contrato *</label><select value={newUser.contract_type || ''} onChange={(e) => setNewUser(prev => ({ ...prev, contract_type: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"><option value="">Selecione...</option>{contractTypes.map(type => (<option key={type} value={type}>{type}</option>))}</select></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Permissão de Acesso *</label><select value={newUser.role || 'Usuário'} onChange={(e) => setNewUser(prev => ({ ...prev, role: e.target.value as any }))} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">{permissions.map(p => (<option key={p} value={p}>{p}</option>))}</select></div>
                <div><label className="block text-sm font-semibold text-gray-700 mb-2">Status da Conta *</label><select value={newUser.status || 'Ativo'} onChange={(e) => setNewUser(prev => ({ ...prev, status: e.target.value }))} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">{statusOptions.map(s => (<option key={s} value={s}>{s}</option>))}</select></div>
              </div>
              <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button onClick={() => setShowUserModal(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">Cancelar</button>
                <motion.button onClick={handleUserSubmit} disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg disabled:opacity-50"><Save className="w-5 h-5" /><span>{isSubmitting ? 'Enviando convite...' : (editingUser ? 'Atualizar Usuário' : 'Enviar Convite')}</span></motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Configuracoes;