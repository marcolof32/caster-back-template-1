/**
 * TIPOS Y INTERFACES DE LA APLICACIÓN
 */

// Usuario de la aplicación (App User)
export interface User {
  id: string;
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  fechaRegistro: string;
  estado: boolean;
  ultimoLogueo: string | null;
  ultimaConexion: string | null;
  avatar?: string;
}

// Usuario del backoffice (Administrador)
export interface BackofficeUser {
  id: string;
  nombre: string;
  email: string;
  rol: UserRole;
  permisos: Permission[];
}

// Roles de usuario
export type UserRole = 'admin' | 'moderador' | 'editor' | 'visualizador';

// Permisos
export type Permission = 
  | 'users.view'
  | 'users.create'
  | 'users.edit'
  | 'users.delete'
  | 'notifications.view'
  | 'notifications.create'
  | 'notifications.edit'
  | 'notifications.delete'
  | 'banners.view'
  | 'banners.create'
  | 'banners.edit'
  | 'banners.delete'
  | 'popups.view'
  | 'popups.create'
  | 'popups.edit'
  | 'popups.delete';

// Notificación
export interface Notification {
  id: string;
  titulo: string;
  mensaje: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
  fecha: string;
  leida: boolean;
}

// Banner
export interface Banner {
  id: string;
  titulo: string;
  mensaje: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
  activo: boolean;
  fechaInicio: string;
  fechaFin?: string;
}

// Pop-up
export interface Popup {
  id: string;
  titulo: string;
  contenido: string;
  tipo: 'info' | 'success' | 'warning' | 'error';
  activo: boolean;
  trigger: 'onload' | 'onexit' | 'onscroll';
}

// Métricas del dashboard
export interface DashboardMetrics {
  totalUsuarios: number;
  usuariosActivos: number;
  nuevosUsuariosHoy: number;
  totalNotificaciones: number;
  bannersActivos: number;
  popupsActivos: number;
}

// Estado de autenticación
export interface AuthState {
  isAuthenticated: boolean;
  user: BackofficeUser | null;
  token: string | null;
}

// Login credentials
export interface LoginCredentials {
  email: string;
  password: string;
}
