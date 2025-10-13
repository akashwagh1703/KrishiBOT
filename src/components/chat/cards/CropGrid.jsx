import { useState } from 'react';
import { getCropImage, getCropEmoji } from '../../../assets/img/crops';
import { colors } from '../../../utils/colors';

const CropGrid = ({ crops, onSelect }) => {
  const [imageErrors, setImageErrors] = useState({});
  const [hoveredCrop, setHoveredCrop] = useState(null);

  return (
    <div className={`${colors.gradientBr} from-white dark:from-gray-700 dark:to-gray-800 rounded-3xl p-6 shadow-2xl border-2 ${colors.borderPrimary} dark:border-green-600 animate-slide-up`}>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
        {crops.map((crop, index) => {
          const imageUrl = getCropImage(crop);
          const emoji = getCropEmoji(crop);
          const hasImageError = imageErrors[crop];
          const isHovered = hoveredCrop === crop;

          return (
            <button
              key={crop}
              onClick={() => onSelect(crop)}
              onMouseEnter={() => setHoveredCrop(crop)}
              onMouseLeave={() => setHoveredCrop(null)}
              className={`group relative flex flex-col items-center p-4 bg-white dark:bg-gray-600 rounded-2xl hover:bg-gradient-to-br ${colors.hoverGradientLight} dark:hover:from-green-900/30 dark:hover:to-emerald-900/30 transition-all duration-300 border-2 border-gray-200 dark:border-gray-500 ${colors.borderPrimaryMid} dark:hover:border-green-500 hover:shadow-xl hover:scale-110 transform`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br from-green-400/0 to-emerald-400/0 group-hover:from-green-400/10 group-hover:to-emerald-400/10 rounded-2xl transition-all duration-300`}></div>
              
              <div className="relative w-16 h-16 mb-3 flex items-center justify-center">
                {imageUrl && !hasImageError ? (
                  <img
                    src={imageUrl}
                    alt={crop}
                    className="w-full h-full object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                    onError={() => setImageErrors(prev => ({ ...prev, [crop]: true }))}
                  />
                ) : (
                  <div className="text-5xl group-hover:scale-125 transition-transform duration-300">{emoji}</div>
                )}
                {isHovered && (
                  <div className={`absolute -top-1 -right-1 w-6 h-6 ${colors.checkBg} rounded-full flex items-center justify-center animate-bounce`}>
                    <i className="bx bx-check text-white text-sm"></i>
                  </div>
                )}
              </div>
              
              <span className={`relative text-sm font-semibold text-gray-800 dark:text-gray-200 text-center ${colors.textPrimaryDark} dark:group-hover:text-green-400 transition-colors`}>
                {crop}
              </span>
              
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${colors.gradientPrimary} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CropGrid;
