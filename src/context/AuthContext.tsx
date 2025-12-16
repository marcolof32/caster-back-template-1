import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, BackofficeUser, LoginCredentials } from '../types';

interface AuthContextType {
  auth: AuthState;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuario de prueba para demostración
const DEMO_USER: BackofficeUser = {
  id: '1',
  nombre: 'Administrador',
  email: 'admin@example.com',
  rol: 'admin',
  permisos: [
    'users.view',
    'users.create',
    'users.edit',
    'users.delete',
    'notifications.view',
    'notifications.create',
    'notifications.edit',
    'notifications.delete',
    'banners.view',
    'banners.create',
    'banners.edit',
    'banners.delete',
    'popups.view',
    'popups.create',
    'popups.edit',
    'popups.delete'
  ]
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // MODO PÚBLICO: Usuario siempre autenticado sin necesidad de login
  const [auth] = useState<AuthState>({
    isAuthenticated: true,
    user: DEMO_USER,
    token: 'public-mode-token'
  });

  const login = async (): Promise<void> => {
    // Modo público: No requiere validación
    return Promise.resolve();
  };

  const logout = () => {
    // Modo público: Logout deshabilitado
    console.log('Logout deshabilitado en modo público');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

