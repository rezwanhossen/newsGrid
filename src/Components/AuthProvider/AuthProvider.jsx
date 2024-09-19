import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { createContext, useState, useEffect } from "react";
import auth from "../Fairbase/firbase.config"; // Ensure your Firebase config file is correctly spelled

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  

  // Signup function
  const signupUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login function
  const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout function
  const logoutUser = () => {
    return signOut(auth);
  };

  // Monitor auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);  
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    signupUser,
    loginUser,
    logoutUser,
    loading,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children} {/* Only render children when not loading */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
