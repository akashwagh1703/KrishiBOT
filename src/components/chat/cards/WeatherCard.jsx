const WeatherCard = ({ data }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 text-white shadow-lg animate-slide-up">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-2xl font-bold">{data.temperature}°C</h3>
          <p className="text-blue-100">{data.location}</p>
        </div>
        <div className="text-5xl">
          {data.condition.includes('Clear') ? '☀️' : 
           data.condition.includes('Cloud') ? '☁️' : 
           data.condition.includes('Rain') ? '🌧️' : '🌤️'}
        </div>
      </div>
      
      <div className="border-t border-white/20 pt-3 grid grid-cols-3 gap-2 text-sm">
        <div className="text-center">
          <div className="text-blue-100">Humidity</div>
          <div className="font-semibold">{data.humidity}%</div>
        </div>
        <div className="text-center">
          <div className="text-blue-100">Wind</div>
          <div className="font-semibold">{data.windSpeed} km/h</div>
        </div>
        <div className="text-center">
          <div className="text-blue-100">Condition</div>
          <div className="font-semibold text-xs">{data.condition}</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
