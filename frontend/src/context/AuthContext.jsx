import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, getUserProfile } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      getUserProfile(storedToken).then((data) => {
        setUser(data);
        setLoading(false);
      }).catch(() => {
        localStorage.removeItem('token');
        setToken(null);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    if (data.tokens) {
      localStorage.setItem('token', data.tokens.access);
      setToken(data.tokens.access);
      getUserProfile(data.tokens.access).then((profileData) => {
        setUser(profileData);
        navigate('/home'); // Navigate to home page after successful login
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;