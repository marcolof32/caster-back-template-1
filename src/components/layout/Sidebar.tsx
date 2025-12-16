import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  UserCog, 
  Bell, 
  Image, 
  MessageSquare, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard size={22} />,
    path: '/dashboard'
  },
  {
    id: 'usuarios-app',
    label: 'Usuarios App',
    icon: <Users size={22} />,
    path: '/usuarios-app'
  },
  {
    id: 'usuarios-backoffice',
    label: 'Usuarios / Roles Backoffice',
    icon: <UserCog size={22} />,
    path: '/usuarios-backoffice'
  },
  {
    id: 'notificaciones',
    label: 'Notificaciones',
    icon: <Bell size={22} />,
    path: '/notificaciones'
  },
  {
    id: 'banner',
    label: 'Banner',
    icon: <Image size={22} />,
    path: '/banner'
  },
  {
    id: 'popup',
    label: 'Pop-up Informativos',
    icon: <MessageSquare size={22} />,
    path: '/popup'
  }
];

export const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__logo">
          <div className="sidebar__logo-icon">B</div>
          <div className="sidebar__logo-text">
            <div className="sidebar__logo-title">BackOffice</div>
            <div className="sidebar__logo-subtitle">Administración</div>
          </div>
        </div>
      </div>

      <nav className="sidebar__nav">
        <div className="sidebar__section">
          <div className="sidebar__section-title">CONTENIDO</div>
          <ul className="sidebar__menu">
            {menuItems.map((item) => (
              <li key={item.id} className="sidebar__menu-item">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
                  }
                >
                  <span className="sidebar__link-icon">{item.icon}</span>
                  <span className="sidebar__link-text">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="sidebar__footer">
        <button className="sidebar__logout" onClick={handleLogout}>
          <span className="sidebar__logout-icon">
            <LogOut size={22} />
          </span>
          <span className="sidebar__logout-text">Cerrar Sesión</span>
        </button>
        <div className="sidebar__version">v1.0.0</div>
      </div>
    </aside>
  );
};

