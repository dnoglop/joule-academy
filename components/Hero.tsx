
import React, { useState, useEffect } from 'react';
import { CheckIcon } from './icons';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation shortly after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    'Conteúdos criados por especialistas do mercado',
    'Linguagem simples, prática e sem enrolação',
    'Cursos gratuitos, eventos e trilhas completas',
    'Comunidade ativa para você evoluir junto',
  ];

  return (
    <section className="bg-background pt-24 md:pt-28">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight">
                Aprender é o que <span className="text-primary">muda a sua história.</span> O resto é só consequência.
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
                No Joule Academy, você aprende com quem vive educação de verdade — cursos, trilhas e experiências que aceleram seu futuro de forma prática, jovem e direta.
              </p>
              <ul className="mt-8 space-y-3 text-left max-w-md mx-auto md:mx-0">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <CheckIcon className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/90">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#" className="bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Entrar na plataforma
                </a>
                <a href="#" className="bg-secondary text-secondary-foreground font-semibold px-8 py-3.5 rounded-full hover:bg-secondary/80 transition-all duration-300 border border-border">
                  Explorar cursos
                </a>
              </div>
            </div>
          </div>
          <div className={`relative transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-primary/10 rounded-full opacity-50 -z-10"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-secondary/10 rounded-full opacity-50 -z-10"></div>
            <img src="https://academy.institutojoule.org/wp-content/uploads/2025/11/2024-KPMG-Hackathon-da-Mentoria-1080-x-1080-px-1.png" alt="Jovem estudante sorrindo" className="rounded-lg shadow-2xl w-full h-auto object-cover animate-pulse-slow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;