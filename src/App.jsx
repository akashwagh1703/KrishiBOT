import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useThemeStore } from './state/store';
import { config } from './config';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';

// Lazy load pages for better performance
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./routes/Home'));
const GuidedHome = lazy(() => import('./routes/GuidedFlow/GuidedHome'));
const WeatherPage = lazy(() => import('./routes/GuidedFlow/WeatherPage'));
const SchemesPage = lazy(() => import('./routes/GuidedFlow/SchemesPage'));
const PlantProtectionPage = lazy(() => import('./routes/GuidedFlow/PlantProtectionPage'));
const ChatPage = lazy(() => import('./routes/UnguidedFlow/ChatPage'));
const Settings = lazy(() => import('./routes/Settings'));
const Profile = lazy(() => import('./routes/Profile'));

// Loading component
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
  </div>
);

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
      <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-hidden">
        {config.ui.topbar_visible && <Header />}
        
        <div className="flex flex-1 overflow-hidden">
          {config.ui.sidebar_visible && <Sidebar />}
          
          <main className="flex-1 overflow-hidden">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full overflow-y-auto"><Home /></div>} />
                <Route path="/guided" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full overflow-y-auto"><GuidedHome /></div>} />
                <Route path="/weather" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full overflow-y-auto"><WeatherPage /></div>} />
                <Route path="/schemes" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full overflow-y-auto"><SchemesPage /></div>} />
                <Route path="/plant-protection" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full overflow-y-auto"><PlantProtectionPage /></div>} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/settings" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full overflow-y-auto"><Settings /></div>} />
                <Route path="/profile" element={<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 h-full overflow-y-auto"><Profile /></div>} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;