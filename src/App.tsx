import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Team from './pages/Team';
import Academy from './pages/Academy';
import Analytics from './pages/Analytics';
import Matrix9Box from './pages/Matrix9Box';
import Avaliacao360 from './pages/Avaliacao360';
import Configuracoes from './pages/Configuracoes';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page as Root */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/esqueci-senha" element={<ForgotPassword />} />
        <Route path="/redefinir-senha" element={<ResetPassword />} />
        
        {/* Protected Routes */}
        <Route path="/dashboard" element={
          <Layout>
            <Dashboard />
          </Layout>
        } />
        <Route path="/equipe" element={
          <Layout>
            <Team />
          </Layout>
        } />
        <Route path="/matriz" element={
          <Layout>
            <Matrix9Box />
          </Layout>
        } />
        <Route path="/academia" element={
          <Layout>
            <Academy />
          </Layout>
        } />
        <Route path="/avaliacao" element={
          <Layout>
            <Avaliacao360 />
          </Layout>
        } />
        <Route path="/analytics" element={
          <Layout>
            <Analytics />
          </Layout>
        } />
        <Route path="/configuracoes" element={
          <Layout>
            <Configuracoes />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;