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
      {/* Animated Background Circles */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 left-10 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Header */}
      <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        <div className="relative">
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center">
            <i className='bx bx-cog text-4xl mr-3'></i>
            {t('settings')}
          </h1>
          <p className="text-indigo-50">
            Customize your KisanBot experience
          </p>
        </div>
      </div>

      {/* Appearance */}
      <div className="relative bg-white dark:bg-surface-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
            <i className='bx bx-palette text-2xl text-white'></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Appearance</h2>
        </div>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-surface-700 rounded-xl">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">Theme Mode</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Choose between light and dark mode
            </p>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Language */}
      <div className="relative bg-white dark:bg-surface-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4">
            <i className='bx bx-world text-2xl text-white'></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Language</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => handleLanguageChange('en')}
            className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
              language === 'en'
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center">
              <span className="text-4xl mr-4">🇺🇸</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-lg">English</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Default Language</div>
              </div>
              {language === 'en' && <i className='bx bx-check-circle text-2xl text-blue-500 ml-auto'></i>}
            </div>
          </button>
          
          <button
            onClick={() => handleLanguageChange('hi')}
            className={`p-6 rounded-2xl border-2 transition-all duration-200 text-left ${
              language === 'hi'
                ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 shadow-lg'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-center">
              <span className="text-4xl mr-4">🇮🇳</span>
              <div>
                <div className="font-semibold text-gray-900 dark:text-white text-lg">हिंदी</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Hindi Language</div>
              </div>
              {language === 'hi' && <i className='bx bx-check-circle text-2xl text-blue-500 ml-auto'></i>}
            </div>
          </button>
        </div>
      </div>

      {/* Notifications */}
      <div className="relative bg-white dark:bg-surface-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
            <i className='bx bx-bell text-2xl text-white'></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notifications</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-surface-700 rounded-xl hover:bg-gray-100 dark:hover:bg-surface-600 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4">
                <i className='bx bx-cloud-rain text-xl text-blue-600 dark:text-blue-400'></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Weather Alerts</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Severe weather notifications</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.weather} onChange={() => toggleNotification('weather')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-surface-700 rounded-xl hover:bg-gray-100 dark:hover:bg-surface-600 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mr-4">
                <i className='bx bx-file text-xl text-green-600 dark:text-green-400'></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Scheme Updates</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">New government schemes</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.schemes} onChange={() => toggleNotification('schemes')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-surface-700 rounded-xl hover:bg-gray-100 dark:hover:bg-surface-600 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-lg flex items-center justify-center mr-4">
                <i className='bx bx-leaf text-xl text-emerald-600 dark:text-emerald-400'></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Crop Tips</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Seasonal farming advice</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={notifications.cropTips} onChange={() => toggleNotification('cropTips')} />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-surface-700 rounded-xl hover:bg-gray-100 dark:hover:bg-surface-600 transition-colors">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mr-4">
                <i className='bx bx-rupee text-xl text-yellow-600 dark:text-yellow-400'></i>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">Market Prices</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Crop price updates</p>
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
      <div className="relative bg-white dark:bg-surface-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
            <i className='bx bx-shield text-2xl text-white'></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Data & Privacy</h2>
        </div>
        <div className="space-y-3">
          <button onClick={() => setShowClearConfirm(true)} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-surface-700 hover:bg-gray-100 dark:hover:bg-surface-600 rounded-xl transition-all duration-200 group">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <i className='bx bx-trash text-xl text-red-600 dark:text-red-400'></i>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900 dark:text-white">Clear Chat History</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Remove all stored messages</p>
              </div>
            </div>
            <i className='bx bx-chevron-right text-gray-400'></i>
          </button>
          
          <button onClick={exportData} className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-surface-700 hover:bg-gray-100 dark:hover:bg-surface-600 rounded-xl transition-all duration-200 group">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform">
                <i className='bx bx-download text-xl text-blue-600 dark:text-blue-400'></i>
              </div>
              <div className="text-left">
                <h3 className="font-medium text-gray-900 dark:text-white">Export Data</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Download settings & preferences</p>
              </div>
            </div>
            <i className='bx bx-chevron-right text-gray-400'></i>
          </button>
        </div>
      </div>

      {/* About */}
      <div className="relative bg-white dark:bg-surface-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl flex items-center justify-center mr-4">
            <i className='bx bx-info-circle text-2xl text-white'></i>
          </div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">About</h2>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-surface-700 rounded-xl">
            <span className="text-gray-600 dark:text-gray-400">Version</span>
            <span className="font-semibold text-gray-900 dark:text-white">1.0.0</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-surface-700 rounded-xl">
            <span className="text-gray-600 dark:text-gray-400">Last Updated</span>
            <span className="font-semibold text-gray-900 dark:text-white">January 2024</span>
          </div>
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button className="px-6 py-3 bg-gray-50 dark:bg-surface-700 hover:bg-gray-100 dark:hover:bg-surface-600 rounded-xl font-medium text-gray-900 dark:text-white transition-all duration-200 border border-gray-200 dark:border-gray-700">
              <i className='bx bx-lock-alt mr-2'></i>
              Privacy Policy
            </button>
            <button className="px-6 py-3 bg-gray-50 dark:bg-surface-700 hover:bg-gray-100 dark:hover:bg-surface-600 rounded-xl font-medium text-gray-900 dark:text-white transition-all duration-200 border border-gray-200 dark:border-gray-700">
              <i className='bx bx-file-blank mr-2'></i>
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Clear Chat Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white dark:bg-surface-800 rounded-3xl max-w-md w-full p-8 shadow-2xl border border-gray-100 dark:border-gray-700 animate-scale-in">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className='bx bx-trash text-3xl text-red-600 dark:text-red-400'></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
              Clear Chat History?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
              This action cannot be undone. All your chat messages will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 px-6 py-3 bg-gray-100 dark:bg-surface-700 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-surface-600 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleClearChatHistory}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
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
