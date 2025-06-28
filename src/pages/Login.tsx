import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { showToast } from '../utils/toast';
import { 
  Mail, Lock, Eye, EyeOff, Rocket, ArrowRight, AlertCircle
} from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Usaremos um estado específico para a mensagem de erro.
  
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // Limpa a mensagem de erro anterior a cada nova tentativa.

    // Bloco try...catch é a melhor prática para lidar com Promessas
    try {
      // A função signIn do seu AuthContext retorna um objeto { error }
      const { error } = await signIn(email, password);
      
      if (error) {
        // Se a API do Supabase retornar um erro (ex: senha errada), mostramos a mensagem.
        console.error("Supabase sign-in error:", error.message);
        setErrorMessage('E-mail ou senha incorretos. Verifique suas credenciais e tente novamente.');
        showToast.error('Falha no login.');
      } else {
        // Se não houver erro, o login foi bem-sucedido.
        showToast.success('Login realizado com sucesso!');
        navigate('/dashboard');
        // A lógica do onAuthStateChange no AuthProvider cuidará de buscar o perfil.
      }
    } catch (catchedError: any) {
      // Este catch lida com erros inesperados (ex: falha de rede).
      console.error('Unexpected login error:', catchedError);
      setErrorMessage('Ocorreu um erro inesperado. Verifique sua conexão e tente novamente.');
      showToast.error('Erro de comunicação.');
    } finally {
      // O finally SEMPRE é executado, garantindo que o botão de loading seja desativado.
      // Isso evita o travamento do botão.
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-purple-50/30 flex">
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Logo e Título (sem alterações) */}
          <div className="text-center mb-8">
             <div className="flex items-center justify-center space-x-3 mb-4">
               <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl flex items-center justify-center">
                 <Rocket className="w-7 h-7 text-white" />
               </div>
               <div className="text-3xl font-black bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                 INSTITUTO JOULE
               </div>
             </div>
             <p className="text-gray-600">
               Acesse sua plataforma de desenvolvimento
             </p>
           </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/30 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Bem-vindo de volta, time Joule! 👋
            </h2>

            {/* A mensagem de erro agora usa o estado `errorMessage` */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-2"
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 text-sm">{errorMessage}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campos de E-mail e Senha (sem alterações, exceto `required`) */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu.email@joule.com"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {/* Lembrar e Esqueci Senha (sem alterações) */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"/>
                  <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
                </label>
                <Link to="/esqueci-senha" className="text-sm text-orange-600 hover:text-orange-700 font-semibold">
                  Esqueci minha senha
                </Link>
              </div>

              {/* Botão de Submit */}
              <motion.button type="submit" disabled={isLoading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Entrar na Plataforma</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
      {/* Lado Direito da Tela (sem alterações) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-orange-500 to-purple-600 relative overflow-hidden">
        {/* ...conteúdo estático... */}
      </div>
    </div>
  );
};

export default Login;