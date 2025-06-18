import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { SubmissionProvider } from './contexts/SubmissionContext';
import { ToastProvider } from './contexts/ToastContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ModsPage from './pages/ModsPage';
import ServersPage from './pages/ServersPage';
import ModDetailPage from './pages/ModDetailPage';
import ServerDetailPage from './pages/ServerDetailPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import EditModPage from './pages/EditModPage';
import './index.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = localStorage.getItem('user') !== null;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <SubmissionProvider>
            <ToastProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors duration-300">
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/*" element={
                    <>
                      <Header />
                      <main>
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/mods" element={<ModsPage />} />
                          <Route path="/mod/:id" element={<ModDetailPage />} />
                          <Route path="/servers" element={<ServersPage />} />
                          <Route path="/server/:id" element={<ServerDetailPage />} />
                          <Route path="/search" element={<ModsPage />} />
                          <Route path="/dashboard" element={
                            <ProtectedRoute>
                              <DashboardPage />
                            </ProtectedRoute>
                          } />
                          <Route path="/admin" element={<AdminPage />} />
                          <Route path="/admin/edit-mod/:id" element={<EditModPage />} />
                          <Route path="/about" element={
                            <div className="min-h-screen flex items-center justify-center">
                              <div className="text-center">
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">About MineGalss</h1>
                                <p className="text-gray-600 dark:text-dark-300">The modern platform for Minecraft content</p>
                              </div>
                            </div>
                          } />
                        </Routes>
                      </main>
                      <Footer />
                    </>
                  } />
                </Routes>
              </div>
            </ToastProvider>
          </SubmissionProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);