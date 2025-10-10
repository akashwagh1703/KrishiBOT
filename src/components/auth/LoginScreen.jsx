import { useState } from 'react';
import config from '../../config/app.config.json';

const LoginScreen = ({ onSubmit }) => {
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      onSubmit(mobile);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        {/* <div className="text-center mb-8 animate-fade-in">
          {config.branding.show_logo && (
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <img src={config.branding.logo_icon} className="w-16 h-16" alt="Logo" />
            </div>
          )}
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
            {config.branding.app_name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">Your AI-Powered Farming Assistant</p>
        </div> */}

        {/* Login Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 animate-slide-up">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <img src={config.branding.logo_icon} className="w-16 h-16" alt="Logo" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back!</h2>
            <p className="text-gray-600 dark:text-gray-400">Enter your mobile number to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 dark:text-gray-400">+91</span>
                </div>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="Enter 10 digit mobile number"
                  className="w-full pl-16 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white text-lg transition-all"
                  maxLength="10"
                  required
                />
              </div>
              {mobile.length > 0 && mobile.length < 10 && (
                <p className="text-red-500 text-sm mt-2">Please enter a valid 10-digit mobile number</p>
              )}
            </div>

            <button
              type="submit"
              disabled={mobile.length !== 10}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
            >
              Send OTP
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              By continuing, you agree to our Terms & Privacy Policy
            </p>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default LoginScreen;
