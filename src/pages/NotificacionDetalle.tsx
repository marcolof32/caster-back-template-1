import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { Button, Card, Badge } from '../components/ui';

export const NotificacionDetalle: React.FC = () => {
  const navigate = useNavigate();

  const notif = {
    titulo: 'Promoción especial de Navidad',
    mensaje: '¡Aprovecha nuestros descuentos navideños!',
    estado: 'Programada',
    fechaCreacion: '08/12/2024 - 14:22',
    fechaEnvio: '24/12/2024 - 08:00',
    creadoPor: 'Administrador',
    tipoDestinatario: 'Usuarios específicos',
    destino: 'Link externo: https://ejemplo.com/promo',
    csv: { nombre: 'usuarios.csv', registros: 156 }
  };

  return (
    <div style={{ animation: 'fadeIn 0.2s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Button variant="ghost" leftIcon={<ArrowLeft size={20} />} onClick={() => navigate('/notificaciones')}>
          Volver
        </Button>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', margin: 0 }}>
          Detalle de Notificación
        </h1>
      </div>

      <Card padding="lg">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div>
            <label style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
              Título
            </label>
            <p style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--font-semibold)', margin: 0 }}>
              {notif.titulo}
            </p>
          </div>

          <div>
            <label style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
              Mensaje
            </label>
            <p style={{ margin: 0 }}>{notif.mensaje}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--space-4)' }}>
            <div>
              <label style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
                Estado
              </label>
              <Badge variant="info">{notif.estado}</Badge>
            </div>
            <div>
              <label style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
                Fecha de creación
              </label>
              <p style={{ margin: 0 }}>{notif.fechaCreacion}</p>
            </div>
            <div>
              <label style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
                Fecha de envío
              </label>
              <p style={{ margin: 0 }}>{notif.fechaEnvio}</p>
            </div>
            <div>
              <label style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
                Creado por
              </label>
              <p style={{ margin: 0 }}>{notif.creadoPor}</p>
            </div>
          </div>

          <div>
            <label style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
              Destinatarios
            </label>
            <p style={{ margin: 0 }}>{notif.tipoDestinatario}</p>
          </div>

          {notif.csv && (
            <div>
              <label style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
                Archivo CSV
              </label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--bg-surface-secondary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 'var(--font-medium)', margin: 0 }}>{notif.csv.nombre}</p>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', margin: 0 }}>
                    {notif.csv.registros} registros
                  </p>
                </div>
                <Button variant="outline" size="sm" leftIcon={<Download size={16} />}>
                  Descargar
                </Button>
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', display: 'block', marginBottom: 'var(--space-2)' }}>
              Destino
            </label>
            <p style={{ margin: 0 }}>{notif.destino}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
