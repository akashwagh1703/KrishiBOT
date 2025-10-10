import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { plantProtectionAPI } from '../../services/api';
import Button from '../../components/ui/Button';

const PlantProtectionPage = () => {
  const { t } = useTranslation();
  const [plantProtectionData, setPlantProtectionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [availableDiseases, setAvailableDiseases] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showPlantixFlow, setShowPlantixFlow] = useState(false);
  const messagesEndRef = useRef(null);

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
      text: "Hello! I'm here to help you with plant protection and disease diagnosis. You can either:\n\n1. Select a crop and disease from the dropdowns below\n2. Use the Plantix Flow to upload a photo for analysis",
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
        text: `I selected ${crop} as my crop`,
        sender: 'user',
        timestamp: new Date().toISOString()
      };
      addMessage(userMessage);
      
      await simulateTyping();
      
      const botResponse = {
        text: `You selected **${crop}**. Please choose a disease from the list below to get specific treatment recommendations.`,
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
          text: `For your selected crop **${selectedCrop}** and disease **${disease}**, here's what I found:\n\n🦠 **Cause:** ${diagnosis.cause}\n⚠️ **Severity:** ${diagnosis.severity}\n\n💊 **Treatment:**\n${diagnosis.treatment.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\n🛡️ **Prevention:**\n${diagnosis.prevention.map((p, i) => `${i + 1}. ${p}`).join('\n')}\n\n🌿 **Organic Treatment:**\n${diagnosis.organicTreatment.map((o, i) => `${i + 1}. ${o}`).join('\n')}`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        addMessage(botResponse);
      } else {
        const botResponse = {
          text: `I don't have specific information about ${disease} in ${selectedCrop}. Please try selecting a different combination or use the Plantix Flow for image-based diagnosis.`,
          sender: 'bot',
          timestamp: new Date().toISOString()
        };
        addMessage(botResponse);
      }
    }
  };

  const handlePlantixFlow = async () => {
    setShowPlantixFlow(true);
    
    const userMessage = {
      text: 'I want to use Plantix Flow for disease detection',
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    addMessage(userMessage);
    
    await simulateTyping();
    
    const botResponse = {
      text: "Great! Please upload or capture a photo of your crop for analysis. Make sure the image is clear and shows the affected parts of the plant.\n\n📸 **Supported formats:** JPG, PNG, JPEG\n📏 **Max size:** 10MB\n\nOnce you upload the image, I'll analyze it and provide disease detection results with confidence scores.",
      sender: 'bot',
      timestamp: new Date().toISOString()
    };
    addMessage(botResponse);
  };

  const handleImageUpload = async (file) => {
    if (!file) return;
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      const errorMessage = {
        text: "Please upload a valid image file (JPG, PNG, JPEG only).",
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      addMessage(errorMessage);
      return;
    }
    
    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      const errorMessage = {
        text: "File size too large. Please upload an image smaller than 10MB.",
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      addMessage(errorMessage);
      return;
    }
    
    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageUrl = e.target.result;
      setUploadedImage(imageUrl);
      
      const userMessage = {
        text: 'Here is the image of my crop',
        sender: 'user',
        timestamp: new Date().toISOString(),
        image: imageUrl
      };
      addMessage(userMessage);
      
      await simulateTyping(3000);
      
      // Simulate AI analysis
      const mockAnalysis = {
        disease: 'Early Blight',
        confidence: 92,
        remedy: 'Apply Mancozeb 75% WP, 2g per liter of water'
      };
      
      const botResponse = {
        text: `**Analysis Complete!** 🔍\n\nIt looks like your crop may have **${mockAnalysis.disease}** (${mockAnalysis.confidence}% confidence).\n\n💡 **Recommended action:** ${mockAnalysis.remedy}\n\n⚠️ **Additional steps:**\n1. Remove affected leaves immediately\n2. Improve air circulation around plants\n3. Avoid overhead watering\n4. Apply treatment every 7-10 days\n\nWould you like more detailed treatment information?`,
        sender: 'bot',
        timestamp: new Date().toISOString()
      };
      addMessage(botResponse);
    };
    reader.readAsDataURL(file);
  };





  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-200 border-t-green-500 mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <i className="bx bx-shield text-green-500 text-2xl animate-pulse"></i>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 animate-pulse">Loading plant protection data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-emerald-500 rounded-xl">
            <i className="bx bx-shield text-white text-xl"></i>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white">Plant Protection</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">Crop disease diagnosis & treatment</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
              message.sender === 'user' 
                ? 'bg-emerald-500 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-600'
            }`}>
              {message.image && (
                <img src={message.image} alt="Uploaded crop" className="w-full h-32 object-cover rounded-lg mb-2" />
              )}
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
            <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl px-4 py-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Controls */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm space-y-4">
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handlePlantixFlow}
            className="flex-1 px-4 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-medium transition-colors"
          >
            <i className="bx bx-camera mr-2"></i>Plantix Flow
          </button>
          <button
            onClick={() => {
              setMessages([]);
              setSelectedCrop('');
              setSelectedDisease('');
              setShowPlantixFlow(false);
              initializeChat();
            }}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 rounded-xl transition-colors"
          >
            <i className="bx bx-refresh"></i>
          </button>
        </div>
        
        {/* Plantix Image Upload */}
        {showPlantixFlow && (
          <div className="space-y-3">
            <div className="border-2 border-dashed border-purple-300 dark:border-purple-600 rounded-xl p-4 text-center">
              <input
                type="file"
                accept="image/*,image/jpeg,image/png,image/jpg"
                className="hidden"
                id="plantix-image"
                onChange={(e) => handleImageUpload(e.target.files[0])}
              />
              <label htmlFor="plantix-image" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <i className="bx bx-cloud-upload text-purple-500 text-2xl"></i>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Upload or Capture Photo</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">JPG, PNG, JPEG up to 10MB</p>
                  </div>
                </div>
              </label>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => document.getElementById('plantix-image').click()}
                className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm transition-colors"
              >
                <i className="bx bx-image mr-1"></i>Choose from Gallery
              </button>
              <button
                onClick={() => document.getElementById('plantix-image').click()}
                className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition-colors"
              >
                <i className="bx bx-camera mr-1"></i>Open Camera
              </button>
            </div>
          </div>
        )}
        
        {/* Crop and Disease Selection */}
        {!showPlantixFlow && plantProtectionData && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <i className="bx bx-leaf mr-2"></i>Select Crop:
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => handleCropSelection(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Choose a crop...</option>
                {plantProtectionData.crops.map((crop) => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>
            
            {selectedCrop && availableDiseases.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  <i className="bx bx-bug mr-2"></i>Select Disease:
                </label>
                <select
                  value={selectedDisease}
                  onChange={(e) => handleDiseaseSelection(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  <option value="">Choose a disease...</option>
                  {availableDiseases.map((disease) => (
                    <option key={disease} value={disease}>{disease}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );


};

export default PlantProtectionPage;