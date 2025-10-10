import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useThemeStore } from './state/store';
import { config } from './config';
import FloatingChatbot from './components/chat/FloatingChatbot';

import { Suspense } from 'react';

function App() {
  const { isDark } = useThemeStore();

  useEffect(() => {
    // Apply theme on app load
    const theme = isDark ? 'dark' : config.appearance.default_theme;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <Router>
      <div className="h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
        <Suspense fallback={null}>
          <Routes>
            <Route path="*" element={<FloatingChatbot />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;