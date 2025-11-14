
import React from 'react';
import { StarIcon } from './icons';

const testimonials = [
  { name: 'Camila S.', quote: 'Finalmente encontrei uma plataforma que fala comigo.', rating: 5, imageUrl: 'https://picsum.photos/seed/person1/100/100' },
  { name: 'Kaio M.', quote: 'O Lab.AI mudou meu jeito de trabalhar.', rating: 5, imageUrl: 'https://picsum.photos/seed/person2/100/100' },
  { name: 'Vitória L.', quote: 'Me enxerguei como profissional.', rating: 5, imageUrl: 'https://picsum.photos/seed/person3/100/100' },
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Quem aprende com a gente <span className="text-primary">sente a diferença</span>.
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-card p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
              <img src={testimonial.imageUrl} alt={testimonial.name} className="w-20 h-20 rounded-full object-cover" />
              <div className="flex mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon key={i} className="w-5 h-5 text-primary" />
                ))}
              </div>
              <blockquote className="mt-4 text-lg text-card-foreground/90 italic">
                “{testimonial.quote}”
              </blockquote>
              <p className="mt-4 font-semibold text-card-foreground">— {testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
