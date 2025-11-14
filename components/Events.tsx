
import React from 'react';

const events = [
  { 
    type: 'Live', 
    title: 'Como criar seu PDI para 2026', 
    imageUrl: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    type: 'Masterclass gratuita', 
    title: 'IA no seu dia a dia: Ferramentas Práticas', 
    imageUrl: 'https://images.unsplash.com/photo-1677756119517-756a188d2d94?q=80&w=2070&auto=format&fit=crop' 
  },
  { 
    type: 'Encontro Conecta', 
    title: 'Carreira & Propósito: Uma Conversa Aberta', 
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop' 
  },
];

const EventCard: React.FC<{ event: typeof events[0] }> = ({ event }) => (
    <div className="bg-card rounded-lg shadow-lg hover:shadow-xl dark:shadow-2xl dark:hover:shadow-primary/10 overflow-hidden transform hover:-translate-y-1.5 transition-all duration-300 flex flex-col border border-border">
        <img src={event.imageUrl} alt={event.title} className="w-full h-48 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">{event.type}</span>
            <h3 className="text-xl font-bold text-card-foreground mt-2 flex-grow">{event.title}</h3>
            <div className="mt-6">
                <a href="#" className="w-full text-center bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 inline-block shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-card">
                    Inscreva-se
                </a>
            </div>
        </div>
    </div>
);

const Events: React.FC = () => {
  return (
    <section id="events" className="py-20 md:py-28 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            Participe dos nossos próximos eventos
          </h2>
          <p className="mt-4 text-lg text-secondary-foreground/80">
            Conecte-se com especialistas, aprenda novas habilidades e faça parte da nossa comunidade ativa.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, index) => (
                <EventCard key={index} event={event} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
