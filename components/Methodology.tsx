
import React from 'react';
import { PuzzleIcon, BookOpenIcon, UsersIcon } from './icons';

const methodologyItems = [
  {
    icon: PuzzleIcon,
    title: 'Praticidade',
    description: 'Você aprende fazendo, resolvendo problemas reais e aplicando.',
  },
  {
    icon: BookOpenIcon,
    title: 'Jornada guiada',
    description: 'Ritmo, desafios, atividades e momentos de troca.',
  },
  {
    icon: UsersIcon,
    title: 'Comunidade e Mentoria',
    description: 'Aprender junto acelera.',
  },
];

const Methodology: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Nossa metodologia é simples: <span className="text-primary">aprender tem que fazer sentido.</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            A gente usa os melhores métodos ativos e um design instrucional que conversa com a vida real. Nada de conteúdo sem contexto. Nada de teoria solta. Aqui tudo tem propósito.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {methodologyItems.map((item, index) => (
            <div key={index} className="bg-card p-8 rounded-lg shadow-lg hover:shadow-xl dark:shadow-2xl dark:hover:shadow-primary/10 transition-shadow duration-300 text-center">
              <div className="mx-auto bg-primary/10 text-primary h-16 w-16 rounded-full flex items-center justify-center">
                <item.icon className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-xl font-bold text-card-foreground">{item.title}</h3>
              <p className="mt-2 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Methodology;
