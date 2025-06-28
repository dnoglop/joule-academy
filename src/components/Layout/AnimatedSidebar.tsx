import React, { useState, createContext, useContext } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, GraduationCap, TrendingUp, Target, Award, Settings, Menu, X } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(true);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const AnimatedSidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = () => {
  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  );
};

export const DesktopSidebar = () => {
  const { open, setOpen, animate } = useSidebar();
  const location = useLocation();
  
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Equipe', path: '/equipe' },
    { icon: Target, label: 'Matriz 9Box', path: '/matriz' },
    { icon: GraduationCap, label: 'Academia', path: '/academia' },
    { icon: Award, label: 'Avaliação 360°', path: '/avaliacao' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
  ];

  return (
    <motion.aside
      className="fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white/80 backdrop-blur-lg border-r border-white/20 p-6 hidden md:flex md:flex-col z-40"
      animate={{
        width: animate ? (open ? "256px" : "80px") : "256px",
      }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      transition={{
        duration: 0.3,
        ease: "easeInOut",
      }}
    >
      <div className="space-y-2 flex-1">
        {menuItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          
          return (
            <motion.div
              key={item.label}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <SidebarLink
                link={{
                  label: item.label,
                  href: item.path,
                  icon: <item.icon className="w-5 h-5" />
                }}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <motion.div
          animate={{
            opacity: animate ? (open ? 1 : 0) : 1,
            display: animate ? (open ? "block" : "none") : "block",
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="p-4 bg-gradient-to-br from-purple-500/10 to-orange-500/10 rounded-lg border border-purple-200/30"
        >
          <h3 className="font-semibold text-gray-800 mb-2">💡 Dica da IA</h3>
          <p className="text-sm text-gray-600">
            3 colaboradores precisam de atenção especial nos seus PDIs
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-2 text-xs bg-gradient-to-r from-orange-500 to-purple-600 text-white px-3 py-1 rounded-md"
          >
            Ver Detalhes
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.aside>
  );
};

export const MobileSidebar = () => {
  const { open, setOpen } = useSidebar();
  const location = useLocation();
  
  const menuItems = [
    { icon: BarChart3, label: 'Dashboard', path: '/dashboard' },
    { icon: Users, label: 'Equipe', path: '/equipe' },
    { icon: Target, label: 'Matriz 9Box', path: '/matriz' },
    { icon: GraduationCap, label: 'Academia', path: '/academia' },
    { icon: Award, label: 'Avaliação 360°', path: '/avaliacao' },
    { icon: TrendingUp, label: 'Analytics', path: '/analytics' },
    { icon: Settings, label: 'Configurações', path: '/configuracoes' },
  ];

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="h-10 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-white/80 backdrop-blur-lg border-b border-white/20 w-full fixed top-16 left-0 right-0 z-50">
        <div className="flex justify-end z-20 w-full">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(!open)}
            className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </motion.button>
        </div>
      </div>

      {/* Mobile Overlay Sidebar */}
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90] md:hidden"
          />
          
          {/* Sidebar Content */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="fixed top-0 left-0 h-full w-80 bg-white/95 backdrop-blur-lg p-6 z-[100] flex flex-col justify-between md:hidden shadow-2xl"
          >
            <div>
              <div className="flex justify-between items-center mb-8 pt-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="text-2xl font-black bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent"
                >
                  JOULE ACADEMY
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setOpen(false)}
                  className="p-2 text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              <div className="space-y-3">
                {menuItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                    >
                      <Link
                        to={item.path}
                        onClick={() => setOpen(false)}
                        className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <item.icon className="w-6 h-6" />
                        <span className="font-medium text-lg">{item.label}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="p-4 bg-gradient-to-br from-purple-500/10 to-orange-500/10 rounded-lg border border-purple-200/30"
            >
              <h3 className="font-semibold text-gray-800 mb-2">💡 Dica da IA</h3>
              <p className="text-sm text-gray-600">
                3 colaboradores precisam de atenção especial nos seus PDIs
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-2 text-xs bg-gradient-to-r from-orange-500 to-purple-600 text-white px-3 py-1 rounded-md"
              >
                Ver Detalhes
              </motion.button>
            </motion.div>
          </motion.div>
        </>
      )}
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: {
    label: string;
    href: string;
    icon: React.ReactNode;
  };
  className?: string;
}) => {
  const { open, animate } = useSidebar();
  
  return (
    <Link
      to={link.href}
      className={className}
      {...props}
    >
      <div className="flex items-center space-x-3">
        {link.icon}
        <motion.span
          animate={{
            display: animate ? (open ? "inline-block" : "none") : "inline-block",
            opacity: animate ? (open ? 1 : 0) : 1,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
          }}
          className="font-medium whitespace-pre inline-block !p-0 !m-0"
        >
          {link.label}
        </motion.span>
      </div>
    </Link>
  );
};