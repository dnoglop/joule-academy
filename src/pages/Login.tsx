import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Rocket, 
  ArrowRight,
  Shield,
  Brain,
  Users,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate login process
    setTimeout(() => {
      if (email === 'admin@joule.com' && password === 'admin123') {
        // Redirect to dashboard
        window.location.href = '/dashboard';
      } else {
        setError('E-mail ou senha incorretos. Tente novamente.');
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-purple-50/30 flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center space-x-3 mb-4"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <div className="text-3xl font-black bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                INSTITUTO JOULE
              </div>
            </motion.div>
            <p className="text-gray-600">
              Acesse sua plataforma de desenvolvimento
            </p>
          </div>

          {/* Login Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/30 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Bem-vindo de volta, time Joule! 👋
            </h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-center space-x-2"
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-700 text-sm">{error}</span>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  E-mail corporativo
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu.email@joule.com"
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Lembrar de mim</span>
                </label>
                <Link
                  to="/esqueci-senha"
                  className="text-sm text-orange-600 hover:text-orange-700 font-semibold transition-colors"
                >
                  Esqueci minha senha
                </Link>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
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

            {/* Demo Credentials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
            >
              <h4 className="font-semibold text-blue-900 mb-2">🚀 Acesso Demo</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>E-mail:</strong> admin@joule.com</p>
                <p><strong>Senha:</strong> admin123</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Footer Links */}
          <div className="text-center mt-6 space-y-2">
            <Link
              to="/"
              className="text-gray-600 hover:text-orange-600 text-sm font-medium transition-colors"
            >
              ← Voltar para página inicial
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Branding */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-orange-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-lg"
          >
            <h2 className="text-4xl font-black mb-6">
              Vamos Continuar
              <br />
              Nossa Jornada!
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Sua evolução profissional é o que nos permite impactar ainda mais jovens 
              através das nossas <strong>mentorias gratuitas</strong> em todo o Brasil.
            </p>

            <div className="grid grid-cols-1 gap-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Brain className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold">IA Personalizada</h4>
                  <p className="text-white/80 text-sm">Desenvolvimento único para cada pessoa</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold">Time Unido</h4>
                  <p className="text-white/80 text-sm">Crescemos juntos para impactar mais</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold">Impacto Social</h4>
                  <p className="text-white/80 text-sm">15.000+ jovens já impactados</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm"
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm"
        />
      </div>
    </div>
  );
};

export default Login;