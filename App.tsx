
import React, { ReactNode } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Partners from './components/Partners';
import About from './components/About';
import SocialProof from './components/SocialProof';
import Courses from './components/Courses';
import Methodology from './components/Methodology';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import Events from './components/Events';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import { ThemeProvider } from './context/ThemeContext';
import { useIntersectionObserver } from './hooks/useIntersectionObserver';

const AnimatedSection: React.FC<{children: ReactNode, className?: string}> = ({ children, className }) => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div ref={ref} className={`animated-section ${isVisible ? 'is-visible' : ''} ${className || ''}`}>
      {children}
    </div>
  );
};


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="bg-background text-foreground antialiased transition-colors duration-300">
        <Header />
        <main>
          <Hero />
          <AnimatedSection><Partners /></AnimatedSection>
          <AnimatedSection><About /></AnimatedSection>
          <AnimatedSection><SocialProof /></AnimatedSection>
          <AnimatedSection><Methodology /></AnimatedSection>
          <AnimatedSection><Courses /></AnimatedSection>
          <AnimatedSection><Benefits /></AnimatedSection>
          <AnimatedSection><Events /></AnimatedSection>
          <AnimatedSection><Testimonials /></AnimatedSection>
          <AnimatedSection><CallToAction /></AnimatedSection>
        </main>
        <AnimatedSection><Footer /></AnimatedSection>
      </div>
    </ThemeProvider>
  );
};

export default App;
