import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { weatherAPI, handleAPIError } from '../../services/api';
import WeatherCard from '../../components/guided/WeatherCard';
import Button from '../../components/ui/Button';

const WeatherPage = () => {
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await weatherAPI.getCurrent();
      setWeatherData(data);
    } catch (err) {
      setError(handleAPIError(err));
    } finally {
      setLoading(false);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // In a real app, this would register/unregister for push notifications
    alert(notificationsEnabled ? 'Weather notifications disabled' : 'Weather notifications enabled');
  };

  const getFarmingAdvice = (weather) => {
    const advice = [];
    
    if (weather.current.temperature > 35) {
      advice.push('🌡️ High temperature alert: Increase irrigation frequency and provide shade for sensitive crops');
    }
    
    if (weather.current.humidity > 80) {
      advice.push('💧 High humidity: Monitor for fungal diseases and ensure good air circulation');
    }
    
    if (weather.current.windSpeed > 20) {
      advice.push('💨 Strong winds: Secure tall crops and check for physical damage');
    }
    
    // Check for rain in forecast
    const rainDays = weather.forecast.filter(day => day.precipitation > 50).length;
    if (rainDays > 2) {
      advice.push('🌧️ Heavy rain expected: Ensure proper drainage and delay fertilizer application');
    }
    
    if (advice.length === 0) {
      advice.push('✅ Weather conditions are favorable for normal farming activities');
    }
    
    return advice;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-500 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="bx bx-cloud text-blue-500 text-2xl animate-pulse"></i>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 animate-pulse">{t('loading')} weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold mb-2">{t('error')}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error.message}</p>
        </div>
        <Button onClick={loadWeatherData}>{t('retry')}</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/30 rounded-full -translate-y-16 translate-x-16 animate-bounce-gentle"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-indigo-200/30 rounded-full translate-y-12 -translate-x-12 animate-bounce-gentle" style={{animationDelay: '1s'}}></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-500 rounded-2xl shadow-lg">
              <i className="bx bx-cloud text-white text-2xl"></i>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{t('weather')}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 text-lg">Current conditions and 7-day forecast</p>
          <div className="flex gap-3 mt-6">
            <button
              onClick={toggleNotifications}
              className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <i className={`bx ${notificationsEnabled ? 'bx-bell-off' : 'bx-bell'} text-blue-600`}></i>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {notificationsEnabled ? 'Disable Alerts' : 'Enable Alerts'}
              </span>
            </button>
            <button
              onClick={loadWeatherData}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-xl text-white transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <i className="bx bx-refresh text-white"></i>
              <span className="text-sm font-medium">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Current Weather */}
      <div className="transform hover:scale-[1.02] transition-all duration-300">
        <WeatherCard weather={weatherData.current} />
      </div>

      {/* Weather Alerts */}
      {weatherData.alerts && weatherData.alerts.length > 0 && (
        <div className="bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-3xl p-6 border border-yellow-200 dark:border-yellow-700 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-yellow-500 rounded-2xl shadow-lg">
              <i className="bx bx-error text-white text-2xl"></i>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Weather Alerts</h3>
          </div>
          <div className="space-y-3">
            {weatherData.alerts.map((alert, index) => (
              <div key={index} className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-yellow-200/50 dark:border-yellow-700/50">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-1">{alert.title}</h4>
                <p className="text-yellow-700 dark:text-yellow-300">{alert.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7-Day Forecast */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl">
            <i className="bx bx-calendar text-white text-xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('forecast')}</h2>
        </div>
        <div className="relative overflow-hidden">
          <div className="flex gap-6 pb-6 animate-slide-infinite" style={{width: `${weatherData.forecast.length * 280}px`}}>
            {[...weatherData.forecast, ...weatherData.forecast].map((day, index) => (
              <div key={index} className="flex-shrink-0 w-56 transform hover:scale-105 transition-all duration-300 animate-slide-up" style={{animationDelay: `${(index % weatherData.forecast.length) * 100}ms`}}>
                <div className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-800 dark:via-blue-900/20 dark:to-indigo-900/30 rounded-3xl p-6 border border-blue-200/50 dark:border-blue-700/50 shadow-xl hover:shadow-2xl transition-all duration-500 backdrop-blur-sm overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200/20 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="relative z-10">
                    <div className="text-center space-y-4">
                      <div className="flex items-center justify-center w-16 h-16 mx-auto bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl shadow-lg">
                        <i className={`bx bx-sun text-white text-3xl`}></i>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{day.day}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{day.date}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-gray-900 dark:text-white">{day.high}°</span>
                          <span className="text-lg text-gray-500 dark:text-gray-400">{day.low}°</span>
                        </div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{day.condition}</div>
                      </div>
                      {day.precipitation > 0 && (
                        <div className="flex items-center justify-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                          <i className="bx bx-water text-blue-600 dark:text-blue-400 text-sm"></i>
                          <span className="text-sm font-medium text-blue-700 dark:text-blue-300">{day.precipitation}%</span>
                        </div>
                      )}
                      <div className="grid grid-cols-2 gap-3 pt-3 border-t border-blue-200/50 dark:border-blue-700/50">
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <i className="bx bx-droplet text-blue-500 text-sm"></i>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Humidity</span>
                          </div>
                          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{day.humidity || '65'}%</div>
                        </div>
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-1 mb-1">
                            <i className="bx bx-wind text-green-500 text-sm"></i>
                            <span className="text-xs text-gray-500 dark:text-gray-400">Wind</span>
                          </div>
                          <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{day.windSpeed || '12'} km/h</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Farming Advice */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-6 border border-green-200 dark:border-green-700">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-green-500 rounded-2xl shadow-lg">
            <i className="bx bx-leaf text-white text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Farming Recommendations</h2>
        </div>
        <div className="grid gap-4">
          {getFarmingAdvice(weatherData).map((advice, index) => (
            <div key={index} className="flex items-start gap-4 p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-green-200/50 dark:border-green-700/50 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all duration-300 animate-slide-up" style={{animationDelay: `${index * 150}ms`}}>
              <span className="text-2xl flex-shrink-0">{advice.split(' ')[0]}</span>
              <p className="text-gray-700 dark:text-gray-300 font-medium">{advice.substring(advice.indexOf(' ') + 1)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="group bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-6 border border-purple-200 dark:border-purple-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <i className="bx bx-chat text-white text-xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Need More Help?</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Get personalized farming advice based on current weather conditions
          </p>
          <button className="w-full py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-2xl font-medium transition-all duration-300 hover:scale-105 shadow-lg">
            Chat with AI Assistant
          </button>
        </div>
        
        <div className="group bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-900/20 rounded-3xl p-6 border border-orange-200 dark:border-orange-700 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-orange-500 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <i className="bx bx-history text-white text-xl"></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Weather History</h3>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            View historical weather data for better planning
          </p>
          <button className="w-full py-3 bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 rounded-2xl font-medium cursor-not-allowed" disabled>
            Coming Soon
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;