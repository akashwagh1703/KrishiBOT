import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useThemeStore, useLanguageStore, useChatStore } from '../state/store';
import ThemeToggle from '../components/ui/ThemeToggle';

const Settings = () => {
  const { t, i18n } = useTranslation();
  const { isDark } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const { clearMessages } = useChatStore();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [notifications, setNotifications] = useState({
    weather: true,
    schemes: true,
    cropTips: false,
    marketPrices: true
  });

  const handleLanguageChange = (newLanguage) => {
    i18n.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  const handleClearChatHistory = () => {
    clearMessages();
    setShowClearConfirm(false);
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const exportData = () => {
    const data = {
      theme: isDark ? 'dark' : 'light',
      language: language,
      notifications: notifications,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kisanbot-settings.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 relative">
      {/* Header */}
      <div className="relative glass-panel border border-white/10 rounded-2xl p-8 backdrop-blur-xl overflow-hidden">
        <div className="relative">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <div className="w-12 h-12 bg-gradient-to-br from-neon-green to-neon-cyan rounded-xl flex items-center justify-center mr-3 animate-morph">
              <i className='bx bx-cog text-2xl text-dark-950'></i>
            </div>
            {t('settings')}
          </h1>
          <p className="text-gray-400">
            Customize your KisanBot experience
          </p>
        </div>
      </div>

      {/* Appearance */}
      <div className="relative glass-panel border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 border border-white/10 rounded-xl flex items-center justify-center mr-4">
            <i className='bx bx-palette text-2xl text-neon-green'></i>
          </div>
          <h2 className="text-xl font-bold text-white">Appearance</h2>
        </div>
        <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl">
          <div>
            <h3 className="font-medium text-white">Theme Mode</h3>
            <p className="text-sm text-gray-400">
              Choose between light and dark mode
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Language */}
      <div className="relative glass-panel border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-neon-cyan/20 to-neon-blue/20 border border-white/10 rounded-xl flex items-center justify-center mr-4">
            <i className='bx bx-world text-2xl text-neon-cyan'></i>
          </div>
          <h2 className="text-xl font-bold text-white">Language</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
              language === 'en'
                ? 'border-neon-green bg-neon-green/10 shadow-lg shadow-neon-green/20'
                : 'border-white/10 hover:border-neon-green/50 bg-white/5'
            }`}
          >
            <div className="flex items-center">
              <span className="text-4xl mr-4">🇺🇸</span>
              <div>
                <div className="font-semibold text-white text-lg">English</div>
                <div className="text-sm text-gray-400">Default Language</div>
              </div>
              {language === 'en' && <i className='bx bx-check-circle text-2xl text-neon-green ml-auto'></i>}
            </div>
          </button>
          
          <button
            onClick={() => handleLanguageChange('hi')}
            className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
              language === 'hi'
                ? 'border-neon-green bg-neon-green/10 shadow-lg shadow-neon-green/20'
                : 'border-white/10 hover:border-neon-green/50 bg-white/5'
            }`}
          >
            <div className="flex items-center">
              <span className="text-4xl mr-4">🇮🇳</span>
              <div>
                <div className="font-semibold text-white text-lg">हिंदी</div>
                <div className="text-sm text-gray-400">Hindi Language</div>
              </div>
              {language === 'hi' && <i className='bx bx-check-circle text-2xl text-neon-green ml-auto'></i>}
            </div>
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="relative glass-panel border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 border border-white/10 rounded-xl flex items-center justify-center mr-4">
            <i className='bx bx-bell text-2xl text-neon-green'></i>
          </div>
          <h2 className="text-xl font-bold text-white">Notifications</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-neon-blue/20 rounded-lg flex items-center justify-center mr-4">
                <i className='bx bx-cloud-rain text-xl text-neon-blue'></i>
              </div>
              <div>
                <h3 className="font-medium text-white">Weather Alerts</h3>
                <p className="text-sm text-gray-400">Severe weather notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.weather} onChange={() => toggleNotification('weather')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-neon-green/20 rounded-lg flex items-center justify-center mr-4">
                <i className='bx bx-file text-xl text-neon-green'></i>
              </div>
              <div>
                <h3 className="font-medium text-white">Scheme Updates</h3>
                <p className="text-sm text-gray-400">New government schemes</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.schemes} onChange={() => toggleNotification('schemes')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-neon-cyan/20 rounded-lg flex items-center justify-center mr-4">
                <i className='bx bx-leaf text-xl text-neon-cyan'></i>
              </div>
              <div>
                <h3 className="font-medium text-white">Crop Tips</h3>
                <p className="text-sm text-gray-400">Seasonal farming advice</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.cropTips} onChange={() => toggleNotification('cropTips')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mr-4">
                <i className='bx bx-rupee text-xl text-yellow-400'></i>
              </div>
              <div>
                <h3 className="font-medium text-white">Market Prices</h3>
                <p className="text-sm text-gray-400">Crop price updates</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.marketPrices} onChange={() => toggleNotification('marketPrices')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div className="relative glass-panel border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-white/10 rounded-xl flex items-center justify-center mr-4">
            <i className='bx bx-shield text-2xl text-red-400'></i>
          </div>
          <h2 className="text-xl font-bold text-white">Data & Privacy</h2>
        </div>
        <div className="space-y-3">
          <button onClick={() => setShowClearConfirm(true)} className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all duration-200 group">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <i className='bx bx-trash text-xl text-red-400'></i>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-white">Clear Chat History</h3>
                <p className="text-sm text-gray-400">Remove all stored messages</p>
              </div>
            </div>
            <i className='bx bx-chevron-right text-gray-400'></i>
          </button>
          
          <button onClick={exportData} className="w-full flex items-center justify-between p-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl transition-all duration-200 group">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-neon-blue/20 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <i className='bx bx-download text-xl text-neon-blue'></i>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-white">Export Data</h3>
                <p className="text-sm text-gray-400">Download settings & preferences</p>
              </div>
            </div>
            <i className='bx bx-chevron-right text-gray-400'></i>
          </button>
        </div>
      </div>

      {/* About */}
      <div className="relative glass-panel border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-500/20 to-gray-700/20 border border-white/10 rounded-xl flex items-center justify-center mr-4">
            <i className='bx bx-info-circle text-2xl text-gray-400'></i>
          </div>
          <h2 className="text-xl font-bold text-white">About</h2>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-gray-400">Version</span>
            <span className="font-semibold text-white">1.0.0</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-white/5 border border-white/10 rounded-xl">
            <span className="text-gray-400">Last Updated</span>
            <span className="font-semibold text-white">January 2024</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium text-white transition-all duration-200 border border-white/10">
              <i className='bx bx-lock-alt mr-2'></i>
              Privacy Policy
            </button>
            <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl font-medium text-white transition-all duration-200 border border-white/10">
              <i className='bx bx-file-blank mr-2'></i>
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Clear Chat Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="glass-panel border border-white/10 rounded-2xl max-w-md w-full p-8 shadow-2xl backdrop-blur-xl animate-scale-in">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className='bx bx-trash text-3xl text-red-400'></i>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 text-center">
              Clear Chat History?
            </h3>
            <p className="text-gray-400 mb-6 text-center">
              This action cannot be undone. All your chat messages will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-medium hover:bg-white/10 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleClearChatHistory}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/30 transition-all duration-200"
              >
                Clear History
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
