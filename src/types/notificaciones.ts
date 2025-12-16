export type EstadoNotificacion = 'Enviada' | 'Programada' | 'Borrador';
export type TipoDestinatario = 'todos' | 'especificos';
export type TipoDestino = 'sin_accion' | 'deeplink' | 'link_externo';

export interface ArchivoCSV {
  id: string;
  nombre: string;
  fechaCarga: string;
  cantidadRegistros: number;
}

export interface Notificacion {
  id: string;
  titulo: string;
  mensaje: string;
  tipoDestinatario: TipoDestinatario;
  tipoDestino: TipoDestino;
  deeplink?: string;
  urlExterna?: string;
  abrirVentanaExterna?: boolean;
  programada: boolean;
  fechaProgramada?: string;
  horaProgramada?: string;
  estado: EstadoNotificacion;
  fechaCreacion: string;
  fechaEnvio?: string;
  creadoPor: string;
  csvArchivo?: ArchivoCSV;
}

export interface NotificacionFormData {
  titulo: string;
  mensaje: string;
  tipoDestinatario: TipoDestinatario;
  tipoDestino: TipoDestino;
  deeplink: string;
  urlExterna: string;
  abrirVentanaExterna: boolean;
  programada: boolean;
  fechaProgramada: string;
  horaProgramada: string;
  csvArchivo?: ArchivoCSV;
}

export interface FiltrosNotificacion {
  busqueda: string;
  estado: EstadoNotificacion | 'Todos';
  fechaDesde: string;
  fechaHasta: string;
  creadoPor: string;
}

export const DEEPLINK_OPTIONS = [
  { value: '', label: 'Seleccionar...' },
  { value: 'home', label: 'Inicio' },
  { value: 'profile', label: 'Perfil' },
  { value: 'settings', label: 'Configuración' },
  { value: 'notifications', label: 'Notificaciones' },
];

export const USUARIOS_BO = [
  { value: '', label: 'Todos los usuarios' },
  { value: 'Administrador', label: 'Administrador' },
  { value: 'Editor 1', label: 'Editor 1' },
  { value: 'Editor 2', label: 'Editor 2' },
];
