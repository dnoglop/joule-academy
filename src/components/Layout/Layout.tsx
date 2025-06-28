import React from 'react';
import Header from './Header';
import { AnimatedSidebar, SidebarBody, useSidebar } from './AnimatedSidebar';
import AIAssistant from '../UI/AIAssistant';

interface LayoutProps {
  children: React.ReactNode;
}

const MainContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { open, animate } = useSidebar();
  
  return (
    <main 
      className="flex-1 p-6 transition-all duration-300 ease-in-out"
      style={{
        marginLeft: animate ? (open ? '256px' : '80px') : '256px'
      }}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </main>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-purple-50/30">
      <Header />
      <AnimatedSidebar>
        <div className="flex">
          <SidebarBody />
          <MainContent>{children}</MainContent>
        </div>
      </AnimatedSidebar>
      <AIAssistant />
    </div>
  );
};

export default Layout;