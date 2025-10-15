const WeatherCard = ({ weather, forecast = false, forecastData = [] }) => {
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

  const getIconColor = (condition) => {
    const colors = {
      'sunny': 'text-yellow-500',
      'partly-cloudy': 'text-gray-400',
      'cloudy': 'text-gray-500',
      'rain': 'text-blue-500',
      'heavy-rain': 'text-blue-600',
      'snow': 'text-blue-300'
    };
    return colors[condition] || 'text-gray-400';
  };

  if (forecast) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 text-center">
        <div className="text-2xl mb-1 text-white">
          <i className={`bx ${getWeatherIcon(weather?.icon)}`}></i>
        </div>
        <div className="text-xs font-semibold text-white">{weather?.day}</div>
        <div className="flex justify-center gap-1 text-sm my-1">
          <span className="font-bold text-white">{weather?.high}°</span>
          <span className="text-blue-200">{weather?.low}°</span>
        </div>
        {weather?.precipitation > 0 && (
          <div className="text-xs text-blue-200">
            <i className="bx bx-droplet"></i>{weather?.precipitation}%
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 p-4 shadow-xl">
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20"></div>
      
      <div className="relative z-10 space-y-4">
        {/* Today's Weather */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-white">Today's Weather</h3>
            <p className="text-blue-100 text-xs flex items-center gap-1">
              <i className="bx bx-map"></i>{weather?.location}
            </p>
          </div>
          <div className="text-5xl text-white/90">
            <i className={`bx ${getWeatherIcon(weather?.icon)}`}></i>
          </div>
        </div>
        
        <div className="flex items-end gap-1 mb-3">
          <div className="text-4xl font-bold text-white">{weather?.temperature}°</div>
          <div className="text-lg text-blue-100 mb-1">C</div>
          <div className="text-sm text-blue-100 ml-2 mb-1">{weather?.condition}</div>
        </div>
        
        <div className="grid grid-cols-4 gap-2 mb-3">
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <i className="bx bx-droplet text-lg text-blue-200"></i>
            <div className="text-xs text-blue-100">Humidity</div>
            <div className="text-sm font-bold text-white">{weather?.humidity}%</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <i className="bx bx-wind text-lg text-blue-200"></i>
            <div className="text-xs text-blue-100">Wind</div>
            <div className="text-sm font-bold text-white">{weather?.windSpeed}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <i className="bx bx-sun text-lg text-yellow-300"></i>
            <div className="text-xs text-blue-100">Sunrise</div>
            <div className="text-xs font-bold text-white">{weather?.sunrise}</div>
          </div>
          <div className="bg-white/10 rounded-lg p-2 text-center">
            <i className="bx bx-moon text-lg text-indigo-300"></i>
            <div className="text-xs text-blue-100">Sunset</div>
            <div className="text-xs font-bold text-white">{weather?.sunset}</div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        {forecastData?.length > 0 && (
          <div className="border-t border-white/20 pt-3">
            <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1">
              <i className="bx bx-calendar"></i>7-Day Forecast
            </h4>
            <div className="grid grid-cols-7 gap-2">
              {forecastData.slice(0, 7).map((day, index) => (
                <WeatherCard key={index} weather={day} forecast={true} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;