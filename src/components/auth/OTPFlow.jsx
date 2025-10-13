import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import OTPScreen from './OTPScreen';
import { authAPI } from '../../services/api';

const OTPFlow = () => {
  const navigate = useNavigate();
  const mobile = localStorage.getItem('mobile');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!mobile) {
      navigate('/login');
    }
  }, [mobile, navigate]);

  const handleOTPSubmit = async (otp) => {
    setLoading(true);
    try {
      const response = await authAPI.verifyOTP(mobile, otp);
      toast.success('Login successful!');
      navigate('/chat');
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      await authAPI.sendOTP(mobile);
      toast.success('OTP resent successfully!');
    } catch (error) {
      toast.error('Failed to resend OTP.');
    }
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
