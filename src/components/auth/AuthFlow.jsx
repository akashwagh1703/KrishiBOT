import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoginScreen from './LoginScreen';
import { authAPI } from '../../services/api';

const AuthFlow = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLoginSubmit = async (mobileNumber) => {
    setLoading(true);
    try {
      const response = await authAPI.sendOTP(mobileNumber);
      localStorage.setItem('mobile', mobileNumber);
      toast.success(response.message || 'OTP sent successfully!');
      navigate('/verifyotp');
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return <LoginScreen onSubmit={handleLoginSubmit} loading={loading} />;
};

export default AuthFlow;
