import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Notifications from '../Notifications';
import { useAuth } from '../../providers/AuthProvider';

const Profile = () => {
  // hooks
  const [error, setError] = useState();
  const navigate = useNavigate();

  // get currentUser and logout from useAuth
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to Log out !');
    }
  };

  return (
    <div>
      {error && <Notifications message={error} type="error" />}
      <h1>Email : {currentUser.email}</h1>
      <Link to="/update-profile">Update Profile</Link>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Profile;
