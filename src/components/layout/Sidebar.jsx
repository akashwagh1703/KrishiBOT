import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppStore } from '../../state/store';
import { config } from '../../config';
import classNames from 'classnames';
import 'boxicons/css/boxicons.min.css';

const Sidebar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const { sidebarOpen, setSidebarOpen } = useAppStore();

  const navigation = [
    {
      name: t('home'),
      href: '/',
      icon: 'bx-home'
    },
    {
      name: t('weather'),
      href: '/weather',
      icon: 'bx-cloud'
    },
    {
      name: t('schemes'),
      href: '/schemes',
      icon: 'bx-building'
    },
    {
      name: t('plantProtection'),
      href: '/plant-protection',
      icon: 'bx-leaf'
    },
    {
      name: t('chat'),
      href: '/chat',
      icon: 'bx-chat'
    },
    {
      name: t('settings'),
      href: '/settings',
      icon: 'bx-cog'
    }
  ];

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  if (!config.ui.sidebar_visible) return null;

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={classNames(
          'fixed bottom-0 left-0 z-40 w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static',
          config.ui.topbar_visible ? 'top-16' : 'top-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          {!config.ui.topbar_visible && (
          <div className="flex items-center justify-center p-4 border-b border-gray-200 dark:border-gray-700 lg:hidden">
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <i className="bx bx-x text-xl"></i>
            </button>
          </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={classNames(
                  'flex items-center justify-center px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                )}
                title={item.name}
              >
                <i className={`bx ${item.icon} text-lg`}></i>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              {config.branding.version}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;