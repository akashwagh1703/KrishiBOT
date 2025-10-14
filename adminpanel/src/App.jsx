import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './routes/Login';
import Apps from './routes/Apps';
import AppConfig from './routes/AppConfig';
import ClientLogin from './routes/ClientLogin';
import ClientConfig from './routes/ClientConfig';
import ProtectedRoute from './components/ProtectedRoute';
import ClientProtectedRoute from './components/ClientProtectedRoute';

function App() {
  return (
    <Router>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/apps" element={
          <ProtectedRoute>
            <Apps />
          </ProtectedRoute>
        } />
        <Route path="/apps/:appId/config" element={
          <ProtectedRoute>
            <AppConfig />
          </ProtectedRoute>
        } />
        <Route path="/client-login" element={<ClientLogin />} />
        <Route path="/client/config" element={
          <ClientProtectedRoute>
            <ClientConfig />
          </ClientProtectedRoute>
        } />
        <Route path="*" element={
          <Navigate to={localStorage.getItem('admin_auth') === 'true' ? '/apps' : '/client-login'} replace />
        } />
      </Routes>
    </Router>
  );
}

export default App;
