import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('is_authenticated');

  if (isAuthenticated !== 'true') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
