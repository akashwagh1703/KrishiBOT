import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const defaultConfig = {
  ui: { topbar_visible: true, sidebar_visible: true, theme_toggle_enabled: true, language_switcher_enabled: true },
  features: { weather_module: true, schemes_module: true, plant_protection_module: true, chat_module: true },
  appearance: { default_theme: 'light', default_language: 'en' },
  colors: { primary: 'green', secondary: 'emerald' },
  branding: { app_name: 'ChatBot', show_logo: true }
};

const ClientConfig = () => {
  const [appId, setAppId] = useState('');
  const [appInfo, setAppInfo] = useState(null);
  const [config, setConfig] = useState(defaultConfig);
  const [activeTab, setActiveTab] = useState('ui');
  const [hasChanges, setHasChanges] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const clientAppId = localStorage.getItem('client_app_id');
    if (!clientAppId) {
      navigate('/client-login');
      return;
    }
    setAppId(clientAppId);
    fetchConfig(clientAppId);
  }, []);

  const fetchConfig = async (id) => {
    try {
      const apps = JSON.parse(localStorage.getItem('admin_apps') || '[]');
      const app = apps.find(a => a.app_id === id);
      setAppInfo(app);

      const saved = localStorage.getItem(`app_config_${id}`);
      setConfig(saved ? JSON.parse(saved) : defaultConfig);
    } catch (error) {
      toast.error('Failed to fetch config');
    }
  };

  const saveConfig = async () => {
    try {
      localStorage.setItem(`app_config_${appId}`, JSON.stringify(config));
      toast.success('Configuration saved');
      setHasChanges(false);
    } catch (error) {
      toast.error('Failed to save config');
    }
  };

  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `config_${appId}.json`;
    link.click();
    toast.success('Configuration exported');
  };

  const importConfig = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        setConfig(imported);
        setHasChanges(true);
        toast.success('Configuration imported');
      } catch (error) {
        toast.error('Invalid config file');
      }
    };
    reader.readAsText(file);
  };

  const handleLogout = () => {
    localStorage.removeItem('client_auth');
    localStorage.removeItem('client_app_id');
    toast.success('Logged out');
    navigate('/client-login');
  };

  const handleToggle = (section, key) => {
    setConfig(prev => ({
      ...prev,
      [section]: { ...prev[section], [key]: !prev[section][key] }
    }));
    setHasChanges(true);
  };

  const handleChange = (section, key, value) => {
    setConfig(prev => ({
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

  const renderSection = (section, title) => {
    const items = Object.entries(config[section] || {});

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
              ) : (
                <input
                  type="text"
                  value={value}
                  onChange={(e) => handleChange(section, key, e.target.value)}
                  className="w-48 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (!appInfo) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
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
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <i className="bx bx-log-out text-xl"></i>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Configuration</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Customize your chatbot settings</p>
            </div>
            <div className="flex items-center space-x-3">
              <label className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer transition-colors">
                <i className="bx bx-import mr-2"></i>Import
                <input type="file" accept=".json" onChange={importConfig} className="hidden" />
              </label>
              <button
                onClick={exportConfig}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                <i className="bx bx-export mr-2"></i>Export
              </button>
              {hasChanges && (
                <button
                  onClick={saveConfig}
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">
            {activeTab === 'ui' && renderSection('ui', 'UI Settings')}
            {activeTab === 'features' && renderSection('features', 'Features')}
            {activeTab === 'appearance' && renderSection('appearance', 'Appearance')}
            {activeTab === 'colors' && renderSection('colors', 'Colors')}
            {activeTab === 'branding' && renderSection('branding', 'Branding')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientConfig;
