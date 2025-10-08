import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { weatherAPI } from '../services/api';
import Button from '../components/ui/Button';
import 'boxicons/css/boxicons.min.css';

const Home = () => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    weatherAPI.getCurrent().then(setWeather).catch(() => {});
  }, []);

  const features = [
    {
      title: t('weather'),
      description: 'Real-time weather & forecasts',
      icon: 'bx-cloud',
      href: '/weather',
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20'
    },
    {
      title: t('schemes'),
      description: 'Government schemes & benefits',
      icon: 'bx-building',
      href: '/schemes',
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20'
    },
    {
      title: t('plantProtection'),
      description: 'Crop health & protection',
      icon: 'bx-leaf',
      href: '/plant-protection',
      gradient: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50 dark:bg-amber-900/20'
    },
    {
      title: t('chat'),
      description: 'AI assistant chat',
      icon: 'bx-chat',
      href: '/chat',
      gradient: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Weather */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Welcome Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 animate-bounce-gentle">
              <i className="bx bx-leaf mr-2"></i>
              Welcome to KisanBot
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Your Smart
              <span className="bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent"> Farming</span>
              <br />Assistant
            </h1>

          </div>



          {/* Guided Flows Section */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Choose Your Path
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Get help the way you prefer
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {features.map((feature, index) => (
                <Link
                  key={feature.title}
                  to={feature.href}
                  className="group block transform hover:scale-105 transition-all duration-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`card ${feature.bgColor} border-0 h-full group-hover:shadow-glow`}>
                    <div className="text-center">
                      <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-soft`}>
                        <i className={`bx ${feature.icon} text-xl text-white`}></i>
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/chat">
                <Button className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
                  <i className="bx bx-chat mr-2"></i>
                  Start Free Chat
                </Button>
              </Link>
              <Link to="/guided">
                <Button variant="outline" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
                  <i className="bx bx-compass mr-2"></i>
                  More Guided Options
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Info */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Get instant help with weather updates, government schemes, crop protection, or chat freely with our AI assistant
        </p>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Always Available</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-primary-100">Government Schemes</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: '400ms' }}>
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-primary-100">Happy Farmers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Get started in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: 'bx-chat', title: 'Ask Questions', desc: 'Type or speak your farming questions naturally' },
            { icon: 'bx-brain', title: 'Get AI Insights', desc: 'Receive personalized recommendations instantly' },
            { icon: 'bx-trending-up', title: 'Improve Yields', desc: 'Apply insights to boost your farm productivity' }
          ].map((step, index) => (
            <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-soft">
                <i className={`bx ${step.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;