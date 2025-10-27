import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '../../config/app.config.json';

const LoginScreen = ({ onSubmit }) => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      onSubmit(mobile);
    }
  };

  return (
    <div className="min-h-screen bg-dark-950 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <button onClick={() => navigate('/')} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <i className="bx bx-arrow-back text-xl"></i>
          <span className="text-sm">Back to home</span>
        </button>

        {/* Login Card */}
        <div className="glass-panel border border-white/10 rounded-2xl p-8 backdrop-blur-xl animate-slide-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-cyan rounded-xl flex items-center justify-center mx-auto mb-4 animate-morph">
              <i className="bx bx-leaf text-3xl text-dark-950 font-bold"></i>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-400 text-sm">Enter your mobile number to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500">+91</span>
                </div>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10 digit number"
                  className="w-full pl-16 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-neon-green/50 text-white placeholder-gray-500 transition-all"
                  style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
                  maxLength="10"
                  required
                />
              </div>
              {mobile.length > 0 && mobile.length < 10 && (
                <p className="text-red-400 text-xs mt-2">Please enter a valid 10-digit number</p>
              )}
            </div>

            <button
              type="submit"
              disabled={mobile.length !== 10}
              className="w-full py-3.5 bg-gradient-to-r from-neon-green to-neon-cyan text-dark-950 font-semibold rounded-xl hover:shadow-lg hover:shadow-neon-green/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Send OTP
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
