import axios from 'axios';
import { config } from '../config';

// Mock data imports
import weatherData from '../mocks/weather.json';
import schemesData from '../mocks/schemes.json';
import plantProtectionData from '../mocks/plant_protection.json';

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: config.api.timeout,
});

// Cache utilities
const CACHE_DURATION = config.performance.cache_enabled ? 60 * 60 * 1000 : 0; // 1 hour
const getFromCache = (key) => {
  if (!config.performance.cache_enabled) return null;
  const cached = localStorage.getItem(key);
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
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
      timestamp: Date.now()
    }));
  }
};

// Mock API functions - Replace with real API calls when integrating
export const weatherAPI = {
  async getCurrent(location = 'Delhi') {
    // Check cache first
    const cacheKey = `weather_${location}`;
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In production, replace with:
    // const response = await api.get(`/weather/current?location=${location}`);
    // return response.data;
    
    const data = weatherData;
    setCache(cacheKey, data);
    return data;
  },

  async getForecast(location = 'Delhi') {
    const cacheKey = `forecast_${location}`;
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    await new Promise(resolve => setTimeout(resolve, 500));
    
    // In production, replace with:
    // const response = await api.get(`/weather/forecast?location=${location}`);
    // return response.data;
    
    const data = weatherData.forecast;
    setCache(cacheKey, data);
    return data;
  }
};

export const schemesAPI = {
  async getAll() {
    const cacheKey = 'schemes_all';
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In production, replace with:
    // const response = await api.get('/schemes');
    // return response.data;
    
    setCache(cacheKey, schemesData);
    return schemesData;
  },

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // In production, replace with:
    // const response = await api.get(`/schemes/${id}`);
    // return response.data;
    
    return schemesData.find(scheme => scheme.id === id);
  },

  async search(query, filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let results = schemesData;
    
    if (query) {
      results = results.filter(scheme => 
        scheme.title.toLowerCase().includes(query.toLowerCase()) ||
        scheme.shortDescription.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (filters.category) {
      results = results.filter(scheme => scheme.category === filters.category);
    }
    
    if (filters.cropType) {
      results = results.filter(scheme => 
        scheme.cropTypes.includes('All') || scheme.cropTypes.includes(filters.cropType)
      );
    }
    
    return results;
  }
};

export const plantProtectionAPI = {
  async getCrops() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return plantProtectionData.crops;
  },

  async getSymptoms() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return plantProtectionData.symptoms;
  },

  async diagnose(crop, symptoms) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In production, replace with:
    // const response = await api.post('/plant-protection/diagnose', { crop, symptoms });
    // return response.data;
    
    const matches = plantProtectionData.diagnoses.filter(diagnosis => 
      diagnosis.crop === crop && 
      symptoms.some(symptom => diagnosis.symptoms.includes(symptom))
    );
    
    return matches.length > 0 ? matches[0] : {
      id: 'unknown',
      crop,
      symptoms,
      disease: 'Unknown Issue',
      cause: 'Unable to determine exact cause',
      severity: 'Unknown',
      treatment: ['Consult local agricultural expert', 'Take clear photos of affected plants'],
      prevention: ['Regular monitoring', 'Maintain field hygiene'],
      organicTreatment: ['Neem oil spray', 'Organic compost application']
    };
  },

  async getPreventiveTips() {
    await new Promise(resolve => setTimeout(resolve, 100));
    return plantProtectionData.preventiveTips;
  },

  async getAll() {
    const cacheKey = 'plant_protection_all';
    const cached = getFromCache(cacheKey);
    if (cached) return cached;

    await new Promise(resolve => setTimeout(resolve, 300));
    
    // In production, replace with:
    // const response = await api.get('/plant-protection');
    // return response.data;
    
    setCache(cacheKey, plantProtectionData);
    return plantProtectionData;
  }
};

// Error handling wrapper
export const handleAPIError = (error) => {
  console.error('API Error:', error);
  
  if (error.response) {
    // Server responded with error status
    return {
      message: error.response.data?.message || 'Server error occurred',
      status: error.response.status
    };
  } else if (error.request) {
    // Network error
    return {
      message: 'Network error. Please check your connection.',
      status: 0
    };
  } else {
    // Other error
    return {
      message: error.message || 'An unexpected error occurred',
      status: -1
    };
  }
};

export default api;