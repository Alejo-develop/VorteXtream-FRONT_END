import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserPayload } from '../common/interfaces/user.interface';

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextProps {
  isAuthenticated: boolean;
  isPremiun: boolean;
  getUser: () => UserPayload;
  signOut: () => void;
  saveSessionInfo: (user: UserPayload, token: string) => void;
  getToken: () => string;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  isPremiun: false,
  getUser: () => ({} as UserPayload),
  signOut: () => {},
  saveSessionInfo: () => {},
  getToken: () => ''
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPremiun, setIsPremiun] = useState(false);
  const [accesToken, setAccesToken] = useState<string>('');
  const [user, setUser] = useState<UserPayload | undefined>(undefined);

  // Recuperar la información de la sesión cuando el componente se monta
  useEffect(() => {
    const sessionToken = sessionStorage.getItem('session') || localStorage.getItem('session');
    const userInfo = sessionStorage.getItem('user') || localStorage.getItem('user');

    if (sessionToken && userInfo) {
      setAccesToken(sessionToken);
      setIsAuthenticated(true);
      setUser(JSON.parse(userInfo) as UserPayload);
    }
  }, []);

  function getUser() {
    return user as UserPayload;
  }

  function signOut() {
    setIsAuthenticated(false);
    setAccesToken('');
    setUser(undefined);

    sessionStorage.clear();
    localStorage.clear();
  }

  function saveSessionInfo(userInfo: UserPayload, token: string) {
    setAccesToken(token);
    sessionStorage.setItem('session', token);
    localStorage.setItem('session', token);
    sessionStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('user', JSON.stringify(userInfo));
    setIsAuthenticated(true);
    setUser(userInfo);
  }

  function getToken() {
    return accesToken;
  }

  return (
    <AuthContext.Provider value={{ isPremiun, isAuthenticated, signOut, getUser, saveSessionInfo, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
