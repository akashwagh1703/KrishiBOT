import { weatherAPI, schemesAPI, plantProtectionAPI } from './api.js';

// Mock chat engine with rule-based responses
class MockChatEngine {
  constructor() {
    this.intents = {
      greeting: ['hello', 'hi', 'namaste', 'good morning', 'good evening'],
      weather: ['weather', 'temperature', 'rain', 'forecast', 'climate'],
      schemes: ['scheme', 'yojana', 'subsidy', 'government', 'benefit', 'loan'],
      plantProtection: ['pest', 'disease', 'insect', 'fungus', 'crop protection', 'treatment'],
      fertilizer: ['fertilizer', 'manure', 'nutrients', 'soil', 'compost'],
      general: ['help', 'what can you do', 'features']
    };
  }

  async processMessage(message) {
    const lowerMessage = message.toLowerCase();
    const intent = this.detectIntent(lowerMessage);
    
    switch (intent) {
      case 'greeting':
        return this.getGreetingResponse();
      
      case 'weather':
        return await this.getWeatherResponse(lowerMessage);
      
      case 'schemes':
        return await this.getSchemesResponse(lowerMessage);
      
      case 'plantProtection':
        return await this.getPlantProtectionResponse(lowerMessage);
      
      case 'fertilizer':
        return this.getFertilizerResponse();
      
      case 'general':
        return this.getGeneralResponse();
      
      default:
        return this.getDefaultResponse();
    }
  }

  detectIntent(message) {
    for (const [intent, keywords] of Object.entries(this.intents)) {
      if (keywords.some(keyword => message.includes(keyword))) {
        return intent;
      }
    }
    return 'unknown';
  }

  getGreetingResponse() {
    const greetings = [
      "Hello! I'm KisanBot, your farming assistant. How can I help you today?",
      "Namaste! I'm here to help with weather, government schemes, and plant protection. What would you like to know?",
      "Hi there! I can assist you with farming-related queries. Ask me about weather, schemes, or crop protection!"
    ];
    return {
      text: greetings[Math.floor(Math.random() * greetings.length)],
      quickReplies: ['Check Weather', 'Government Schemes', 'Plant Protection', 'General Help']
    };
  }

  async getWeatherResponse(message) {
    try {
      const weatherData = await weatherAPI.getCurrent();
      const current = weatherData.current;
      
      return {
        text: `Current weather in ${current.location}:\n🌡️ Temperature: ${current.temperature}°C\n☁️ Condition: ${current.condition}\n💧 Humidity: ${current.humidity}%\n💨 Wind Speed: ${current.windSpeed} km/h\n\nWould you like to see the 7-day forecast?`,
        quickReplies: ['7-Day Forecast', 'Weather Alerts', 'Farming Tips']
      };
    } catch (error) {
      return {
        text: "Sorry, I couldn't fetch the weather data right now. Please try again later.",
        quickReplies: ['Retry Weather', 'Other Services']
      };
    }
  }

  async getSchemesResponse(message) {
    try {
      const schemes = await schemesAPI.getAll();
      const topSchemes = schemes.slice(0, 3);
      
      let response = "Here are some popular government schemes for farmers:\n\n";
      topSchemes.forEach((scheme, index) => {
        response += `${index + 1}. ${scheme.title}\n   ${scheme.shortDescription}\n   Benefits: ${scheme.benefits}\n\n`;
      });
      
      response += "Would you like to know more about any specific scheme?";
      
      return {
        text: response,
        quickReplies: topSchemes.map(scheme => scheme.title.substring(0, 20) + '...')
      };
    } catch (error) {
      return {
        text: "Sorry, I couldn't fetch the schemes data right now. Please try again later.",
        quickReplies: ['Retry Schemes', 'Other Services']
      };
    }
  }

  async getPlantProtectionResponse(message) {
    try {
      const tips = await plantProtectionAPI.getPreventiveTips();
      const randomTips = tips.slice(0, 3);
      
      let response = "Here are some plant protection tips:\n\n";
      randomTips.forEach((tip, index) => {
        response += `${index + 1}. ${tip}\n`;
      });
      
      response += "\nFor specific pest/disease diagnosis, please use our Plant Protection tool with crop and symptom details.";
      
      return {
        text: response,
        quickReplies: ['Diagnose Problem', 'More Tips', 'Organic Solutions']
      };
    } catch (error) {
      return {
        text: "Sorry, I couldn't fetch plant protection information right now. Please try again later.",
        quickReplies: ['Retry Protection', 'Other Services']
      };
    }
  }

  getFertilizerResponse() {
    return {
      text: "For fertilizer recommendations:\n\n1. Get your soil tested first\n2. Use balanced NPK fertilizers\n3. Consider organic options like compost\n4. Apply fertilizers based on crop growth stage\n5. Follow recommended dosages\n\nWould you like information about soil testing schemes?",
      quickReplies: ['Soil Testing', 'Organic Fertilizers', 'NPK Guide']
    };
  }

  getGeneralResponse() {
    return {
      text: "I can help you with:\n\n🌤️ Weather forecasts and alerts\n🏛️ Government schemes and subsidies\n🌱 Plant protection and pest management\n💬 General farming advice\n\nYou can also use our guided flow for step-by-step assistance!",
      quickReplies: ['Weather', 'Schemes', 'Plant Protection', 'Guided Flow']
    };
  }

  getDefaultResponse() {
    return {
      text: "I didn't quite understand that. I can help you with weather information, government schemes, and plant protection. Try asking about:\n\n• Current weather and forecasts\n• Government schemes for farmers\n• Pest and disease management\n• Fertilizer recommendations\n\nOr use our guided flow for structured assistance!",
      quickReplies: ['Weather', 'Schemes', 'Plant Protection', 'Guided Flow']
    };
  }
}

// LLM Integration (Optional - requires API key)
class LLMChatEngine {
  constructor(apiKey, baseURL = 'https://api.openai.com/v1') {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
    this.systemPrompt = `You are KisanBot, an AI assistant for farmers in India. You help with:
1. Weather information and farming advice
2. Government schemes and subsidies
3. Plant protection and pest management
4. General farming guidance

Keep responses concise, practical, and farmer-friendly. Use simple language and provide actionable advice.`;
  }

  async processMessage(message, context = []) {
    try {
      // Replace with actual LLM API call
      const response = await fetch(`${this.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: this.systemPrompt },
            ...context,
            { role: 'user', content: message }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      const data = await response.json();
      return {
        text: data.choices[0].message.content,
        quickReplies: this.generateQuickReplies(message)
      };
    } catch (error) {
      console.error('LLM API Error:', error);
      // Fallback to mock engine
      const mockEngine = new MockChatEngine();
      return await mockEngine.processMessage(message);
    }
  }

  generateQuickReplies(message) {
    // Generate contextual quick replies based on message
    const weatherKeywords = ['weather', 'rain', 'temperature'];
    const schemeKeywords = ['scheme', 'subsidy', 'loan'];
    const protectionKeywords = ['pest', 'disease', 'crop'];

    if (weatherKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
      return ['7-Day Forecast', 'Weather Alerts', 'Farming Tips'];
    } else if (schemeKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
      return ['PM-KISAN', 'Crop Insurance', 'Credit Schemes'];
    } else if (protectionKeywords.some(keyword => message.toLowerCase().includes(keyword))) {
      return ['Diagnose Problem', 'Organic Solutions', 'Prevention Tips'];
    }

    return ['Weather', 'Schemes', 'Plant Protection', 'Help'];
  }
}

// Chat Adapter - switches between mock and LLM
class ChatAdapter {
  constructor() {
    this.useLLM = import.meta.env.VITE_USE_LLM === 'true';
    this.llmApiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (this.useLLM && this.llmApiKey) {
      this.engine = new LLMChatEngine(this.llmApiKey);
      console.log('Using LLM Chat Engine');
    } else {
      this.engine = new MockChatEngine();
      console.log('Using Mock Chat Engine');
    }
  }

  async sendMessage(message, context = []) {
    try {
      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
      
      const response = await this.engine.processMessage(message, context);
      
      return {
        text: response.text,
        quickReplies: response.quickReplies || [],
        timestamp: new Date().toISOString(),
        sender: 'bot'
      };
    } catch (error) {
      console.error('Chat Error:', error);
      return {
        text: "Sorry, I'm having trouble processing your message right now. Please try again.",
        quickReplies: ['Retry', 'Help', 'Contact Support'],
        timestamp: new Date().toISOString(),
        sender: 'bot'
      };
    }
  }

  // Switch between engines (for testing)
  switchToLLM(apiKey) {
    if (apiKey) {
      this.engine = new LLMChatEngine(apiKey);
      this.useLLM = true;
      console.log('Switched to LLM Chat Engine');
    }
  }

  switchToMock() {
    this.engine = new MockChatEngine();
    this.useLLM = false;
    console.log('Switched to Mock Chat Engine');
  }
}

export default ChatAdapter;