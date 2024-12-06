
import { createContext, useState } from 'react';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(JSON.parse(sessionStorage.getItem('authData')) || null);

  // Function to update authentication information
  const updateAuthData = (newAuthData) => {
    setAuth(newAuthData);
    // Also update session storage
    sessionStorage.setItem('authData', JSON.stringify(newAuthData));
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, updateAuthData }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
