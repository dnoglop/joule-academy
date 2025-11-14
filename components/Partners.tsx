
import React from 'react';

const PartnerLogo: React.FC<{ name: string }> = ({ name }) => (
  <div className="flex items-center justify-center h-12 text-muted-foreground/80 font-medium tracking-wider text-xl grayscale dark:grayscale-0 opacity-60 dark:opacity-40 hover:grayscale-0 hover:opacity-100 dark:hover:opacity-80 transition-all duration-300">
    {name}
  </div>
);

const Partners: React.FC = () => {
  const partners = ['TechCorp', 'InnovateX', 'FutureStep', 'EduVerse', 'StartUp Inc.', 'Growth Co', 'NextGen'];

  return (
    <section className="bg-muted/50 py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Empresas que caminham com a gente
        </h2>
        <div className="mt-8 w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_48px,_black_calc(100%-48px),transparent_100%)]">
          <div className="flex animate-scroll">
            {[...partners, ...partners].map((name, index) => (
              <div key={index} className="flex-shrink-0 w-48 mx-4">
                <PartnerLogo name={name} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-70%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Partners;
