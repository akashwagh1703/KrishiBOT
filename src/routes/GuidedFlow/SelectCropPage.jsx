import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { plantProtectionAPI } from '../../services/api';
import { getCropImage, getCropEmoji } from '../../assets/img/crops';

const SelectCropPage = () => {
  const { t } = useTranslation();
  const [plantProtectionData, setPlantProtectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [availableDiseases, setAvailableDiseases] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [imageErrors, setImageErrors] = useState({});
  const messagesEndRef = useRef(null);

  // Crop images mapping (you can add actual images later)
  const cropImages = {
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

  useEffect(() => {
    loadPlantProtectionData();
    initializeChat();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadPlantProtectionData = async () => {
    try {
      setLoading(true);
      const data = await plantProtectionAPI.getAll();
      setPlantProtectionData(data);
    } catch (error) {
      console.error('Failed to load plant protection data:', error);
    } finally {
      setLoading(false);
    }
  };

  const initializeChat = () => {
    const welcomeMessage = {
      id: Date.now(),
      text: "Welcome to Crop Selection! Please choose your crop from the grid below to get disease-specific guidance and protection measures.",
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMessage]);
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, { ...message, id: Date.now() + Math.random() }]);
  };

  const simulateTyping = async (duration = 1500) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsTyping(false);
  };

  const handleCropSelection = async (crop) => {
    setSelectedCrop(crop);
    setSelectedDisease('');
    
    if (crop && plantProtectionData) {
      const cropDiagnoses = plantProtectionData.diagnoses.filter(d => d.crop === crop);
      const diseases = cropDiagnoses.map(d => d.disease);
      setAvailableDiseases(diseases);
      
      const userMessage = {
        text: `I selected ${crop}`,
        sender: 'user',
        timestamp: new Date().toISOString()
      };
      addMessage(userMessage);
      
      await simulateTyping();
      
      const botResponse = {
        text: `You selected **${crop}**. Please choose a disease from the list below to get specific treatment recommendations and protection measures.`,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      addMessage(botResponse);
    }
  };

  const handleDiseaseSelection = async (disease) => {
    setSelectedDisease(disease);
    
    if (selectedCrop && disease && plantProtectionData) {
      const diagnosis = plantProtectionData.diagnoses.find(
        d => d.crop === selectedCrop && d.disease === disease
      );
      
      const userMessage = {
        text: `Tell me about ${disease} in ${selectedCrop}`,
        sender: 'user',
        timestamp: new Date().toISOString()
      };
      addMessage(userMessage);
      
      await simulateTyping(2000);
      
      if (diagnosis) {
        const botResponse = {
          text: `For your selected crop **${selectedCrop}** and disease **${disease}**, here's the complete guidance:\\n\\n🦠 **Cause:** ${diagnosis.cause}\\n⚠️ **Severity:** ${diagnosis.severity}\\n\\n💊 **Treatment:**\\n${diagnosis.treatment.map((t, i) => `${i + 1}. ${t}`).join('\\n')}\\n\\n🛡️ **Prevention:**\\n${diagnosis.prevention.map((p, i) => `${i + 1}. ${p}`).join('\\n')}\\n\\n🌿 **Organic Treatment:**\\n${diagnosis.organicTreatment.map((o, i) => `${i + 1}. ${o}`).join('\\n')}`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        addMessage(botResponse);
      } else {
        const botResponse = {
          text: `I don't have specific information about ${disease} in ${selectedCrop}. Please try selecting a different combination or consult with an agricultural expert.`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        addMessage(botResponse);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-500 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="bx bx-leaf text-green-500 text-2xl animate-pulse"></i>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 animate-pulse">Loading crops...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-dark-950">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 glass-panel backdrop-blur-xl">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-neon-green to-neon-cyan rounded-xl animate-morph">
            <i className="bx bx-leaf text-dark-950 text-xl"></i>
          </div>
          <div>
            <h3 className="font-semibold text-white">Select Crop</h3>
            <p className="text-sm text-gray-400">Choose your crop for disease guidance</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              message.sender === 'user' 
                ? 'bg-gradient-to-r from-neon-green to-neon-cyan text-dark-950 font-semibold' 
                : 'glass-panel border border-white/10 text-white backdrop-blur-xl'
            }`}>
              <div className="whitespace-pre-wrap text-sm">
                {message.text.split('**').map((part, index) => 
                  index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="glass-panel border border-white/10 rounded-2xl px-4 py-2 backdrop-blur-xl">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-neon-green rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Crop Selection Grid */}
      <div className="border-t border-white/10 p-4 glass-panel backdrop-blur-xl space-y-4">
        {!selectedCrop && plantProtectionData && (
          <div>
            <h4 className="text-sm font-medium text-gray-300 mb-3">
              <i className="bx bx-grid-alt mr-2 text-neon-green"></i>Select Your Crop:
            </h4>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
              {plantProtectionData.crops.map((crop) => {
                const imageUrl = getCropImage(crop);
                const emoji = getCropEmoji(crop);
                const hasImageError = imageErrors[crop];
                
                return (
                  <button
                    key={crop}
                    onClick={() => handleCropSelection(crop)}
                    className="flex flex-col items-center p-3 glass-panel border border-white/10 rounded-xl hover:bg-neon-green/10 hover:border-neon-green/50 transition-all duration-300 hover:scale-105 backdrop-blur-xl"
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
                    <span className="text-xs font-medium text-white text-center">{crop}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Disease Selection */}
        {selectedCrop && availableDiseases.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <i className="bx bx-bug mr-2 text-neon-cyan"></i>Select Disease for {selectedCrop}:
            </label>
            <select
              value={selectedDisease}
              onChange={(e) => handleDiseaseSelection(e.target.value)}
              className="w-full px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white focus:outline-none focus:border-neon-green/50 transition-all"
              defaultValue=""
            >
              <option value="" disabled>Choose a disease...</option>
              {availableDiseases.map((disease) => (
                <option key={disease} value={disease}>{disease}</option>
              ))}
            </select>
          </div>
        )}

        {/* Action Buttons */}
        {selectedCrop && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                setMessages([]);
                setSelectedCrop('');
                setSelectedDisease('');
                setAvailableDiseases([]);
                initializeChat();
              }}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm transition-all"
            >
              <i className="bx bx-refresh mr-1"></i>Select Different Crop
            </button>
            {selectedDisease && (
              <button
                onClick={() => handleDiseaseSelection(selectedDisease)}
                className="px-4 py-2 bg-gradient-to-r from-neon-green to-neon-cyan text-dark-950 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-neon-green/30 transition-all"
              >
                <i className="bx bx-info-circle mr-1"></i>More Details
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectCropPage;