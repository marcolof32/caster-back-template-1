import React from 'react';
import { Search, Bell, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

export const Header: React.FC = () => {
  const { auth } = useAuth();

  return (
    <header className="header">
      <div className="header__content">
        <div className="header__search">
          <div className="header__search-input-wrapper">
            <Search size={20} className="header__search-icon" />
            <input
              type="text"
              placeholder="Buscar..."
              className="header__search-input"
            />
          </div>
        </div>

        <div className="header__actions">
          <button className="header__action-btn" title="Notificaciones">
            <Bell size={20} />
            <span className="header__action-badge">3</span>
          </button>

          <button className="header__action-btn" title="Configuración">
            <Settings size={20} />
          </button>

          <div className="header__divider"></div>

          <div className="header__user">
            <div className="header__user-avatar">
              {auth.user?.nombre?.charAt(0).toUpperCase() || 'A'}
            </div>
            <div className="header__user-info">
              <div className="header__user-name">{auth.user?.nombre}</div>
              <div className="header__user-role">{auth.user?.rol}</div>
            </div>
            <ChevronDown size={16} className="header__user-chevron" />
          </div>
        </div>
      </div>
    </header>
  );
};

