import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import OTPScreen from './OTPScreen';

const OTPFlow = () => {
  const navigate = useNavigate();
  const mobile = localStorage.getItem('mobile');

  useEffect(() => {
    if (!mobile) {
      navigate('/login');
    }
  }, [mobile, navigate]);

  const handleOTPSubmit = (otp) => {
    console.log('Verifying OTP:', otp);
    setTimeout(() => {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/chat');
    }, 500);
  };

  const handleResendOTP = () => {
    console.log('Resending OTP to:', mobile);
  };

  if (!mobile) return null;

  return (
    <OTPScreen
      mobile={mobile}
      onSubmit={handleOTPSubmit}
      onResend={handleResendOTP}
    />
  );
};

export default OTPFlow;
