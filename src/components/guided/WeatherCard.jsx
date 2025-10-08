const WeatherCard = ({ weather, forecast = false }) => {
  const getWeatherIcon = (condition) => {
    const icons = {
      'sunny': 'bx-sun',
      'partly-cloudy': 'bx-cloud',
      'cloudy': 'bx-cloud',
      'rain': 'bx-cloud-rain',
      'heavy-rain': 'bx-cloud-rain',
      'snow': 'bx-cloud-snow'
    };
    return icons[condition] || 'bx-cloud';
  };

  if (forecast) {
    return (
      <div className="card p-3">
        <div className="text-center">
          <div className="text-2xl mb-1"><i className={`bx ${getWeatherIcon(weather.icon)}`}></i></div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">{weather.day}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">{weather.date}</div>
          <div className="flex justify-between text-sm">
            <span className="font-semibold">{weather.high}°</span>
            <span className="text-gray-500">{weather.low}°</span>
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{weather.condition}</div>
          {weather.precipitation > 0 && (
            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">
              {weather.precipitation}% rain
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Weather</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{weather.location}</p>
        </div>
        <div className="text-4xl"><i className={`bx ${getWeatherIcon(weather.icon)}`}></i></div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">{weather.temperature}°C</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{weather.condition}</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Humidity</span>
            <span className="font-medium">{weather.humidity}%</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500 dark:text-gray-400">Wind</span>
            <span className="font-medium">{weather.windSpeed} km/h</span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Sunrise</div>
          <div className="text-sm font-medium">{weather.sunrise}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 dark:text-gray-400">Sunset</div>
          <div className="text-sm font-medium">{weather.sunset}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;