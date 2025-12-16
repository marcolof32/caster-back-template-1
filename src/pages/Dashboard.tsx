import React from 'react';
import { Users, UserCheck, UserPlus, Bell, Image, MessageSquare } from 'lucide-react';
import { Card } from '../components/ui';
import './Dashboard.css';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down';
  trendValue?: string;
  color?: 'primary' | 'success' | 'warning' | 'error';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  color = 'primary'
}) => {
  return (
    <Card padding="md" className="metric-card">
      <div className="metric-card__content">
        <div className="metric-card__info">
          <div className="metric-card__title">{title}</div>
          <div className="metric-card__value">{value}</div>
          {subtitle && (
            <div className="metric-card__subtitle">{subtitle}</div>
          )}
          {trend && trendValue && (
            <div className={`metric-card__trend metric-card__trend--${trend}`}>
              {trend === 'up' ? '↑' : '↓'} {trendValue}
            </div>
          )}
        </div>
        <div className={`metric-card__icon metric-card__icon--${color}`}>
          {icon}
        </div>
      </div>
    </Card>
  );
};

export const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h1 className="dashboard__title">Dashboard</h1>
          <p className="dashboard__subtitle">
            Bienvenido al panel de administración
          </p>
        </div>
      </div>

      <div className="dashboard__metrics">
        <MetricCard
          title="Total Usuarios"
          value="2,847"
          subtitle="Usuarios registrados"
          icon={<Users size={28} />}
          color="primary"
          trend="up"
          trendValue="+12% vs mes anterior"
        />

        <MetricCard
          title="Usuarios Activos"
          value="1,932"
          subtitle="Activos este mes"
          icon={<UserCheck size={28} />}
          color="success"
          trend="up"
          trendValue="+8% vs mes anterior"
        />

        <MetricCard
          title="Nuevos Hoy"
          value="23"
          subtitle="Registros de hoy"
          icon={<UserPlus size={28} />}
          color="warning"
        />

        <MetricCard
          title="Notificaciones"
          value="156"
          subtitle="Notificaciones enviadas"
          icon={<Bell size={28} />}
          color="primary"
        />

        <MetricCard
          title="Banners Activos"
          value="4"
          subtitle="Banners publicados"
          icon={<Image size={28} />}
          color="success"
        />

        <MetricCard
          title="Pop-ups Activos"
          value="2"
          subtitle="Pop-ups publicados"
          icon={<MessageSquare size={28} />}
          color="warning"
        />
      </div>

      <div className="dashboard__charts">
        <Card padding="lg" className="dashboard__chart-card">
          <h3 className="dashboard__chart-title">Actividad Reciente</h3>
          <div className="dashboard__chart-placeholder">
            <div className="dashboard__chart-icon">
              <Users size={48} />
            </div>
            <p>Gráfico de actividad de usuarios</p>
            <p className="dashboard__chart-info">
              Los gráficos se pueden integrar con librerías como Chart.js, Recharts o ApexCharts
            </p>
          </div>
        </Card>

        <Card padding="lg" className="dashboard__chart-card">
          <h3 className="dashboard__chart-title">Estadísticas del Mes</h3>
          <div className="dashboard__chart-placeholder">
            <div className="dashboard__chart-icon">
              <Bell size={48} />
            </div>
            <p>Gráfico de notificaciones</p>
            <p className="dashboard__chart-info">
              Integrar tus métricas personalizadas aquí
            </p>
          </div>
        </Card>
      </div>

      <Card padding="lg" className="dashboard__activity">
        <h3 className="dashboard__activity-title">Actividad del Sistema</h3>
        <div className="dashboard__activity-list">
          <div className="dashboard__activity-item">
            <div className="dashboard__activity-icon dashboard__activity-icon--success">
              <UserPlus size={18} />
            </div>
            <div className="dashboard__activity-content">
              <div className="dashboard__activity-text">
                <strong>Juan Pérez</strong> se registró en la aplicación
              </div>
              <div className="dashboard__activity-time">Hace 5 minutos</div>
            </div>
          </div>

          <div className="dashboard__activity-item">
            <div className="dashboard__activity-icon dashboard__activity-icon--primary">
              <Bell size={18} />
            </div>
            <div className="dashboard__activity-content">
              <div className="dashboard__activity-text">
                Se envió notificación <strong>"Actualización de sistema"</strong>
              </div>
              <div className="dashboard__activity-time">Hace 15 minutos</div>
            </div>
          </div>

          <div className="dashboard__activity-item">
            <div className="dashboard__activity-icon dashboard__activity-icon--warning">
              <Image size={18} />
            </div>
            <div className="dashboard__activity-content">
              <div className="dashboard__activity-text">
                Banner <strong>"Promoción de Verano"</strong> fue activado
              </div>
              <div className="dashboard__activity-time">Hace 1 hora</div>
            </div>
          </div>

          <div className="dashboard__activity-item">
            <div className="dashboard__activity-icon dashboard__activity-icon--success">
              <UserCheck size={18} />
            </div>
            <div className="dashboard__activity-content">
              <div className="dashboard__activity-text">
                <strong>María García</strong> se marcó como activa
              </div>
              <div className="dashboard__activity-time">Hace 2 horas</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

