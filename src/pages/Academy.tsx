import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  Search, 
  Plus, 
  Star, 
  Library, 
  Play, 
  Eye, 
  Clock,
  X,
  Save,
  Upload,
  BookOpen,
  Award,
  TrendingUp,
  Users
} from 'lucide-react';

const Academy: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [showModal, setShowModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<any>(null);

  const filters = ['Todos', 'Liderança', 'Gestão', 'Comunicação', 'Técnico', 'Soft Skills'];

  const featuredTraining = {
    title: 'Liderança Transformacional na Era Digital',
    description: 'Descubra como liderar equipes remotas e híbridas com eficiência. Este treinamento aborda as principais competências necessárias para líderes modernos enfrentarem os desafios da transformação digital.',
    badge: '🔥 Mais Assistido',
    duration: '52 min',
    views: '2.8k',
    rating: 4.9
  };

  const trainings = [
    {
      id: 1,
      title: 'Liderança Situacional na Prática',
      description: 'Aprenda a adaptar seu estilo de liderança conforme a situação e maturidade da equipe.',
      category: 'Liderança',
      duration: '45 min',
      views: '1.2k',
      rating: 4.8,
      thumbnail: 'gradient-orange'
    },
    {
      id: 2,
      title: 'Gestão Ágil de Projetos',
      description: 'Metodologias ágeis aplicadas à gestão de projetos para resultados mais eficazes.',
      category: 'Gestão',
      duration: '32 min',
      views: '892',
      rating: 4.6,
      thumbnail: 'gradient-blue'
    },
    {
      id: 3,
      title: 'Comunicação Executiva e Storytelling',
      description: 'Técnicas avançadas de comunicação para apresentações executivas impactantes.',
      category: 'Comunicação',
      duration: '28 min',
      views: '1.5k',
      rating: 4.9,
      thumbnail: 'gradient-green'
    },
    {
      id: 4,
      title: 'Inteligência Emocional no Trabalho',
      description: 'Desenvolva sua inteligência emocional para melhorar relacionamentos profissionais.',
      category: 'Soft Skills',
      duration: '38 min',
      views: '2.1k',
      rating: 4.7,
      thumbnail: 'gradient-purple'
    },
    {
      id: 5,
      title: 'Stakeholder Management',
      description: 'Estratégias para gerenciar stakeholders e garantir o sucesso dos projetos.',
      category: 'Gestão',
      duration: '52 min',
      views: '756',
      rating: 4.5,
      thumbnail: 'gradient-red'
    },
    {
      id: 6,
      title: 'Design Thinking para ONGs',
      description: 'Metodologia de design thinking aplicada ao contexto de organizações sociais.',
      category: 'Técnico',
      duration: '41 min',
      views: '643',
      rating: 4.8,
      thumbnail: 'gradient-indigo'
    }
  ];

  const getThumbnailClass = (type: string) => {
    const classes = {
      'gradient-orange': 'from-orange-500 to-orange-600',
      'gradient-blue': 'from-blue-500 to-blue-600',
      'gradient-green': 'from-green-500 to-green-600',
      'gradient-purple': 'from-purple-500 to-purple-600',
      'gradient-red': 'from-red-500 to-red-600',
      'gradient-indigo': 'from-indigo-500 to-indigo-600'
    };
    return classes[type as keyof typeof classes] || 'from-gray-500 to-gray-600';
  };

  const filteredTrainings = trainings.filter(training => {
    const matchesSearch = training.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         training.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'Todos' || training.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleVideoClick = (training: any) => {
    setSelectedVideo(training);
  };

  const handleAddTraining = () => {
    // Simulate adding training
    alert('✅ Treinamento adicionado com sucesso!');
    setShowModal(false);
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
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <GraduationCap className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-black text-gray-900">
            Academia Joule 🎓
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Sua Netflix de treinamentos corporativos. Descubra, aprenda e evolua com conteúdos de alta qualidade.
        </p>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-4 items-center justify-between"
      >
        <div className="flex-1 min-w-80 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar treinamentos..."
            className="w-full pl-12 pr-4 py-3 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                  : 'bg-white/90 text-gray-700 border border-gray-200 hover:bg-orange-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Adicionar Treinamento</span>
        </motion.button>
      </motion.div>

      {/* Featured Training */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="flex items-center space-x-2 mb-6">
          <Star className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-black text-gray-900">Treinamento em Destaque</h2>
        </div>
        
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-200/30 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-80">
            <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleVideoClick(featuredTraining)}
                className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl"
              >
                <Play className="w-8 h-8 text-purple-600 ml-1" />
              </motion.button>
              <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                {featuredTraining.duration}
              </div>
            </div>
            
            <div className="p-8 flex flex-col justify-center">
              <div className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 text-white px-3 py-1 rounded-xl text-sm font-bold mb-4 w-fit">
                {featuredTraining.badge}
              </div>
              <h3 className="text-2xl font-black text-gray-900 mb-4">{featuredTraining.title}</h3>
              <p className="text-gray-600 leading-relaxed mb-6">{featuredTraining.description}</p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleVideoClick(featuredTraining)}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg w-fit"
              >
                <Play className="w-5 h-5" />
                <span>Assistir Agora</span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Training Library */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center space-x-2 mb-6">
          <Library className="w-6 h-6 text-orange-500" />
          <h2 className="text-2xl font-black text-gray-900">Biblioteca de Treinamentos</h2>
          <span className="text-sm text-gray-500">({filteredTrainings.length} resultados)</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrainings.map((training, index) => (
            <motion.div
              key={training.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              whileHover={{ y: -4 }}
              onClick={() => handleVideoClick(training)}
              className="bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-gray-200/30 shadow-lg cursor-pointer group"
            >
              <div className={`relative h-48 bg-gradient-to-br ${getThumbnailClass(training.thumbnail)} flex items-center justify-center`}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl group-hover:bg-white transition-all"
                >
                  <Play className="w-6 h-6 text-orange-500 ml-1" />
                </motion.div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-semibold">
                  {training.duration}
                </div>
              </div>
              
              <div className="p-6">
                <div className="inline-block bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs font-bold mb-3">
                  {training.category}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{training.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">{training.description}</p>
                
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Eye className="w-3 h-3" />
                    <span>{training.views} visualizações</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-orange-500 fill-current" />
                    <span>{training.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredTrainings.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-500 mb-2">Nenhum treinamento encontrado</h3>
            <p className="text-gray-400">Tente ajustar os filtros ou termo de busca</p>
          </motion.div>
        )}
      </motion.div>

      {/* Add Training Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Adicionar Novo Treinamento</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Título do Treinamento
                </label>
                <input
                  type="text"
                  placeholder="Digite o título do treinamento"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Categoria
                </label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                  <option>Selecione uma categoria</option>
                  <option>Liderança</option>
                  <option>Gestão</option>
                  <option>Comunicação</option>
                  <option>Técnico</option>
                  <option>Soft Skills</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Descrição
                </label>
                <textarea
                  rows={4}
                  placeholder="Descreva o conteúdo do treinamento"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-vertical"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL do YouTube
                  </label>
                  <input
                    type="url"
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Duração (em minutos)
                  </label>
                  <input
                    type="number"
                    placeholder="Ex: 45"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Material Complementar (opcional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-500 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Clique para fazer upload ou arraste arquivos aqui</p>
                  <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX, PPT, PPTX (máx. 10MB)</p>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddTraining}
                className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg"
              >
                <Plus className="w-5 h-5" />
                <span>Adicionar Treinamento</span>
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Video Player Modal */}
      {selectedVideo && (
        <VideoPlayerModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </motion.div>
  );
};

// Video Player Modal Component
const VideoPlayerModal: React.FC<{ video: any; onClose: () => void }> = ({ video, onClose }) => {
  const [progress, setProgress] = useState(35);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const nextVideos = [
    { title: 'Comunicação Assertiva para Líderes', duration: '32 min' },
    { title: 'Gestão de Conflitos na Equipe', duration: '28 min' },
    { title: 'Feedback Eficaz e Construtivo', duration: '38 min' }
  ];

  const materials = [
    { name: 'Guia de Liderança Situacional', type: 'PDF', size: '2.3 MB' },
    { name: 'Slides da Apresentação', type: 'PPTX', size: '5.1 MB' },
    { name: 'Exercícios Práticos', type: 'PDF', size: '1.8 MB' }
  ];

  const comments = [
    {
      author: 'Ana Maria Santos',
      avatar: 'AM',
      time: 'há 2 horas',
      text: 'Excelente conteúdo! As situações práticas apresentadas me ajudaram muito a entender como aplicar os conceitos no meu dia a dia como gestora.'
    },
    {
      author: 'Carlos Silva',
      avatar: 'CS', 
      time: 'há 1 dia',
      text: 'O módulo sobre delegação foi especialmente útil. Sempre tive dificuldade em delegar tarefas, mas agora entendo melhor quando e como fazer isso.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black z-50 overflow-y-auto"
    >
      {/* Header */}
      <div className="bg-black/90 backdrop-blur-lg border-b border-white/10 p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-black bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
            JOULE ACADEMY
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onClose}
            className="flex items-center space-x-2 bg-white/10 text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 transition-all"
          >
            <span>← Voltar à Academia</span>
          </motion.button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <div className="relative bg-gray-900 rounded-xl overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 bg-orange-500/90 rounded-full flex items-center justify-center"
                >
                  <Play className="w-8 h-8 text-white ml-1" />
                </motion.button>
                
                <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded text-sm font-semibold">
                  45:32
                </div>
                
                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center space-x-3">
                    <button className="text-white hover:text-orange-500">
                      <Play className="w-5 h-5" />
                    </button>
                    <div className="flex-1 h-1 bg-white/30 rounded-full cursor-pointer">
                      <div 
                        className="h-full bg-orange-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-white text-sm font-semibold">15:47 / 45:32</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Video Info */}
            <div className="space-y-4">
              <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-lg text-sm font-bold">
                LIDERANÇA
              </div>
              <h1 className="text-3xl font-black text-white">{video.title}</h1>
              
              <div className="flex items-center space-x-6 text-gray-400 text-sm">
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>1.247 visualizações</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Publicado em 15 de maio</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-orange-500" />
                  <span>4.8 (127 avaliações)</span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed">
                Neste treinamento completo, você aprenderá a adaptar seu estilo de liderança conforme a situação e maturidade da equipe. 
                Abordamos os quatro estilos principais da liderança situacional: dirigir, orientar, apoiar e delegar.
              </p>

              <div className="flex space-x-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold"
                >
                  <Award className="w-5 h-5" />
                  <span>Salvar nos Favoritos</span>
                </motion.button>
                <button className="flex items-center space-x-2 bg-white/10 text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20">
                  <Users className="w-5 h-5" />
                  <span>Compartilhar</span>
                </button>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <span>💬 Comentários (23)</span>
              </h3>

              <div className="mb-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Compartilhe suas impressões sobre este treinamento..."
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 resize-none"
                  rows={3}
                />
                <div className="flex justify-end space-x-3 mt-3">
                  <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20">
                    Cancelar
                  </button>
                  <button className="flex items-center space-x-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-lg">
                    <span>Comentar</span>
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {comments.map((comment, index) => (
                  <div key={index} className="flex space-x-3 p-4 bg-white/5 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {comment.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="font-semibold text-white">{comment.author}</span>
                        <span className="text-xs text-gray-400">{comment.time}</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Seu Progresso</span>
              </h3>
              
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-black text-orange-500">75%</span>
                <span className="text-sm text-gray-400">Concluído</span>
              </div>
              
              <div className="w-full h-2 bg-white/10 rounded-full mb-4">
                <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full" style={{ width: '75%' }} />
              </div>
              
              <p className="text-gray-400 text-sm mb-6">
                Você está indo muito bem! Continue assistindo para completar este módulo.
              </p>
              
              <div className="text-center pt-4 border-t border-white/10">
                <h4 className="text-white font-semibold mb-3">Avalie este treinamento</h4>
                <div className="flex justify-center space-x-2 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setRating(star)}
                      className="transition-all hover:scale-110"
                    >
                      <Star 
                        className={`w-6 h-6 ${star <= rating ? 'text-orange-500 fill-current' : 'text-gray-600'}`} 
                      />
                    </button>
                  ))}
                </div>
                <p className="text-gray-400 text-sm">Média: 4.8/5 (127 avaliações)</p>
              </div>
            </div>

            {/* Materials */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>Material Complementar</span>
              </h3>
              
              <div className="space-y-3">
                {materials.map((material, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded flex items-center justify-center">
                      <BookOpen className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm">{material.name}</div>
                      <div className="text-gray-400 text-xs">{material.type} • {material.size}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Next Videos */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Próximos Vídeos</span>
              </h3>
              
              <div className="space-y-3">
                {nextVideos.map((nextVideo, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    className="flex space-x-3 p-3 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10 transition-all"
                  >
                    <div className="w-20 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded flex items-center justify-center">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm leading-tight mb-1">{nextVideo.title}</div>
                      <div className="text-gray-400 text-xs">{nextVideo.duration}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Academy;