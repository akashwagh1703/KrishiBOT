import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../state/store';
import { config } from '../../config';
import ThemeToggle from '../ui/ThemeToggle';
import LanguageSwitcher from '../ui/LanguageSwitcher';

const Header = () => {
  const { t } = useTranslation();
  const { toggleSidebar } = useAppStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications] = useState([
    { id: 1, type: 'weather', title: 'Heavy Rain Alert', message: 'Expected in your area tomorrow', time: '2 hours ago', icon: 'bx-cloud-rain', color: 'blue' },
    { id: 2, type: 'scheme', title: 'New Scheme Available', message: 'PM-KISAN payment released', time: '5 hours ago', icon: 'bx-file', color: 'green' },
    { id: 3, type: 'crop', title: 'Crop Advisory', message: 'Best time for wheat sowing', time: '1 day ago', icon: 'bx-leaf', color: 'emerald' }
  ]);

  const handleSearch = e => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/schemes?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg border-b border-surface-200 dark:border-surface-700 shadow-soft">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Left section */}
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 lg:hidden transition-colors"
              aria-label="Toggle sidebar"
            >
              <i className="bx bx-menu text-xl"></i>
            </button>

            <Link to="/" className="flex items-center space-x-2 group">
              {config.branding.show_logo && (
                <img src={config.branding.logo_icon} alt="Logo" className="w-8 h-8" />
              )}
              {config.branding.show_name && (
                <span className="text-lg font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                  {config.branding.app_name}
                </span>
              )}
            </Link>
          </div>

          {/* Center section - Search */}
          {config.ui.search_enabled && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <form onSubmit={handleSearch} className="w-full relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder={t('search')}
                  className="input-field pl-10 pr-4 py-2 text-sm"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="bx bx-search text-gray-400"></i>
                </div>
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-primary-600 transition-colors"
                >
                  <i className="bx bx-right-arrow-alt"></i>
                </button>
              </form>
            </div>
          )}

          {/* Right section */}
          <div className="flex items-center space-x-3">
            {/* Client Logos */}
            {config.branding.show_client_logos && config.branding.client_logos && (
              <div className="hidden lg:flex items-center space-x-3 mr-4">
                {config.branding.client_logos.map((logo, index) => (
                  <img key={index} src={logo} alt={`Client ${index + 1}`} className="h-8 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity" />
                ))}
              </div>
            )}
            
            {config.ui.theme_toggle_enabled && <ThemeToggle />}
            {config.ui.language_switcher_enabled && <LanguageSwitcher />}

            {/* Notifications */}
            {config.ui.notifications_enabled && (
              <div className="relative">
                <button onClick={() => setShowNotifications(!showNotifications)} className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors relative">
                  <i className="bx bx-bell text-xl"></i>
                  {notifications.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-semibold">{notifications.length}</span>
                  )}
                </button>
                
                {showNotifications && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)}></div>
                    <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-surface-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 animate-fade-in">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                          <span className="text-xs bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 px-2 py-1 rounded-full">{notifications.length} New</span>
                        </div>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map(notif => (
                          <div key={notif.id} className="p-4 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-surface-700 transition-colors cursor-pointer">
                            <div className="flex items-start space-x-3">
                              <div className={`w-10 h-10 bg-${notif.color}-100 dark:bg-${notif.color}-900 rounded-lg flex items-center justify-center flex-shrink-0`}>
                                <i className={`bx ${notif.icon} text-xl text-${notif.color}-600 dark:text-${notif.color}-400`}></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 dark:text-white text-sm">{notif.title}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{notif.message}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{notif.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-gray-200 dark:border-gray-700">
                        <Link to="/settings" onClick={() => setShowNotifications(false)} className="block text-center text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                          View All Notifications
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Profile */}
            {config.ui.profile_enabled && (
            <Link
              to="/profile"
              className="p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
              aria-label="Profile"
            >
              <i className="bx bx-user text-xl"></i>
            </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search */}
      {config.ui.search_enabled && (
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('search')}
              className="input-field pl-10 pr-4 py-2 text-sm"
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <i className="bx bx-search text-gray-400"></i>
            </div>
          </form>
        </div>
      )}
    </header>
  );
};

export default Header;
