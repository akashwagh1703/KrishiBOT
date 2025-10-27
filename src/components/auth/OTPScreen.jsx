import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OTPScreen = ({ mobile, onSubmit, onResend }) => {
  const navigate = useNavigate();
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
    <div className="min-h-screen bg-dark-950 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-neon-green/10 rounded-full blur-[120px] animate-float"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <button onClick={() => navigate('/login')} className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <i className="bx bx-arrow-back text-xl"></i>
          <span className="text-sm">Back to login</span>
        </button>

        {/* OTP Card */}
        <div className="glass-panel border border-white/10 rounded-2xl p-8 backdrop-blur-xl animate-slide-in">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-neon-green to-neon-cyan rounded-xl flex items-center justify-center mx-auto mb-4 animate-morph">
              <i className="bx bx-message-dots text-3xl text-dark-950 font-bold"></i>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Verify OTP</h2>
            <p className="text-gray-400 text-sm">
              Enter the 6-digit code sent to
            </p>
            <p className="text-neon-green font-semibold mt-1">
              +91 {mobile}
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-8">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="tel"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 sm:w-14 sm:h-14 text-center text-xl sm:text-2xl font-bold bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-neon-green/50 text-white transition-all"
                style={{ boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.1)' }}
              />
            ))}
          </div>

          {/* Timer and Resend */}
          <div className="text-center mb-6">
            {timer > 0 ? (
              <p className="text-gray-400 text-sm">
                Resend OTP in <span className="font-semibold text-neon-green">{timer}s</span>
              </p>
            ) : (
              <button
                onClick={handleResend}
                className="text-neon-green font-semibold hover:underline text-sm"
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            onClick={() => onSubmit(otp.join(''))}
            disabled={otp.some(digit => digit === '')}
            className="w-full py-3.5 bg-gradient-to-r from-neon-green to-neon-cyan text-dark-950 font-semibold rounded-xl hover:shadow-lg hover:shadow-neon-green/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Verify & Continue
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 text-xs text-gray-500">
            <i className="bx bx-lock-alt text-base"></i>
            <span>Your information is secure with us</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPScreen;
