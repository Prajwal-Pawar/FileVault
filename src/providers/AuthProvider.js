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
  const [currentUser, setCurrentUser] = useState();

  // creating user with email and password
  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    // setting current user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
