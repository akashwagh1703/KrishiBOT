import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useThemeStore } from './state/store';
import AuthFlow from './components/auth/AuthFlow';
import OTPFlow from './components/auth/OTPFlow';
import ProtectedRoute from './components/auth/ProtectedRoute';
import FloatingChatbot from './components/chat/FloatingChatbot';

import { Suspense } from 'react';

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
            <Route path="*" element={
              <Navigate to={localStorage.getItem('isAuthenticated') === 'true' ? '/chat' : '/login'} replace />
            } />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;