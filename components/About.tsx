
import React, { useState, useEffect } from 'react';

// Icons Components
const ShieldCheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const DocumentIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// InfoCard Component
const InfoCard: React.FC<{ 
  icon: React.ElementType; 
  text: string; 
  position: string; 
  bgColor: string; 
  iconColor: string;
  animationDelay?: string;
}> = ({ icon: Icon, text, position, bgColor, iconColor, animationDelay }) => (
  <div 
    className={`absolute ${position} flex items-center gap-4 bg-card/90 backdrop-blur-sm p-4 rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 animate-pulse-slow`}
    style={{ animationDelay }}
  >
    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${bgColor}`}>
      <Icon className={`w-6 h-6 ${iconColor}`} />
    </div>
    <div>
      <p className="font-semibold text-card-foreground">{text}</p>
    </div>
  </div>
);

// VideoModal Component
const VideoModal: React.FC<{ videoId: string; onClose: () => void }> = ({ videoId, onClose }) => {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 animate-fadeIn" 
      onClick={onClose} 
      role="dialog" 
      aria-modal="true"
      aria-labelledby="video-modal-title"
    >
      <div 
        className="relative w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl animate-scaleIn" 
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Fechar vídeo"
          className="absolute -top-4 -right-4 w-12 h-12 bg-card text-foreground rounded-full flex items-center justify-center z-10 hover:bg-muted transition-colors shadow-lg"
        >
          <CloseIcon className="w-6 h-6" />
        </button>
        <iframe
          src={`https://player.vimeo.com/video/${videoId}?autoplay=1&title=0&byline=0&portrait=0`}
          className="w-full h-full rounded-lg"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Joule Academy Vídeo"
        ></iframe>
      </div>
    </div>
  );
};

// Main About Component
const About: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section id="about" className="py-20 md:py-28 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image Column */}
            <div className="relative">
              <div className="relative w-full aspect-[4/5] max-w-md mx-auto">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-lg transform -rotate-6"></div>
                
                {/* Main image */}
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                  alt="Estudante sorrindo durante aula"
                  className="relative w-full h-full object-cover rounded-lg shadow-2xl"
                  loading="lazy"
                />
                
                {/* Info Cards */}
                <InfoCard 
                  icon={ShieldCheckIcon} 
                  text="Ambiente Seguro" 
                  position="-top-8 left-0" 
                  bgColor="bg-destructive/10" 
                  iconColor="text-destructive" 
                  animationDelay="0s"
                />
                <InfoCard 
                  icon={DocumentIcon} 
                  text="+120 Cursos" 
                  position="top-1/4 -right-12" 
                  bgColor="bg-secondary" 
                  iconColor="text-secondary-foreground" 
                  animationDelay="1s"
                />
                
                {/* Play button overlay */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  aria-label="Reproduzir vídeo sobre Joule Academy"
                  className="absolute inset-0 flex items-center justify-center group focus:outline-none focus:ring-4 focus:ring-ring/50 rounded-lg"
                >
                  <div className="w-24 h-24 bg-background/30 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 animate-pulse-slow" style={{ animationDelay: '0.5s' }}>
                    <div className="w-20 h-20 bg-card rounded-full flex items-center justify-center shadow-xl">
                      <svg 
                        className="w-10 h-10 text-primary ml-1" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M8 5v14l11-7z"></path>
                      </svg>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Text Column */}
            <div className="text-center md:text-left">
              <p className="font-semibold text-primary uppercase tracking-wide">
                Explore a Joule Academy
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-2">
                Por que escolher a Joule?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                O Joule Academy nasceu para democratizar o acesso a conteúdos de qualidade, simples e aplicáveis. Aqui, a gente fala a língua da juventude — direto ao ponto.
              </p>
              
              {/* Benefits list */}
              <ul className="mt-6 space-y-4 text-left max-w-md mx-auto md:mx-0">
                <li className="flex items-start gap-3">
                  <CheckIcon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Conteúdos criados por especialistas do mercado.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Linguagem simples, prática e sem enrolação.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Comunidade ativa para você evoluir junto.
                  </span>
                </li>
              </ul>
              
              {/* CTA Button */}
              <div className="mt-8">
                <a 
                  href="#cursos" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-block focus:outline-none focus:ring-4 focus:ring-ring/50"
                >
                  Mais detalhes
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Video Modal */}
      {isModalOpen && (
        <VideoModal 
          videoId="1136891056" 
          onClose={() => setIsModalOpen(false)} 
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default About;