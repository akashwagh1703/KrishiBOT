import { useNavigate } from 'react-router-dom';
import ChatbotContent from './ChatbotContent';

const FloatingChatbot = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
           <img src="/logo.png" className='p-2' alt="" />
          </div>
          <div>
            <h3 className="text-white font-bold text-2xl">KrishiBot</h3>
            <p className="text-green-100 text-sm">Your AI-Powered Farming Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
        
          <button className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-colors">
            <i className="bx bx-moon text-white text-xl"></i>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <ChatbotContent />
      </div>
    </div>
  );
};

export default FloatingChatbot;
