import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginScreen from './LoginScreen';

const AuthFlow = () => {
  const navigate = useNavigate();

  const handleLoginSubmit = (mobileNumber) => {
    localStorage.setItem('mobile', mobileNumber);
    console.log('Sending OTP to:', mobileNumber);
    navigate('/verifyotp');
  };

  return <LoginScreen onSubmit={handleLoginSubmit} />;
};

export default AuthFlow;
