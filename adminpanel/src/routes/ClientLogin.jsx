import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const ClientLogin = () => {
  const [credentials, setCredentials] = useState({ appId: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!credentials.appId || !credentials.password) {
      toast.error('Please enter App ID and password');
      return;
    }

    setLoading(true);

    try {
      // TODO: const response = await axios.post('/api/v1/client/login', credentials);
      const apps = JSON.parse(localStorage.getItem('admin_apps') || '[]');
      const app = apps.find(a => a.app_id === credentials.appId);
      
      if (!app) {
        toast.error('Invalid App ID');
        setLoading(false);
        return;
      }

      // Mock password check (in real app, this comes from backend)
      const savedPassword = localStorage.getItem(`app_password_${credentials.appId}`) || 'client123';
      
      if (credentials.password === savedPassword) {
        localStorage.setItem('client_auth', 'true');
        localStorage.setItem('client_app_id', credentials.appId);
        toast.success('Login successful');
        navigate(`/client/config`);
      } else {
        toast.error('Invalid password');
      }
    } catch (error) {
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <i className="bx bx-user text-3xl text-green-600 dark:text-green-400"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Client Portal</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your chatbot configuration</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">App ID</label>
              <div className="relative">
                <i className="bx bx-id-card absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  value={credentials.appId}
                  onChange={(e) => setCredentials({ ...credentials, appId: e.target.value })}
                  placeholder="Enter your App ID"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <i className="bx bx-lock-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="Enter password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Are you an admin?</p>
            <button
              onClick={() => navigate('/login')}
              className="text-sm text-green-600 dark:text-green-400 hover:underline font-medium"
            >
              Admin Login →
            </button>
          </div>

          <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">Default password: client123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientLogin;
