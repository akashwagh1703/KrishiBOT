import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LoginScreen from './LoginScreen';
import { authAPI } from '../../services/api';
import { configService } from '../../services/configService';

const AuthFlow = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAppConfig();
  }, []);

  const loadAppConfig = async () => {
    const appId = localStorage.getItem('app_id');
    if (appId) {
      const config = await configService.loadConfig(appId);
      configService.setCurrentConfig(config);
    }
  };

  const handleLoginSubmit = async (mobileNumber) => {
    setLoading(true);
    try {
      const appId = localStorage.getItem('app_id');
      const config = await configService.loadConfig(appId);
      configService.setCurrentConfig(config);
      
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
