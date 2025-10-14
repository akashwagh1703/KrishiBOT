import { Navigate } from 'react-router-dom';

const ClientProtectedRoute = ({ children }) => {
  const isAuth = localStorage.getItem('client_auth') === 'true';
  return isAuth ? children : <Navigate to="/client-login" replace />;
};

export default ClientProtectedRoute;
