import axios from 'axios';
import config from '../config/app.config.json';

// Mock data imports
import weatherData from '../mocks/weather.json';
import schemesData from '../mocks/schemes.json';
import schemeDetailsData from '../mocks/scheme_details.json';
import plantProtectionData from '../mocks/plant_protection.json';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  timeout: config.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Cache utilities
const CACHE_DURATION = config.performance.cache_enabled ? 60 * 60 * 1000 : 0; // 1 hour
const CACHE_VERSION = `v1_${config.api.use_mock_data ? 'mock' : 'api'}`;

const getFromCache = (key) => {
  if (!config.performance.cache_enabled) return null;
  const cached = localStorage.getItem(key);
  if (cached) {
    const { data, timestamp, version } = JSON.parse(cached);
    if (version === CACHE_VERSION && Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
    localStorage.removeItem(key);
  }
  return null;
};

const setCache = (key, data) => {
  if (config.performance.cache_enabled) {
    localStorage.setItem(key, JSON.stringify({
      data,
      timestamp: Date.now(),
      version: CACHE_VERSION
    }));
  }
};

export const weatherAPI = {
  async getCurrent(location = 'Delhi') {
    const cacheKey = `weather_${location}`;
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    if (config.api.use_mock_data) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = weatherData;
      setCache(cacheKey, data);
      return data;
    }

    try {
      const response = await api.get(`/weather/current?location=${location}`);
      setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Weather API error:', error);
      return weatherData;
    }
  },

  async getForecast(location = 'Delhi') {
    const cacheKey = `forecast_${location}`;
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    if (config.api.use_mock_data) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const data = weatherData.forecast;
      setCache(cacheKey, data);
      return data;
    }

    try {
      const response = await api.get(`/weather/forecast?location=${location}`);
      setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Forecast API error:', error);
      return weatherData.forecast;
    }
  }
};

export const schemesAPI = {
  async getAll() {
    const cacheKey = 'schemes_all';
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    if (config.api.use_mock_data) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setCache(cacheKey, schemesData);
      return schemesData;
    }

    try {
      const response = await api.get('schemes/list');
      const schemes = response.data?.data?.schemes || response.data;
      setCache(cacheKey, schemes);
      return schemes;
    } catch (error) {
      console.error('Schemes API error:', error);
      throw error;
    }
  },

  async getDetails(schemeName) {
    if (config.api.use_mock_data) {
      await new Promise(resolve => setTimeout(resolve, 200));
      return schemeDetailsData[schemeName] || null;
    }

    try {
      const response = await api.get(`schemes/details/${schemeName}`);
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Scheme details error:', error);
      throw error;
    }
  },

  async getById(id) {
    return this.getDetails(id);
  },

  async search(query, filters = {}) {
    if (config.api.use_mock_data) {
      await new Promise(resolve => setTimeout(resolve, 300));
      let results = schemesData;
      
      if (query) {
        results = results.filter(scheme => 
          scheme.name.toLowerCase().includes(query.toLowerCase()) ||
          scheme.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      if (filters.category) {
        results = results.filter(scheme => scheme.category === filters.category);
      }
      
      return results;
    }

    try {
      const response = await api.get('/schemes/search', { params: { query, ...filters } });
      return response.data;
    } catch (error) {
      console.error('Scheme search error:', error);
      return [];
    }
  }
};

export const plantProtectionAPI = {
  async getCrops() {
    if (config.api.use_mock_data) {
      await new Promise(resolve => setTimeout(resolve, 100));
      return plantProtectionData.crops;
    }

    try {
      const response = await api.get('crops/list');
      return response.data?.data?.crops || response.data;
    } catch (error) {
      console.error('Crops API error:', error);
      throw error;
    }
  },

  async getDiseases(crop) {
    if (config.api.use_mock_data) {
      await new Promise(resolve => setTimeout(resolve, 100));
      const filteredDiseases = plantProtectionData.diseases
        .filter(d => d.affected_crops?.some(c => c.toUpperCase() === crop.toUpperCase()))
        .map(d => d.name);
      return filteredDiseases;
    }

    try {
      const response = await api.get('crops/diseases');
      const allDiseases = response.data?.data?.diseases || response.data;
      const filteredDiseases = allDiseases
        .filter(d => d.affected_crops?.some(c => c.toUpperCase() === crop.toUpperCase()))
        .map(d => d.name);
      return filteredDiseases;
    } catch (error) {
      console.error('Diseases API error:', error);
      throw error;
    }
  },

  async getChemicals(crop, disease) {
    if (config.api.use_mock_data) {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { chemicals: plantProtectionData.chemicals };
    }

    try {
      const response = await api.post('crops/chemicals', { crop, disease });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Chemicals API error:', error);
      throw error;
    }
  },

  async getPlantProtection(crop, disease, chemical) {
    if (config.api.use_mock_data) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const diagnosis = plantProtectionData.diagnoses.find(
        d => d.crop === crop && d.disease === disease
      );
      return diagnosis || null;
    }

    try {
      const params = { crop, disease };
      if (chemical) params.chemical = chemical;
      const response = await api.get('/v1/crops/plant-protection', { params });
      return response.data?.data || response.data;
    } catch (error) {
      console.error('Plant protection API error:', error);
      throw error;
    }
  },

  async getAll() {
    const cacheKey = 'plant_protection_all';
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    if (config.api.use_mock_data) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setCache(cacheKey, plantProtectionData);
      return plantProtectionData;
    }

    try {
      const response = await api.get('crops/plant-protection');
      setCache(cacheKey, response.data);
      return response.data;
    } catch (error) {
      console.error('Plant protection API error:', error);
      throw error;
    }
  }
};

// Chatbot API for unguided flow
export const chatbotAPI = {
  async ask(question, context = {}) {
    if (config.api.use_mock_data) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return {
        answer: "I'm here to help! Please use the suggestion buttons or menu options to navigate through different features like Weather, Schemes, and Plant Protection.",
        suggestions: [
          { text: 'Weather Info', action: 'weather' },
          { text: 'Schemes', action: 'schemes' },
          { text: 'Plant Protection', action: 'plant-protection' }
        ]
      };
    }

    try {
      const response = await api.post('chatbot/ask', { question, context });
      return response.data;
    } catch (error) {
      console.error('Chatbot API error:', error);
      throw error;
    }
  }
};

// Authentication API
export const authAPI = {
  async sendOTP(mobile_no) {
    if (config.api.use_mock_data) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const userData = { mobile_no, timestamp: Date.now() };
      localStorage.setItem('user_data', JSON.stringify(userData));
      return { success: true, message: 'OTP sent successfully' };
    }

    try {
      const response = await api.post('login/send-login-otp', { mobile_no });
      const userData = { mobile_no, timestamp: Date.now() };
      localStorage.setItem('user_data', JSON.stringify(userData));
      return response.data;
    } catch (error) {
      console.error('Send OTP error:', error);
      throw error;
    }
  },

  async verifyOTP(mobile_no, otp) {
    if (config.api.use_mock_data) {
      await new Promise(resolve => setTimeout(resolve, 500));
      localStorage.setItem('is_authenticated', 'true');
      return { success: true, token: 'mock_token' };
    }

    try {
      const response = await api.post('login/verify-login-otp', { mobile_no, otp });
      if (response.data.token) {
        localStorage.setItem('auth_token', response.data.token);
      }
      localStorage.setItem('is_authenticated', 'true');
      return response.data;
    } catch (error) {
      console.error('Verify OTP error:', error);
      throw error;
    }
  },

  logout() {
    localStorage.removeItem('user_data');
    localStorage.removeItem('is_authenticated');
    localStorage.removeItem('auth_token');
  },

  isAuthenticated() {
    return localStorage.getItem('is_authenticated') === 'true';
  },

  getUserData() {
    const data = localStorage.getItem('user_data');
    return data ? JSON.parse(data) : null;
  }
};

// Error handling wrapper
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    return {
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    return {
      message: 'Network error. Please check your connection.',
      status: 0
    };
  } else {
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1
    };
  }
};

export default api;