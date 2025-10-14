import defaultConfig from '../config/app.config.json';

export const configService = {
  async loadConfig(appId) {
    try {
      // TODO: const response = await axios.get(`/api/v1/config/${appId}`);
      // return response.data.data.config;
      
      // Mock: Load from localStorage (set by admin panel)
      const savedConfig = localStorage.getItem(`app_config_${appId}`);
      return savedConfig ? JSON.parse(savedConfig) : defaultConfig;
    } catch (error) {
      console.error('Failed to load config:', error);
      return defaultConfig;
    }
  },

  getCurrentConfig() {
    const config = localStorage.getItem('current_app_config');
    return config ? JSON.parse(config) : defaultConfig;
  },

  setCurrentConfig(config) {
    localStorage.setItem('current_app_config', JSON.stringify(config));
  }
};
