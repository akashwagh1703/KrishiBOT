import appConfig from './app.config.json';

export const config = appConfig;

export const getConfig = (path) => {
  return path.split('.').reduce((obj, key) => obj?.[key], config);
};

export default config;