import { Navigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';

const PrivateRoute = ({ children }) => {
  // get currentUser from useAuth
  const { currentUser } = useAuth();

  if (currentUser) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;
