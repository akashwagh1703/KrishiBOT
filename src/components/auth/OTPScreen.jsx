import { useState, useRef, useEffect } from 'react';
import config from '../../config/app.config.json';

const OTPScreen = ({ mobile, onSubmit, onResend }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
      onSubmit(newOtp.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setTimer(30);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    onResend();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        {/* <div className="text-center mb-8 animate-fade-in">
          {config.branding.show_logo && (
            <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl">
              <img src={config.branding.logo_icon} className="w-16 h-16" alt="Logo" />
            </div>
          )}
        </div> */}

        {/* OTP Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 animate-slide-up">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
               <img src={config.branding.logo_icon} className="w-16 h-16" alt="Logo" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Verify OTP</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Enter the 6-digit code sent to
            </p>
            <p className="text-green-600 dark:text-green-400 font-semibold mt-1">
              +91 {mobile}
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="tel"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-14 h-14 text-center text-2xl font-bold bg-gray-50 dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 dark:text-white transition-all"
              />
            ))}
          </div>

          {/* Timer and Resend */}
          <div className="text-center mb-6">
            {timer > 0 ? (
              <p className="text-gray-600 dark:text-gray-400">
                Resend OTP in <span className="font-semibold text-green-600 dark:text-green-400">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-green-600 dark:text-green-400 font-semibold hover:underline"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            onClick={() => onSubmit(otp.join(''))}
            disabled={otp.some(digit => digit === '')}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-2xl hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-4 focus:ring-green-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 shadow-lg"
          >
            Verify & Continue
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center animate-fade-in">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <i className="bx bx-lock-alt text-lg"></i>
            <span>Your information is secure with us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPScreen;
