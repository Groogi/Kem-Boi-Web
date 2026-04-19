import { createContext, useContext, useState } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user');
    return u ? JSON.parse(u) : null;
  });

  const persist = (data) => {
    localStorage.setItem('token', data.token);
    const userData = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      account_id: data.account_id,
      role: data.role,
      points_balance: data.points_balance,
      exp: data.exp,
    };
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(data.token);
    setUser(userData);
  };



  const login = async (credentials) => {
    const data = await apiLogin(credentials);
    persist(data);
    return data;
  };

  const register = async (credentials) => {
    const data = await apiRegister(credentials);
    persist(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const updateUser = (newData) => {
    const updatedUser = { ...user, ...newData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated: !!token, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}



