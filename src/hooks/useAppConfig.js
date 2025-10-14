import { useState, useEffect } from 'react';
import { configService } from '../services/configService';
import defaultConfig from '../config/app.config.json';

export const useAppConfig = () => {
  const [config, setConfig] = useState(defaultConfig);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    const appId = localStorage.getItem('app_id');
    if (appId) {
      const appConfig = await configService.loadConfig(appId);
      setConfig(appConfig);
      configService.setCurrentConfig(appConfig);
    }
  };

  return config;
};
