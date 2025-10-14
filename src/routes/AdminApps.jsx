import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminApps = () => {
  const [apps, setApps] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newApp, setNewApp] = useState({ name: '', description: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchApps();
  }, []);

  const fetchApps = async () => {
    try {
      // TODO: const response = await axios.get('/api/v1/admin/apps');
      // setApps(response.data.data.apps);
      const mockApps = JSON.parse(localStorage.getItem('admin_apps') || '[]');
      setApps(mockApps);
    } catch (error) {
      toast.error('Failed to fetch apps');
    }
  };

  const createApp = async () => {
    if (!newApp.name.trim()) {
      toast.error('App name is required');
      return;
    }

    setLoading(true);
    try {
      // TODO: const response = await axios.post('/api/v1/admin/apps', newApp);
      const appId = `app_${Date.now()}`;
      const app = {
        app_id: appId,
        name: newApp.name,
        description: newApp.description,
        created_at: new Date().toISOString(),
        status: 'active'
      };
      
      const updatedApps = [...apps, app];
      setApps(updatedApps);
      localStorage.setItem('admin_apps', JSON.stringify(updatedApps));
      
      toast.success('App created successfully');
      setShowCreateModal(false);
      setNewApp({ name: '', description: '' });
    } catch (error) {
      toast.error('Failed to create app');
    } finally {
      setLoading(false);
    }
  };

  const deleteApp = async (appId) => {
    if (!confirm('Are you sure you want to delete this app?')) return;

    try {
      // TODO: await axios.delete(`/api/v1/admin/apps/${appId}`);
      const updatedApps = apps.filter(app => app.app_id !== appId);
      setApps(updatedApps);
      localStorage.setItem('admin_apps', JSON.stringify(updatedApps));
      toast.success('App deleted successfully');
    } catch (error) {
      toast.error('Failed to delete app');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_username');
    toast.success('Logged out successfully');
    navigate('/admin-login');
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Multi-Client Management</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <button
            onClick={() => navigate('/admin/apps')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
          >
            <i className="bx bx-grid-alt text-xl"></i>
            <span className="font-medium">Apps</span>
          </button>
          <button
            onClick={() => navigate('/admin/settings')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <i className="bx bx-cog text-xl"></i>
            <span className="font-medium">Global Settings</span>
          </button>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          <button
            onClick={() => navigate('/chat')}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <i className="bx bx-arrow-back text-xl"></i>
            <span className="font-medium">Back to App</span>
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <i className="bx bx-log-out text-xl"></i>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">App Management</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Manage client applications and configurations</p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
            >
              <i className="bx bx-plus text-xl"></i>
              <span>Create New App</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {apps.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <i className="bx bx-grid-alt text-5xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">No Apps Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Create your first app to get started</p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors"
              >
                Create App
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {apps.map(app => (
                <div key={app.app_id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <i className="bx bx-bot text-2xl text-green-600 dark:text-green-400"></i>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-white">{app.name}</h3>
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          app.status === 'active' 
                            ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{app.description || 'No description'}</p>
                  
                  <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">App ID</p>
                    <p className="text-sm font-mono text-gray-800 dark:text-white">{app.app_id}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => navigate(`/admin/apps/${app.app_id}/config`)}
                      className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors text-sm"
                    >
                      Configure
                    </button>
                    <button
                      onClick={() => deleteApp(app.app_id)}
                      className="px-4 py-2 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg transition-colors"
                    >
                      <i className="bx bx-trash text-lg"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white">Create New App</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <i className="bx bx-x text-2xl"></i>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">App Name *</label>
                <input
                  type="text"
                  value={newApp.name}
                  onChange={(e) => setNewApp({ ...newApp, name: e.target.value })}
                  placeholder="e.g., Acme Corp Chatbot"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={newApp.description}
                  onChange={(e) => setNewApp({ ...newApp, description: e.target.value })}
                  placeholder="Brief description of the app"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={createApp}
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create App'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApps;
