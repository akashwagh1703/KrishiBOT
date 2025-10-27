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
      <div className="glass-panel border border-white/10 rounded-lg p-2 text-center hover:border-neon-green/50 transition-all">
        <div className="text-2xl mb-1 text-neon-cyan">
          <i className={`bx ${getWeatherIcon(weather?.icon)}`}></i>
        </div>
        <div className="text-xs font-semibold text-gray-300">{weather?.day}</div>
        <div className="flex justify-center gap-1 text-sm my-1">
          <span className="font-bold text-white">{weather?.high}°</span>
          <span className="text-gray-400">{weather?.low}°</span>
        </div>
        {weather?.precipitation > 0 && (
          <div className="text-xs text-neon-cyan">
            <i className="bx bx-droplet"></i>{weather?.precipitation}%
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden glass-panel border border-neon-blue/30 p-6 animate-slide-in animate-border-glow">
      <div className="absolute top-0 right-0 w-40 h-40 bg-neon-blue/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 space-y-4">
        {/* Today's Weather */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white glow-text">Today's Weather</h3>
            <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
              <i className="bx bx-map"></i>{weather?.location}
            </p>
          </div>
          <div className="text-6xl text-neon-cyan animate-float">
            <i className={`bx ${getWeatherIcon(weather?.icon)}`}></i>
          </div>
        </div>
        
        <div className="flex items-end gap-2 mb-4">
          <div className="text-5xl font-bold text-white">{weather?.temperature}°</div>
          <div className="text-xl text-gray-300 mb-2">C</div>
          <div className="text-base text-neon-green ml-3 mb-2 font-medium">{weather?.condition}</div>
        </div>
        
        <div className="grid grid-cols-4 gap-3 mb-4">
          <div className="glass-panel border border-white/10 rounded-xl p-3 text-center hover:border-neon-cyan/50 transition-all">
            <i className="bx bx-droplet text-2xl text-neon-cyan"></i>
            <div className="text-xs text-gray-400 mt-1">Humidity</div>
            <div className="text-sm font-bold text-white mt-1">{weather?.humidity}%</div>
          </div>
          <div className="glass-panel border border-white/10 rounded-xl p-3 text-center hover:border-neon-green/50 transition-all">
            <i className="bx bx-wind text-2xl text-neon-green"></i>
            <div className="text-xs text-gray-400 mt-1">Wind</div>
            <div className="text-sm font-bold text-white mt-1">{weather?.windSpeed}</div>
          </div>
          <div className="glass-panel border border-white/10 rounded-xl p-3 text-center hover:border-neon-lime/50 transition-all">
            <i className="bx bx-sun text-2xl text-neon-lime"></i>
            <div className="text-xs text-gray-400 mt-1">Sunrise</div>
            <div className="text-xs font-bold text-white mt-1">{weather?.sunrise}</div>
          </div>
          <div className="glass-panel border border-white/10 rounded-xl p-3 text-center hover:border-neon-blue/50 transition-all">
            <i className="bx bx-moon text-2xl text-neon-blue"></i>
            <div className="text-xs text-gray-400 mt-1">Sunset</div>
            <div className="text-xs font-bold text-white mt-1">{weather?.sunset}</div>
          </div>
        </div>

        {/* 7-Day Forecast */}
        {forecastData?.length > 0 && (
          <div className="border-t border-white/10 pt-4 animate-fade-in" style={{ animationDelay: '300ms' }}>
            <h4 className="text-sm font-bold text-gray-300 mb-3 flex items-center gap-2">
              <i className="bx bx-calendar text-neon-green"></i>7-Day Forecast
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