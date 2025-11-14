
import React from 'react';

const CallToAction: React.FC = () => {
  return (
    <section className="bg-card">
      <div className="container mx-auto px-6 py-20 md:py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-card-foreground leading-tight">
          Aprender agora é a decisão que vai <span className="text-primary">mudar seu futuro.</span>
        </h2>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Entre no Joule Academy e comece sua jornada com quem acredita no seu potencial.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#" className="bg-primary text-primary-foreground font-semibold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
            Entrar na plataforma
          </a>
          <a href="#" className="bg-secondary text-secondary-foreground font-semibold px-8 py-3.5 rounded-full hover:bg-secondary/80 transition-all duration-300">
            Explorar todos os cursos
          </a>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
