
import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const stats = [
  { value: '+30.000', label: 'jovens impactados' },
  { value: '+120', label: 'cursos e experiências' },
  { value: '+500', label: 'eventos e ações ao vivo' },
  { value: 'Ativa', label: 'comunidade todos os dias' },
];

const AnimatedNumber: React.FC<{ finalValue: number, duration?: number }> = ({ finalValue, duration = 1500 }) => {
  const [count, setCount] = useState(0);
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (isVisible) {
      let startTimestamp: number | null = null;
      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        const newCount = Math.floor(easedProgress * finalValue);
        setCount(newCount);
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [isVisible, finalValue, duration]);

  return (
    <span ref={ref}>
      {new Intl.NumberFormat('de-DE').format(count)}
    </span>
  );
};

const SocialProof: React.FC = () => {
  return (
    <section className="bg-primary text-primary-foreground py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Nossos números contam uma parte da história.
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-10">
            {stats.map((stat, index) => {
              const isNumeric = /^\+?[\d.]+$/.test(stat.value);
              const prefix = stat.value.startsWith('+') ? '+' : '';
              const finalValue = isNumeric ? parseInt(stat.value.replace(/[+.]/g, ''), 10) : 0;

              return (
                <div key={index}>
                  <p className="text-4xl md:text-5xl font-extrabold">
                    {isNumeric ? (
                      <>
                        {prefix}
                        <AnimatedNumber finalValue={finalValue} />
                      </>
                    ) : (
                      stat.value
                    )}
                  </p>
                  <p className="mt-2 text-base text-primary-foreground/80">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
