import { useState } from 'react';
import { getCropImage, getCropEmoji } from '../../../assets/img/crops';

const CropGrid = ({ crops, onSelect }) => {
  const [imageErrors, setImageErrors] = useState({});

  return (
    <div className="bg-white dark:bg-gray-700 rounded-2xl p-4 shadow-lg border border-gray-200 dark:border-gray-600 animate-slide-up">
      <div className="grid grid-cols-3 gap-3">
        {crops.map((crop) => {
          const imageUrl = getCropImage(crop);
          const emoji = getCropEmoji(crop);
          const hasImageError = imageErrors[crop];

          return (
            <button
              key={crop}
              onClick={() => onSelect(crop)}
              className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-600 rounded-xl hover:bg-green-50 dark:hover:bg-green-900/20 hover:scale-105 transition-all duration-300 border border-transparent hover:border-green-300 dark:hover:border-green-600"
            >
              <div className="w-12 h-12 mb-2 flex items-center justify-center">
                {imageUrl && !hasImageError ? (
                  <img
                    src={imageUrl}
                    alt={crop}
                    className="w-full h-full object-cover rounded-lg"
                    onError={() => setImageErrors(prev => ({ ...prev, [crop]: true }))}
                  />
                ) : (
                  <div className="text-3xl">{emoji}</div>
                )}
              </div>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">{crop}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CropGrid;
