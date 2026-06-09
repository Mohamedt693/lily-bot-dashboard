import { useState, type ReactNode } from 'react';
import { AuthContext, type User } from '../contexts/AuthContext'; 

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('lily_bot_token');
  });

  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('lily_bot_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const loading = false;

  const login = (newToken: string, newUser: User) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('lily_bot_token', newToken);
    localStorage.setItem('lily_bot_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('lily_bot_token');
    localStorage.removeItem('lily_bot_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}