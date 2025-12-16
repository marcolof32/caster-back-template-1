import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { Button, Card } from '../components/ui';

export const NotificacionCSV: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ animation: 'fadeIn 0.2s' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
        <Button variant="ghost" leftIcon={<ArrowLeft size={20} />} onClick={() => navigate(-1)}>
          Volver
        </Button>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', margin: 0 }}>
          Carga de Destinatarios
        </h1>
      </div>

      <Card padding="lg">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-6)', padding: 'var(--space-12)' }}>
          <Upload size={64} style={{ color: 'var(--text-tertiary)' }} />
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)' }}>
              Subir archivo CSV
            </h2>
            <p style={{ color: 'var(--text-secondary)' }}>
              El archivo debe contener email, ID de usuario o DNI
            </p>
          </div>
          <input
            type="file"
            accept=".csv"
            style={{ display: 'none' }}
            id="csv-upload"
          />
          <Button variant="primary" onClick={() => document.getElementById('csv-upload')?.click()}>
            Seleccionar archivo
          </Button>
        </div>
      </Card>
    </div>
  );
};
