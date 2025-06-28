import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
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
import AcceptInvitation from './pages/AcceptInvitation';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Toaster />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/esqueci-senha" element={<ForgotPassword />} />
            <Route path="/redefinir-senha" element={<ResetPassword />} />
            <Route path="/aceitar-convite" element={<AcceptInvitation />} />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/equipe" element={
              <ProtectedRoute>
                <Layout>
                  <Team />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/matriz" element={
              <ProtectedRoute>
                <Layout>
                  <Matrix9Box />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/academia" element={
              <ProtectedRoute>
                <Layout>
                  <Academy />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/avaliacao" element={
              <ProtectedRoute>
                <Layout>
                  <Avaliacao360 />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/analytics" element={
              <ProtectedRoute>
                <Layout>
                  <Analytics />
                </Layout>
              </ProtectedRoute>
            } />
            <Route path="/configuracoes" element={
              <ProtectedRoute>
                <Layout>
                  <Configuracoes />
                </Layout>
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;