import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Heart, 
  Users, 
  Target, 
  Brain, 
  ArrowRight, 
  Star,
  Award,
  TrendingUp,
  Shield,
  Zap,
  Globe,
  Sparkles,
  UserCheck,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: Brain,
      title: "IA Personalizada",
      description: "Planos de desenvolvimento únicos para cada membro da nossa equipe"
    },
    {
      icon: Target,
      title: "Matriz 9Box",
      description: "Avaliação estratégica para posicionamento e crescimento profissional"
    },
    {
      icon: Award,
      title: "Avaliação 360°",
      description: "Feedback completo para desenvolvimento contínuo da equipe"
    },
    {
      icon: TrendingUp,
      title: "Analytics de Crescimento",
      description: "Acompanhe sua evolução e impacto na missão do Instituto"
    }
  ];

  const stats = [
    { number: "15.000+", label: "Jovens Impactados" },
    { number: "95%", label: "Engajamento da Equipe" },
    { number: "200+", label: "Horas de Desenvolvimento" },
    { number: "100%", label: "Gratuito para Jovens" }
  ];

  const testimonials = [
    {
      name: "Ana Maria Silva",
      role: "Coordenadora de Projetos",
      avatar: "AM",
      text: "Evoluir no Joule significa impactar mais vidas. Cada competência que desenvolvo se traduz em melhor atendimento aos nossos jovens."
    },
    {
      name: "Carlos Eduardo",
      role: "Mentor de Carreira",
      avatar: "CE",
      text: "A plataforma me ajudou a ser um mentor mais eficaz. Agora consigo orientar melhor os jovens em suas jornadas profissionais."
    },
    {
      name: "Marina Costa",
      role: "Gestora de Desenvolvimento",
      avatar: "MC",
      text: "Ver nossa equipe crescer é ver nosso impacto multiplicar. Cada evolução nossa reflete diretamente nos jovens que atendemos."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-purple-50/30">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-lg border-b border-white/20 px-6 py-4 sticky top-0 z-50"
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-black bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
              INSTITUTO JOULE
            </div>
          </motion.div>

          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="text-gray-700 hover:text-orange-500 font-semibold transition-colors"
            >
              Entrar
            </Link>
            <Link
              to="/login"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Acessar Plataforma
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Heart className="w-4 h-4" />
                <span>Time Joule - Transformando Vidas Juntos</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
                Vamos Continuar
                <span className="bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent"> Evoluindo</span>
                <br />
                Para Impactar
                <span className="bg-gradient-to-r from-purple-500 to-orange-600 bg-clip-text text-transparent"> Mais Jovens!</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                <strong>Somos um time!</strong> Cada competência que você desenvolve aqui se transforma em 
                <strong> impacto real</strong> na vida dos jovens que atendemos. Venha evoluir conosco 
                para levarmos ainda mais oportunidades gratuitas de carreira para todo o Brasil.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to="/login"
                    className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all"
                  >
                    <span>Acessar Minha Jornada</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 bg-white/80 backdrop-blur-sm text-gray-700 px-8 py-4 rounded-xl font-bold text-lg border border-gray-200 hover:bg-white transition-all"
                >
                  <Users className="w-5 h-5" />
                  <span>Ver Minha Equipe</span>
                </motion.button>
              </div>

              <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-orange-50 rounded-xl border border-purple-200/30">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-purple-900">Missão Joule</span>
                </div>
                <p className="text-purple-700 text-sm leading-relaxed">
                  "Oferecemos <strong>mentorias de carreira 100% gratuitas</strong> para jovens de todo o Brasil. 
                  Seu crescimento profissional é o que nos permite impactar ainda mais vidas!"
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-gradient-to-br from-orange-400 to-purple-600 rounded-3xl p-8 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-purple-600/20 rounded-3xl backdrop-blur-sm"></div>
                
                <div className="relative z-10 text-white">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Brain className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">Plataforma Joule</h3>
                      <p className="text-white/80 text-sm">Desenvolvimento com IA</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <UserCheck className="w-4 h-4" />
                        <span className="font-semibold text-sm">Análise Personalizada</span>
                      </div>
                      <p className="text-white/90 text-sm">
                        "Ana tem potencial para liderar mais projetos de impacto social. Recomendo módulo de Gestão de Equipes."
                      </p>
                    </div>
                    
                    <div className="bg-white/10 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <BookOpen className="w-4 h-4" />
                        <span className="font-semibold text-sm">Desenvolvimento Focado</span>
                      </div>
                      <p className="text-white/90 text-sm">
                        "3 competências identificadas para ampliar seu impacto na mentoria de jovens."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              
              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <Heart className="w-6 h-6 text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-4">
              Nosso Impacto Juntos 🚀
            </h2>
            <p className="text-gray-600 text-lg">
              Cada evolução nossa se traduz em mais oportunidades para os jovens do Brasil
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-black bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-gray-900 mb-4">
              Ferramentas para Sua Evolução
            </h2>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Desenvolvemos uma plataforma completa para que você possa crescer profissionalmente 
              e, assim, impactar ainda mais jovens através das nossas mentorias gratuitas.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/30 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-orange-500 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-black text-white mb-4">
              Vozes do Nosso Time 💪
            </h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto">
              Conheça como nossos colegas estão evoluindo e multiplicando o impacto do Instituto Joule
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-white/80 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Globe className="w-4 h-4" />
              <span>Somos um time, somos uma família!</span>
            </div>

            <h2 className="text-4xl font-black text-white mb-6">
              Pronto para Evoluir e Impactar Mais Jovens?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Sua jornada de desenvolvimento é também a jornada de crescimento do Instituto Joule. 
              <strong> Vamos juntos levar ainda mais oportunidades gratuitas para os jovens do Brasil!</strong>
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/login"
                  className="flex items-center justify-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-orange-500/25 transition-all"
                >
                  <span>Começar Minha Evolução</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg border border-white/20 hover:bg-white/20 transition-all"
              >
                <Heart className="w-5 h-5" />
                <span>Ver Nosso Impacto</span>
              </motion.button>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/50 to-orange-900/50 rounded-xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-3">💡 Lembre-se sempre:</h3>
              <p className="text-white/90 leading-relaxed">
                "Cada competência que você desenvolve aqui se transforma em <strong>mentoria mais eficaz</strong>, 
                <strong> orientação mais precisa</strong> e <strong>oportunidades reais</strong> para os jovens que atendemos. 
                Seu crescimento é o crescimento do nosso impacto social!"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="text-xl font-black bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent">
                INSTITUTO JOULE
              </div>
            </div>
            
            <div className="flex items-center space-x-6 text-gray-400">
              <span className="text-sm">© 2025 Instituto Joule. Transformando vidas através da educação.</span>
              <div className="flex items-center space-x-2">
                <Heart className="w-4 h-4 text-orange-500" />
                <span className="text-sm">Feito com amor para nosso time</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;