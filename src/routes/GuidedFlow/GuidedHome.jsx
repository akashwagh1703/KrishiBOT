import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GuidedFlowCard from '../../components/guided/GuidedFlowCard';

const GuidedHome = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const guidedOptions = [
    {
      title: t('weather'),
      description: 'Real-time weather insights and 7-day forecasts',
      icon: 'bx-sun',
      href: '/weather'
    },
    {
      title: t('schemes'),
      description: 'Government schemes and subsidies for farmers',
      icon: 'bx-file',
      href: '/schemes'
    },
    {
      title: t('plantProtection'),
      description: 'AI-powered crop disease diagnosis and treatment',
      icon: 'bx-shield',
      href: '/plant-protection'
    },
    {
      title: 'Select Crop',
      description: 'Visual crop selection with expert guidance',
      icon: 'bx-leaf',
      href: '/select-crop'
    }
  ];

  return (
    <div className="min-h-screen bg-dark-950 p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4 animate-slide-in">
          <div className="inline-flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-green/20 to-neon-cyan/20 flex items-center justify-center">
              <i className="bx bx-leaf text-2xl text-neon-green"></i>
            </div>
            <h1 className="text-4xl font-bold text-white">
              {t('guidedFlow')}
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light">
            AI-powered insights for modern agriculture
          </p>
        </div>

        {/* Guided Flow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {guidedOptions.map((option, index) => (
            <GuidedFlowCard
              key={option.title}
              icon={option.icon}
              title={option.title}
              description={option.description}
              onClick={() => navigate(option.href)}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Quick Info */}
        <div className="premium-card rounded-2xl p-8 animate-slide-in" style={{ animationDelay: '400ms' }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white tracking-tight">Need Help Choosing?</h2>
            <i className="bx bx-help-circle text-2xl text-neon-green opacity-70"></i>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <i className="bx bx-sun text-neon-cyan text-lg"></i>
                <h3 className="font-semibold text-gray-300 tracking-tight">Weather</h3>
              </div>
              <p className="text-sm text-gray-500 font-light">Plan activities with real-time forecasts</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <i className="bx bx-file text-neon-green text-lg"></i>
                <h3 className="font-semibold text-gray-300 tracking-tight">Schemes</h3>
              </div>
              <p className="text-sm text-gray-500 font-light">Access subsidies and financial support</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <i className="bx bx-shield text-neon-blue text-lg"></i>
                <h3 className="font-semibold text-gray-300 tracking-tight">Protection</h3>
              </div>
              <p className="text-sm text-gray-500 font-light">Diagnose and treat crop diseases</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidedHome;