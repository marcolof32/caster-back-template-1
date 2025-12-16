import React from 'react';
import { Card } from '../components/ui';
import './Placeholder.css';

interface PlaceholderProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ title, icon, description }) => {
  return (
    <div className="placeholder-page">
      <div className="placeholder-page__header">
        <h1 className="placeholder-page__title">{title}</h1>
        <p className="placeholder-page__subtitle">{description}</p>
      </div>

      <Card padding="lg" className="placeholder-card">
        <div className="placeholder-card__content">
          <div className="placeholder-card__icon">{icon}</div>
          <h3 className="placeholder-card__title">Página en construcción</h3>
          <p className="placeholder-card__text">
            Esta funcionalidad está en desarrollo y estará disponible próximamente.
          </p>
        </div>
      </Card>
    </div>
  );
};

