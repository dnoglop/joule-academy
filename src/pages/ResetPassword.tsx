import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  Rocket,
  Shield,
  AlertCircle,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const passwordRequirements = [
    { text: 'Pelo menos 8 caracteres', test: (pwd: string) => pwd.length >= 8 },
    { text: 'Uma letra maiúscula', test: (pwd: string) => /[A-Z]/.test(pwd) },
    { text: 'Uma letra minúscula', test: (pwd: string) => /[a-z]/.test(pwd) },
    { text: 'Um número', test: (pwd: string) => /\d/.test(pwd) },
    { text: 'Um caractere especial', test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
  ];

  const validatePassword = () => {
    const newErrors: string[] = [];
    
    if (!password) {
      newErrors.push('Nova senha é obrigatória');
    } else {
      passwordRequirements.forEach(req => {
        if (!req.test(password)) {
          newErrors.push(req.text);
        }
      });
    }
    
    if (!confirmPassword) {
      newErrors.push('Confirmação de senha é obrigatória');
    } else if (password !== confirmPassword) {
      newErrors.push('As senhas não coincidem');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) {
      return;
    }
    
    setIsLoading(true);

    // Simulate password reset
    setTimeout(() => {
      setIsSuccess(true);
      setIsLoading(false);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-purple-50/30 flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md"
        >
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/30 shadow-xl text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Senha Redefinida! 🎉
            </h2>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              Sua senha foi alterada com sucesso. Agora você pode fazer login 
              com sua nova senha.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-green-900">Segurança</span>
              </div>
              <p className="text-sm text-green-700">
                Por segurança, você foi desconectado de todos os dispositivos. 
                Faça login novamente para acessar sua conta.
              </p>
            </div>

            <Link
              to="/login"
              className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all text-center"
            >
              Fazer Login
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-purple-50/30 flex">
      {/* Left Side - Form */}
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
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200/30 shadow-xl"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Redefinir Senha 🔐
              </h2>
              <p className="text-gray-600">
                Crie uma nova senha segura para sua conta
              </p>
            </div>

            {errors.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm font-semibold text-red-900">Corrija os seguintes erros:</span>
                </div>
                <ul className="text-sm text-red-700 space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nova senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua nova senha"
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

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmar nova senha
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme sua nova senha"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Password Requirements */}
              {password && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">Requisitos da senha:</h4>
                  <div className="space-y-2">
                    {passwordRequirements.map((req, index) => {
                      const isValid = req.test(password);
                      return (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                            isValid ? 'bg-green-500' : 'bg-gray-300'
                          }`}>
                            {isValid && <Check className="w-3 h-3 text-white" />}
                          </div>
                          <span className={`text-sm ${
                            isValid ? 'text-green-700' : 'text-gray-600'
                          }`}>
                            {req.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}

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
                    <Lock className="w-5 h-5" />
                    <span>Redefinir Senha</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Footer Links */}
          <div className="text-center mt-6 space-y-2">
            <Link
              to="/login"
              className="text-gray-600 hover:text-orange-600 text-sm font-medium transition-colors"
            >
              Voltar ao Login
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Right Side - Security Info */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-orange-500 to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-center max-w-lg"
          >
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <Shield className="w-12 h-12" />
            </div>
            
            <h2 className="text-4xl font-black mb-6">
              Senha Segura,
              <br />
              Conta Protegida
            </h2>
            
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Uma senha forte é sua primeira linha de defesa. Siga nossas 
              recomendações para manter sua conta segura.
            </p>

            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-white/90">Use uma combinação única</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-white/90">Evite informações pessoais</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-white/90">Não reutilize senhas antigas</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-white/90">Mantenha-a confidencial</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-20 right-20 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm"
        />
        <motion.div
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute bottom-20 left-20 w-24 h-24 bg-white/10 rounded-full backdrop-blur-sm"
        />
      </div>
    </div>
  );
};

export default ResetPassword;