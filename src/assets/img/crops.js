// Crop images mapping - you can replace these with actual image URLs later
export const cropImages = {
  'Rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop&crop=center',
  'Wheat': 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=200&h=200&fit=crop&crop=center',
  'Cotton': 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=200&h=200&fit=crop&crop=center',
  'Sugarcane': 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=200&h=200&fit=crop&crop=center',
  'Tomato': 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=200&fit=crop&crop=center',
  'Potato': 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop&crop=center',
  'Onion': 'https://images.unsplash.com/photo-1508747703725-719777637510?w=200&h=200&fit=crop&crop=center',
  'Maize': 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&h=200&fit=crop&crop=center',
  'Soybean': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop&crop=center',
  'Groundnut': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop&crop=center'
};

// Fallback emoji mapping
export const cropEmojis = {
  'Rice': '🌾',
  'Wheat': '🌾',
  'Cotton': '🌱',
  'Sugarcane': '🎋',
  'Tomato': '🍅',
  'Potato': '🥔',
  'Onion': '🧅',
  'Maize': '🌽',
  'Soybean': '🫘',
  'Groundnut': '🥜'
};

export const getCropImage = (cropName) => {
  return cropImages[cropName] || null;
};

export const getCropEmoji = (cropName) => {
  return cropEmojis[cropName] || '🌱';
};