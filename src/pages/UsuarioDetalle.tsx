import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button, Input, Card } from '../components/ui';
import './UsuarioDetalle.css';

interface UsuarioApp {
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

// Mock data - en producción vendría de una API
const MOCK_USERS: UsuarioApp[] = [
  {
    id: '1',
    nombre: 'MARTINA',
    apellido: 'LOPEZ FERNANDEZ',
    dni: '42158736',
    email: 'martina.lopez@casterapp.com',
    fechaRegistro: '14/10/2023 - 09:52',
    estado: true,
    ultimoLogueo: '12/09/2025 - 16:07',
    ultimaConexion: '12/09/2025 - 16:07'
  },
  {
    id: '2',
    nombre: 'SANTIAGO',
    apellido: 'RODRIGUEZ PEREZ',
    dni: '39842517',
    email: 'santiago.rodriguez@casterapp.com',
    fechaRegistro: '06/10/2023 - 12:21',
    estado: false,
    ultimoLogueo: '17/09/2025 - 10:30',
    ultimaConexion: '17/09/2025 - 11:14'
  },
  {
    id: '3',
    nombre: 'VALENTINA',
    apellido: 'GARCIA MARTINEZ',
    dni: '41527894',
    email: 'valentina.garcia@casterapp.com',
    fechaRegistro: '08/10/2023 - 12:21',
    estado: true,
    ultimoLogueo: '12/10/2023 - 11:04',
    ultimaConexion: null
  },
  {
    id: '4',
    nombre: 'LUCAS',
    apellido: 'GOMEZ SILVA',
    dni: '40123456',
    email: 'lucas.gomez@casterapp.com',
    fechaRegistro: '15/11/2023 - 08:30',
    estado: true,
    ultimoLogueo: '10/09/2025 - 14:22',
    ultimaConexion: '10/09/2025 - 15:45'
  },
  {
    id: '5',
    nombre: 'SOFIA',
    apellido: 'MARTINEZ RUIZ',
    dni: '38765432',
    email: 'sofia.martinez@casterapp.com',
    fechaRegistro: '22/11/2023 - 16:45',
    estado: false,
    ultimoLogueo: '05/08/2025 - 09:15',
    ultimaConexion: '05/08/2025 - 10:30'
  }
];

export const UsuarioDetalle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState<UsuarioApp | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simular carga de datos
    const user = MOCK_USERS.find((u) => u.id === id);
    if (user) {
      setUsuario({ ...user });
    } else {
      navigate('/usuarios-app');
    }
  }, [id, navigate]);

  const handleSave = () => {
    setIsLoading(true);
    
    // Simular guardado
    setTimeout(() => {
      console.log('Usuario guardado:', usuario);
      setIsLoading(false);
      // Aquí harías la llamada a la API
      navigate('/usuarios-app');
    }, 1000);
  };

  const handleBack = () => {
    navigate('/usuarios-app');
  };

  if (!usuario) {
    return (
      <div className="usuario-detalle">
        <Card padding="lg">
          <p>Cargando...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="usuario-detalle">
      <div className="usuario-detalle__header">
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft size={20} />}
          onClick={handleBack}
        >
          Volver
        </Button>
        <h1 className="usuario-detalle__title">Detalles del Usuario</h1>
      </div>

      <Card padding="lg">
        <div className="usuario-detalle__form">
          {/* Sección: Información Personal */}
          <div className="usuario-detalle__section">
            <h2 className="usuario-detalle__section-title">
              Información Personal
            </h2>
            
            <div className="usuario-detalle__row">
              <Input
                label="Nombre"
                value={usuario.nombre}
                onChange={(e) =>
                  setUsuario({ ...usuario, nombre: e.target.value })
                }
                fullWidth
              />
              <Input
                label="Apellido"
                value={usuario.apellido}
                onChange={(e) =>
                  setUsuario({ ...usuario, apellido: e.target.value })
                }
                fullWidth
              />
            </div>

            <div className="usuario-detalle__row">
              <Input
                label="DNI"
                value={usuario.dni}
                onChange={(e) =>
                  setUsuario({ ...usuario, dni: e.target.value })
                }
                fullWidth
              />
              <Input
                label="Email"
                type="email"
                value={usuario.email}
                onChange={(e) =>
                  setUsuario({ ...usuario, email: e.target.value })
                }
                fullWidth
              />
            </div>
          </div>

          {/* Sección: Estado y Actividad */}
          <div className="usuario-detalle__section">
            <h2 className="usuario-detalle__section-title">
              Estado y Actividad
            </h2>
            
            <div className="usuario-detalle__row">
              <Input
                label="Fecha de Registro"
                value={usuario.fechaRegistro}
                onChange={(e) =>
                  setUsuario({ ...usuario, fechaRegistro: e.target.value })
                }
                fullWidth
              />
              
              <div className="usuario-detalle__field">
                <label className="usuario-detalle__label">Estado</label>
                <label className="usuario-detalle__toggle">
                  <input
                    type="checkbox"
                    checked={usuario.estado}
                    onChange={(e) =>
                      setUsuario({ ...usuario, estado: e.target.checked })
                    }
                  />
                  <span className="usuario-detalle__toggle-slider"></span>
                  <span className="usuario-detalle__toggle-label">
                    {usuario.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </label>
              </div>
            </div>

            <div className="usuario-detalle__row">
              <Input
                label="Último Logueo"
                value={usuario.ultimoLogueo || 'Sin registro'}
                onChange={(e) =>
                  setUsuario({ ...usuario, ultimoLogueo: e.target.value })
                }
                fullWidth
              />
              <Input
                label="Última Conexión"
                value={usuario.ultimaConexion || 'Sin última conexión'}
                onChange={(e) =>
                  setUsuario({ ...usuario, ultimaConexion: e.target.value })
                }
                fullWidth
              />
            </div>
          </div>

          {/* Acciones */}
          <div className="usuario-detalle__actions">
            <Button variant="outline" onClick={handleBack}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={handleSave}
              isLoading={isLoading}
            >
              Guardar Cambios
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

