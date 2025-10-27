import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useThemeStore } from './state/store';
import { Toaster } from 'react-hot-toast';
import AuthFlow from './components/auth/AuthFlow';
import OTPFlow from './components/auth/OTPFlow';
import ProtectedRoute from './components/auth/ProtectedRoute';
import FloatingChatbot from './components/chat/FloatingChatbot';
import ParticleBackground from './components/ui/ParticleBackground';
import HolographicOverlay from './components/ui/HolographicOverlay';
import DataStream from './components/ui/DataStream';
// import CornerAccents from './components/ui/CornerAccents';
import QuantumField from './components/ui/QuantumField';
import NeuralPulse from './components/ui/NeuralPulse';

import { Suspense } from 'react';
import Profile from './routes/Profile';
import HomePage from './routes/HomePage';

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
      <QuantumField />
      <NeuralPulse />
      <ParticleBackground />
      <HolographicOverlay />
      <DataStream />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="h-screen overflow-hidden relative z-10">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<HomePage />} />
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
            <Route path="*" element={
              <Navigate to="/" replace />
            } />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;