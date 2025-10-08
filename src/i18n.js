import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      guidedFlow: 'Guided Flow',
      weather: 'Weather',
      schemes: 'Government Schemes',
      plantProtection: 'Plant Protection',
      chat: 'Chat',
      settings: 'Settings',
      profile: 'Profile',
      
      // Common
      search: 'Search...',
      loading: 'Loading...',
      error: 'Error occurred',
      retry: 'Retry',
      readMore: 'Read More',
      close: 'Close',
      
      // Weather
      currentWeather: 'Current Weather',
      forecast: 'Forecast',
      temperature: 'Temperature',
      humidity: 'Humidity',
      windSpeed: 'Wind Speed',
      sunrise: 'Sunrise',
      sunset: 'Sunset',
      
      // Schemes
      eligibility: 'Eligibility',
      deadline: 'Deadline',
      benefits: 'Benefits',
      howToApply: 'How to Apply',
      
      // Plant Protection
      selectCrop: 'Select Crop',
      symptoms: 'Symptoms',
      diagnosis: 'Diagnosis',
      treatment: 'Treatment',
      prevention: 'Prevention',
      
      // Chat
      typeMessage: 'Type your message...',
      send: 'Send',
      quickReplies: 'Quick Replies',
      askWeather: 'Ask about weather',
      askSchemes: 'Ask about schemes',
      askProtection: 'Ask about plant protection'
    }
  },
  hi: {
    translation: {
      // Navigation
      home: 'होम',
      guidedFlow: 'गाइडेड फ्लो',
      weather: 'मौसम',
      schemes: 'सरकारी योजनाएं',
      plantProtection: 'पौधा संरक्षण',
      chat: 'चैट',
      settings: 'सेटिंग्स',
      profile: 'प्रोफाइल',
      
      // Common
      search: 'खोजें...',
      loading: 'लोड हो रहा है...',
      error: 'त्रुटि हुई',
      retry: 'पुनः प्रयास करें',
      readMore: 'और पढ़ें',
      close: 'बंद करें',
      
      // Weather
      currentWeather: 'वर्तमान मौसम',
      forecast: 'पूर्वानुमान',
      temperature: 'तापमान',
      humidity: 'आर्द्रता',
      windSpeed: 'हवा की गति',
      sunrise: 'सूर्योदय',
      sunset: 'सूर्यास्त',
      
      // Schemes
      eligibility: 'पात्रता',
      deadline: 'अंतिम तिथि',
      benefits: 'लाभ',
      howToApply: 'आवेदन कैसे करें',
      
      // Plant Protection
      selectCrop: 'फसल चुनें',
      symptoms: 'लक्षण',
      diagnosis: 'निदान',
      treatment: 'उपचार',
      prevention: 'रोकथाम',
      
      // Chat
      typeMessage: 'अपना संदेश टाइप करें...',
      send: 'भेजें',
      quickReplies: 'त्वरित उत्तर',
      askWeather: 'मौसम के बारे में पूछें',
      askSchemes: 'योजनाओं के बारे में पूछें',
      askProtection: 'पौधा संरक्षण के बारे में पूछें'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;