import { useState } from 'react';
import { getCropImage, getCropEmoji } from '../../../assets/img/crops';

const CropGrid = ({ crops, onSelect }) => {
  const [imageErrors, setImageErrors] = useState({});
  const [hoveredCrop, setHoveredCrop] = useState(null);

  return (
    <div className="glass-panel border border-neon-green/20 rounded-2xl p-6 animate-slide-in animate-border-glow">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {crops.map((crop, index) => {
          const cropName = typeof crop === 'string' ? crop : crop.name;
          const cropImage = typeof crop === 'object' ? crop.image_url : null;
          const imageUrl = cropImage || getCropImage(cropName);
          const emoji = getCropEmoji(cropName);
          const hasImageError = imageErrors[cropName];
          const isHovered = hoveredCrop === cropName;

          return (
            <button
              key={cropName}
              onClick={() => onSelect(cropName)}
              onMouseEnter={() => setHoveredCrop(cropName)}
              onMouseLeave={() => setHoveredCrop(null)}
              className="group relative flex flex-col items-center p-4 glass-panel border border-white/10 hover:border-neon-green/50 rounded-xl transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon-green/0 to-neon-cyan/0 group-hover:from-neon-green/10 group-hover:to-neon-cyan/10 rounded-xl transition-all duration-300"></div>
              
              <div className="relative w-16 h-16 mb-2 flex items-center justify-center">
                {imageUrl && !hasImageError ? (
                  <img
                    src={imageUrl}
                    alt={cropName}
                    className="w-full h-full object-cover rounded-lg"
                    onError={() => setImageErrors(prev => ({ ...prev, [cropName]: true }))}
                  />
                ) : (
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">{emoji}</div>
                )}
                {isHovered && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-neon-green rounded-full flex items-center justify-center animate-bounce">
                    <i className="bx bx-check text-dark-950 text-xs font-bold"></i>
                  </div>
                )}
              </div>
              
              <span className="relative text-xs font-semibold text-gray-300 group-hover:text-neon-green text-center transition-colors">
                {cropName}
              </span>
              
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-neon-green to-neon-cyan rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CropGrid;
