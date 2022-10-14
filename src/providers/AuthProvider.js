import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '../configs/firebase';

// creating auth context
const AuthContext = createContext();

// using auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  // hooks
  const [currentUser, setCurrentUser] = useState('');
  const [loading, setLoading] = useState(true);

  // creating user with email and password
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  // logging in user
  const login = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  // logging out user
  const logout = () => {
    return auth.signOut();
  };

  // reseting user password
  const resetPassword = (email) => {
    return auth.sendPasswordResetEmail(email);
  };

  useEffect(() => {
    // setting current user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {/* if not loading then render children */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
