import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UserCog, Image, MessageSquare } from 'lucide-react';
import { AuthProvider } from './context/AuthContext';
import { Layout } from './components/layout';
import { 
  Dashboard, 
  UsuariosApp, 
  UsuarioDetalle, 
  Notificaciones,
  NotificacionForm,
  NotificacionCSV,
  Placeholder 
} from './pages';

// Componente de rutas de la aplicación
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Login redirige automáticamente al dashboard (modo público) */}
      <Route path="/login" element={<Navigate to="/dashboard" replace />} />

      {/* Rutas públicas - Backoffice */}
      <Route path="/" element={<Layout />}>
        {/* Redirección de raíz a dashboard */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />

        {/* Usuarios App */}
        <Route path="usuarios-app" element={<UsuariosApp />} />
        
        {/* Detalle de Usuario */}
        <Route path="usuarios-app/:id" element={<UsuarioDetalle />} />

        {/* Usuarios / Roles Backoffice */}
        <Route
          path="usuarios-backoffice"
          element={
            <Placeholder
              title="Usuarios / Roles Backoffice"
              icon={<UserCog size={48} />}
              description="Gestiona los usuarios y roles del backoffice"
            />
          }
        />

        {/* Notificaciones */}
        <Route path="notificaciones" element={<Notificaciones />} />
        <Route path="notificaciones/crear" element={<NotificacionForm />} />
        <Route path="notificaciones/editar/:id" element={<NotificacionForm />} />
        <Route path="notificaciones/detalle/:id" element={<NotificacionForm />} />
        <Route path="notificaciones/csv-upload" element={<NotificacionCSV />} />

        {/* Banner */}
        <Route
          path="banner"
          element={
            <Placeholder
              title="Banner"
              icon={<Image size={48} />}
              description="Gestiona los banners de la aplicación"
            />
          }
        />

        {/* Pop-up Informativos */}
        <Route
          path="popup"
          element={
            <Placeholder
              title="Pop-up Informativos"
              icon={<MessageSquare size={48} />}
              description="Gestiona los pop-ups informativos"
            />
          }
        />
      </Route>

      {/* Ruta 404 - No encontrada */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;

