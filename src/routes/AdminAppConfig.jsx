import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import config from '../config/app.config.json';

const AdminAppConfig = () => {
  const { appId } = useParams();
  const [appInfo, setAppInfo] = useState(null);
  const [settings, setSettings] = useState(config);
  const [activeTab, setActiveTab] = useState('ui');
  const [hasChanges, setHasChanges] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppConfig();
  }, [appId]);

  const fetchAppConfig = async () => {
    try {
      // TODO: const response = await axios.get(`/api/v1/admin/apps/${appId}/config`);
      const apps = JSON.parse(localStorage.getItem('admin_apps') || '[]');
      const app = apps.find(a => a.app_id === appId);
      setAppInfo(app);

      const savedConfig = localStorage.getItem(`app_config_${appId}`);
      if (savedConfig) {
        setSettings(JSON.parse(savedConfig));
      } else {
        setSettings(config);
      }
    } catch (error) {
      toast.error('Failed to fetch app configuration');
    }
  };

  const updateConfig = async () => {
    try {
      // TODO: await axios.put(`/api/v1/admin/apps/${appId}/config`, settings);
      localStorage.setItem(`app_config_${appId}`, JSON.stringify(settings));
      toast.success('Configuration updated successfully');
      setHasChanges(false);
    } catch (error) {
      toast.error('Failed to update configuration');
    }
  };

  const resetConfig = () => {
    setSettings(config);
    setHasChanges(false);
    toast.success('Configuration reset to defaults');
  };

  const handleToggle = (section, key) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: !prev[section][key] }
    }));
    setHasChanges(true);
  };

  const handleInputChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
    setHasChanges(true);
  };

  const tabs = [
    { id: 'ui', label: 'UI Settings', icon: 'bx-layout' },
    { id: 'features', label: 'Features', icon: 'bx-cog' },
    { id: 'appearance', label: 'Appearance', icon: 'bx-palette' },
    { id: 'colors', label: 'Colors', icon: 'bx-color-fill' },
    { id: 'branding', label: 'Branding', icon: 'bx-badge' }
  ];

  const renderToggleSection = (section, title) => {
    const items = Object.entries(settings[section] || {});

    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{title}</h2>
        <div className="space-y-3">
          {items.map(([key, value]) => (
            <div key={key} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                {key.replace(/_/g, ' ')}
              </label>
              {typeof value === 'boolean' ? (
                <button
                  onClick={() => handleToggle(section, key)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    value ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`}
                >
                  <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    value ? 'translate-x-6' : 'translate-x-1'
                  }`} />
                </button>
              ) : typeof value === 'number' ? (
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleInputChange(section, key, parseInt(e.target.value))}
                  className="w-24 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleInputChange(section, key, e.target.value)}
                  className="w-48 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAppearanceSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Appearance Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Theme</label>
          <select
            value={settings.appearance.default_theme}
            onChange={(e) => handleInputChange('appearance', 'default_theme', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Default Language</label>
          <select
            value={settings.appearance.default_language}
            onChange={(e) => handleInputChange('appearance', 'default_language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            {settings.languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderColorsSection = () => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Color Settings</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Primary Color</label>
          <select
            value={settings.colors.primary}
            onChange={(e) => handleInputChange('colors', 'primary', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="green">Green</option>
            <option value="blue">Blue</option>
            <option value="purple">Purple</option>
            <option value="red">Red</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Secondary Color</label>
          <select
            value={settings.colors.secondary}
            onChange={(e) => handleInputChange('colors', 'secondary', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="emerald">Emerald</option>
            <option value="teal">Teal</option>
            <option value="cyan">Cyan</option>
          </select>
        </div>
      </div>
    </div>
  );

  if (!appInfo) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => navigate('/admin/apps')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white mb-3"
          >
            <i className="bx bx-arrow-back"></i>
            <span className="text-sm">Back to Apps</span>
          </button>
          <h1 className="text-lg font-bold text-gray-800 dark:text-white">{appInfo.name}</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{appInfo.app_id}</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              <i className={`bx ${tab.icon} text-xl`}></i>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Configuration</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customize chatbot settings for this app</p>
            </div>
            {hasChanges && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={resetConfig}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  Reset
                </button>
                <button
                  onClick={updateConfig}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {activeTab === 'ui' && renderToggleSection('ui', 'UI Settings')}
            {activeTab === 'features' && renderToggleSection('features', 'Feature Modules')}
            {activeTab === 'appearance' && renderAppearanceSection()}
            {activeTab === 'colors' && renderColorsSection()}
            {activeTab === 'branding' && renderToggleSection('branding', 'Branding')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAppConfig;
