import React, { createContext, useEffect, useState } from 'react';
import { getUser } from '../utils/api';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getUser(token).then(setUser).catch(console.error);
    }
  }, []);
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };
  return (
    <AuthContext.Provider value={{ user, setUser,logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
