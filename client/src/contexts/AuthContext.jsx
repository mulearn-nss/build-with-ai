import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Hardcoded mock user to completely bypass Firebase Auth errors
  const [currentUser, setCurrentUser] = useState({ 
    uid: 'dev-123', 
    email: 'anoop@rooted.com', 
    displayName: 'Anoop' 
  });
  
  // No loading required since we aren't waiting for Firebase
  const [loading, setLoading] = useState(false);

  // Mock functions completely bypassing Firebase SDK
  const login = async (email, password) => {
    return true; 
  };

  const signup = async (email, password) => {
    return true;
  };

  const value = {
    currentUser,
    login,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
