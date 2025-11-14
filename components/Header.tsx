
import React, { useState } from 'react';
import { HamburgerIcon, CloseIcon, SunIcon, MoonIcon, ArrowRightIcon } from './icons';
import { useTheme } from '../context/ThemeContext';

const navLinks = [
  { name: 'Sobre nós', href: '#about' },
  { name: 'Cursos', href: '#courses' },
  { name: 'Ranking', href: '#' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const ThemeToggle = () => (
    <button
      onClick={toggleTheme}
      aria-label={`Mudar para o tema ${theme === 'light' ? 'escuro' : 'claro'}`}
      className="text-muted-foreground hover:text-primary transition-colors duration-300 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background"
    >
      {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
    </button>
  );

  const NavLinks = () => (
    <>
      {navLinks.map((link) => (
        <a
          key={link.name}
          href={link.href}
          className="text-muted-foreground hover:text-primary transition-colors duration-300 py-2"
        >
          {link.name}
        </a>
      ))}
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-md shadow-sm z-50 border-b border-border/80">
      <div className="container mx-auto px-6 h-20 flex justify-between items-center">
        <a href="#" className="flex-shrink-0">
          <img src="https://academy.institutojoule.org/wp-content/uploads/2025/04/logo-3-e1759664774941.png" alt="Joule Academy Logo" className="h-10 w-auto" />
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
        </nav>

        <div className="hidden md:flex items-center space-x-6">
          <ThemeToggle />
          <a
            href="#"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary font-semibold transition-colors duration-300"
          >
            <ArrowRightIcon className="h-5 w-5" />
            Fazer login
          </a>
          <a
            href="#"
            className="bg-primary text-primary-foreground font-semibold px-6 py-2.5 rounded-full hover:bg-primary/90 transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Fazer cadastro
          </a>
        </div>
        
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-foreground" aria-label="Abrir menu">
            {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <HamburgerIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-background shadow-lg absolute top-20 left-0 w-full border-t border-border">
          <nav className="flex flex-col items-center space-y-4 p-6">
            <NavLinks />
            <div className="w-full pt-4 mt-2 border-t border-border/80 flex flex-col items-center gap-4">
              <a
                href="#"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary font-semibold transition-colors duration-300"
              >
                <ArrowRightIcon className="h-5 w-5" />
                Fazer login
              </a>
              <a
                href="#"
                className="bg-primary text-primary-foreground font-semibold w-full text-center px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300"
              >
                Fazer cadastro
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
