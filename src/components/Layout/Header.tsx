import React from 'react';
import { Bell, Search, LogOut } from 'lucide-react'; // Adicionado o ícone LogOut
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Importe o seu hook de autenticação
import { showToast } from '../../utils/toast'; // Para feedback visual

const Header = () => {
  // A chamada do hook agora está DENTRO do componente, como manda a regra.
  const navigate = useNavigate();
  
  // Pegamos a função de logout e os dados do perfil do nosso contexto global.
  const { signOut, profile } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut(); // Chama a função de logout real do Supabase.
      showToast.success('Você saiu com segurança.');
      // O onAuthStateChange no AuthProvider vai detectar o logout.
      // A navegação para '/login' pode ser tratada pelo ProtectedRoute ou aqui.
      navigate('/login');
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      showToast.error("Não foi possível sair. Tente novamente.");
    }
  };
  
  // Função para pegar as iniciais do nome do usuário.
  const getInitials = (name: string | null | undefined) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg border-b border-gray-200/30 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-screen-2xl mx-auto">
        <div 
          onClick={() => navigate('/dashboard')} 
          className="text-2xl font-black bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform cursor-pointer"
        >
          JOULE ACADEMY
        </div>

        <div className="flex items-center space-x-6">
          {/* Barra de Busca (sem alterações) */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input type="text" placeholder="Buscar..."
              className="pl-10 pr-4 py-2 w-64 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-lg"
            />
          </div>
          
          {/* Ícone de Notificações (sem alterações) */}
          <button className="relative hover:scale-110 transition-transform text-gray-600">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
              3
            </span>
          </button>

          {/* Perfil do Usuário com dados dinâmicos */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-sm font-bold text-white">
              {getInitials(profile?.full_name)}
            </div>
            <div className='text-right'>
              <span className="font-semibold text-gray-900 block">{profile?.full_name}</span>
              <span className="text-sm text-gray-600">{profile?.position}</span>
            </div>
          </div>
          
          {/* Botão de Sair com ícone */}
          <button
            onClick={handleSignOut}
            className="flex items-center space-x-2 bg-red-50 text-red-600 px-4 py-2 rounded-lg cursor-pointer hover:bg-red-100 font-semibold transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;