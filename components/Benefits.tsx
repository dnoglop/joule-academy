
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, BookOpenIcon, UsersIcon, StarIcon, PuzzleIcon } from './icons';

const benefits = [
  {
    title: 'Aprendizado de verdade',
    description: 'Conteúdos pensados para o mercado.',
    icon: BookOpenIcon,
    iconBgColor: 'bg-secondary/20',
    iconColor: 'text-secondary-foreground',
    cardBgColor: 'bg-card'
  },
  {
    title: 'Instrutores que sentem o propósito',
    description: 'Gente que vive educação.',
    icon: UsersIcon,
    iconBgColor: 'bg-destructive/10',
    iconColor: 'text-destructive',
    cardBgColor: 'bg-card'
  },
  {
    title: 'Eventos abertos e gratuitos',
    description: 'Masterclasses, encontros e ações.',
    icon: StarIcon,
    iconBgColor: 'bg-primary/10',
    iconColor: 'text-primary',
    cardBgColor: 'bg-card'
  },
  {
    title: 'Ambiente jovem e acolhedor',
    description: 'Natural, leve e humano.',
    icon: PuzzleIcon,
    iconBgColor: 'bg-accent/20',
    iconColor: 'text-accent-foreground',
    cardBgColor: 'bg-card'
  },
];


const Benefits: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollButtons = useCallback(() => {
    if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        setCanScrollLeft(scrollLeft > 5);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
        checkScrollButtons();
        carousel.addEventListener('scroll', checkScrollButtons, { passive: true });
        window.addEventListener('resize', checkScrollButtons, { passive: true });
        return () => {
            carousel.removeEventListener('scroll', checkScrollButtons);
            window.removeEventListener('resize', checkScrollButtons);
        };
    }
  }, [checkScrollButtons]);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const firstCard = carouselRef.current.children[0] as HTMLElement;
      if (firstCard) {
        const carousel = carouselRef.current;
        const gap = parseFloat(window.getComputedStyle(carousel).gap);
        const scrollAmount = firstCard.offsetWidth + (isNaN(gap) ? 0 : gap);
        carousel.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <section className="py-20 md:py-28 bg-background overflow-hidden">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          <div className="lg:col-span-2 text-center lg:text-left px-6">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              O que você leva quando estuda com a gente?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto lg:mx-0">
              Nossa plataforma oferece vantagens exclusivas para acelerar seu desenvolvimento, com foco em aplicabilidade e comunidade.
            </p>
            <div className="mt-8 flex gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Slide anterior"
                className="p-3 rounded-full border-2 border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-50 disabled:hover:text-muted-foreground disabled:hover:border-border"
              >
                <ArrowLeftIcon className="h-6 w-6" />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Próximo slide"
                className="p-3 rounded-full border-2 border-border text-muted-foreground hover:text-primary hover:border-primary transition-colors disabled:opacity-50 disabled:hover:text-muted-foreground disabled:hover:border-border"
              >
                <ArrowRightIcon className="h-6 w-6" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 overflow-hidden">
            <div
              ref={carouselRef}
              className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide py-4 px-6 gap-6 md:gap-8"
            >
              {benefits.map((benefit, index) => (
                <div key={index} className="snap-start w-4/5 sm:w-[45%] lg:w-[45%] xl:w-1/3 flex-shrink-0">
                  <div className={`h-full p-8 rounded-lg shadow-lg transition-all duration-300 ${benefit.cardBgColor} border border-transparent dark:hover:border-primary/20`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${benefit.iconBgColor}`}>
                      <benefit.icon className={`h-8 w-8 ${benefit.iconColor}`} />
                    </div>
                    <h3 className="mt-6 text-xl font-bold text-card-foreground">{benefit.title}</h3>
                    <p className="mt-2 text-muted-foreground">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
