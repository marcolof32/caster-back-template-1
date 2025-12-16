import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button, Input } from '../components/ui';
import './Login.css';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email, password });
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-logo">
              <div className="login-logo-icon">B</div>
            </div>
            <h1 className="login-title">BackOffice</h1>
            <p className="login-subtitle">Administración Caster AI</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>

            <Input
              type="email"
              label="Correo electrónico"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              leftIcon={<Mail size={20} />}
              fullWidth
            />

            <Input
              type="password"
              label="Contraseña"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              leftIcon={<Lock size={20} />}
              fullWidth
            />

            <div className="login-actions">
              <label className="login-remember">
                <input type="checkbox" />
                <span>Recordarme</span>
              </label>
              <a href="#" className="login-forgot">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
            >
              Iniciar Sesión
            </Button>
          </form>

          <div className="login-footer">
            <div className="login-demo-info">
              <p>Acceso libre - No requiere credenciales</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

