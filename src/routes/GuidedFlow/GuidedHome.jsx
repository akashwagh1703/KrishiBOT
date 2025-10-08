import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import 'boxicons/css/boxicons.min.css';

const GuidedHome = () => {
  const { t } = useTranslation();

  const guidedOptions = [
    {
      title: t('weather'),
      description: 'Check current weather conditions and get 7-day forecasts for better farming decisions',
      icon: 'bx-cloud',
      href: '/weather',
      color: 'bg-blue-500',
      features: ['Current conditions', '7-day forecast', 'Weather alerts', 'Farming recommendations']
    },
    {
      title: t('schemes'),
      description: 'Explore government schemes and subsidies available for farmers in your area',
      icon: 'bx-building',
      href: '/schemes',
      color: 'bg-green-500',
      features: ['Income support schemes', 'Crop insurance', 'Soil health programs', 'Credit facilities']
    },
    {
      title: t('plantProtection'),
      description: 'Get expert diagnosis and treatment recommendations for crop diseases and pests',
      icon: 'bx-leaf',
      href: '/plant-protection',
      color: 'bg-yellow-500',
      features: ['Disease diagnosis', 'Pest identification', 'Treatment recommendations', 'Prevention tips']
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('guidedFlow')}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Choose from our structured assistance options to get specific help with weather, government schemes, or plant protection
        </p>
      </div>

      {/* Guided Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {guidedOptions.map((option) => (
          <Link
            key={option.title}
            to={option.href}
            className="group block"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 h-full">
              <div className="flex items-center mb-4">
                <div className={`${option.color} w-12 h-12 rounded-lg flex items-center justify-center mr-4`}>
                  <i className={`bx ${option.icon} text-2xl text-white`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {option.title}
                </h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {option.description}
              </p>
              
              <ul className="space-y-2">
                {option.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <i className="bx bx-check w-4 h-4 text-green-500 mr-2 flex-shrink-0"></i>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 flex items-center text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
                <span className="text-sm font-medium">Get Started</span>
                <i className="bx bx-right-arrow-alt w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"></i>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Help Section */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Need Help Choosing?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">For Weather Information</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Use when planning farming activities, irrigation schedules, or preparing for weather changes
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">For Financial Support</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Explore government schemes when looking for subsidies, insurance, or credit facilities
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white mb-2">For Crop Issues</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get plant protection help when you notice unusual symptoms or pest problems in your crops
            </p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Link
            to="/chat"
            className="inline-flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
          >
            <span className="text-sm font-medium">Or chat freely with our AI assistant</span>
            <i className="bx bx-chat w-4 h-4 ml-2"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GuidedHome;