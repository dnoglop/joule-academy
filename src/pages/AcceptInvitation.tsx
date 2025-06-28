import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from '../utils/toast';

const AcceptInvitation: React.FC = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user, userProfile, loading: authLoading, updatePassword } = useAuth();
  const navigate = useNavigate();

  // Debug logs
  useEffect(() => {
    console.log('AcceptInvitation - Auth loading:', authLoading);
    console.log('AcceptInvitation - User:', user);
    console.log('AcceptInvitation - User Profile:', userProfile);
    console.log('AcceptInvitation - Current URL:', window.location.href);
  }, [authLoading, user, userProfile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('Submitting password update...');

    if (password.length < 6) {
      showToast.error('A senha deve ter no mínimo 6 caracteres.');
      setLoading(false);
      return;
    }

    try {
      const { error } = await updatePassword(password);

      if (error) {
        console.error('Password update error:', error);
        showToast.error(error.message);
      } else {
        console.log('Password updated successfully');
        showToast.success('Senha definida com sucesso! Bem-vindo(a)!');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      showToast.error('Erro inesperado. Tente novamente.');
    }
    
    setLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p>Verificando convite...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-700 mb-4">Erro no Convite</h2>
          <p className="text-gray-600 mb-6">
            Link de convite inválido ou expirado. Por favor, peça um novo convite.
          </p>
          <button 
            onClick={() => navigate('/login')} 
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Voltar para o Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
          Defina sua Senha de Acesso
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Olá, {userProfile?.full_name || user.email}! Defina sua senha para acessar o sistema.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Nova Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Crie uma senha forte (mín. 6 caracteres)"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
              minLength={6}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold disabled:opacity-50 hover:bg-orange-600 transition-colors"
          >
            {loading ? 'Salvando...' : 'Salvar e Acessar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AcceptInvitation;