import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useThemeStore } from './state/store';
import { Toaster } from 'react-hot-toast';
import AuthFlow from './components/auth/AuthFlow';
import OTPFlow from './components/auth/OTPFlow';
import ProtectedRoute from './components/auth/ProtectedRoute';
import FloatingChatbot from './components/chat/FloatingChatbot';

import { Suspense } from 'react';
import Profile from './routes/Profile';
import Admin from './routes/Admin';
import AdminLogin from './routes/AdminLogin';
import AdminApps from './routes/AdminApps';
import AdminAppConfig from './routes/AdminAppConfig';
import AdminProtectedRoute from './components/auth/AdminProtectedRoute';

function App() {
  const { isDark } = useThemeStore();

  useEffect(() => {
    // Apply theme on app load
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    // Initialize theme from localStorage on app start
    const savedTheme = localStorage.getItem('theme-storage');
    if (savedTheme) {
      const { state } = JSON.parse(savedTheme);
      if (state.isDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }, []);

  return (
    <Router>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-screen overflow-hidden">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/login" element={<AuthFlow />} />
            <Route path="/verifyotp" element={<OTPFlow />} />
            <Route path="/chat" element={
              <ProtectedRoute>
                <FloatingChatbot />
              </ProtectedRoute>
            } />
            <Route path="/weather" element={
              <ProtectedRoute>
                <FloatingChatbot />
              </ProtectedRoute>
            } />
            <Route path="/schemes" element={
              <ProtectedRoute>
                <FloatingChatbot />
              </ProtectedRoute>
            } />
            <Route path="/plant-protection" element={
              <ProtectedRoute>
                <FloatingChatbot />
              </ProtectedRoute>
            } />
            <Route path="/select-crop" element={
              <ProtectedRoute>
                <FloatingChatbot />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <div className="h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-y-auto">
                  <Profile />
                </div>
              </ProtectedRoute>
            } />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/admin" element={
              <AdminProtectedRoute>
                <Admin />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/apps" element={
              <AdminProtectedRoute>
                <AdminApps />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/apps/:appId/config" element={
              <AdminProtectedRoute>
                <AdminAppConfig />
              </AdminProtectedRoute>
            } />
            <Route path="/admin/settings" element={
              <AdminProtectedRoute>
                <Admin />
              </AdminProtectedRoute>
            } />
            <Route path="*" element={
              <Navigate to={localStorage.getItem('is_authenticated') === 'true' ? '/chat' : '/login'} replace />
            } />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;