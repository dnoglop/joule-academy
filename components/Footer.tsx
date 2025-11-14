
import React from 'react';

const footerLinks = [
  { name: 'Sobre nós', href: '#' },
  { name: 'Termos de uso', href: '#' },
  { name: 'Privacidade', href: '#' },
  { name: 'Contato', href: '#' },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-8">
          <div>
            <a href="#">
                <img src="https://academy.institutojoule.org/wp-content/uploads/2025/04/logo-3-e1759664774941.png" alt="Joule Academy Logo" className="h-10 w-auto mx-auto md:mx-0" />
            </a>
            <p className="mt-4 text-muted-foreground">
              Aprender é transformar. E transformação começa com um passo.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground/80 text-sm">
          <p>&copy; {new Date().getFullYear()} Joule Academy. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
