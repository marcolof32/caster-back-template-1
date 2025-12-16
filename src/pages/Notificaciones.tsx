import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Calendar, X, ChevronRight } from 'lucide-react';
import { Button, Input, Card, Modal, Badge, EditIcon, DeleteIcon } from '../components/ui';
import {
  Notificacion,
  EstadoNotificacion,
  FiltrosNotificacion,
  USUARIOS_BO,
} from '../types/notificaciones';
import './Notificaciones.css';

// Datos de ejemplo
const MOCK_NOTIFICACIONES: Notificacion[] = [
  {
    id: '1',
    titulo: 'Actualización de la app disponible',
    mensaje: 'Nueva versión con mejoras de rendimiento',
    tipoDestinatario: 'todos',
    tipoDestino: 'deeplink',
    deeplink: 'settings',
    programada: false,
    estado: 'Enviada',
    fechaCreacion: '10/12/2024 - 09:30',
    fechaEnvio: '10/12/2024 - 09:30',
    creadoPor: 'Administrador',
  },
  {
    id: '2',
    titulo: 'Promoción especial de Navidad',
    mensaje: '¡Aprovecha nuestros descuentos navideños!',
    tipoDestinatario: 'todos',
    tipoDestino: 'link_externo',
    urlExterna: 'https://ejemplo.com/promo',
    abrirVentanaExterna: true,
    programada: true,
    fechaProgramada: '24/12/2024',
    horaProgramada: '08:00',
    estado: 'Programada',
    fechaCreacion: '08/12/2024 - 14:22',
    creadoPor: 'Administrador',
  },
  {
    id: '3',
    titulo: 'Recordatorio de verificación',
    mensaje: 'Completa tu perfil para acceder a más funciones',
    tipoDestinatario: 'especificos',
    tipoDestino: 'deeplink',
    deeplink: 'profile',
    programada: false,
    estado: 'Borrador',
    fechaCreacion: '12/12/2024 - 11:45',
    creadoPor: 'Editor 1',
    csvArchivo: {
      id: 'csv1',
      nombre: 'usuarios_pendientes.csv',
      fechaCarga: '12/12/2024',
      cantidadRegistros: 156,
    },
  },
  {
    id: '4',
    titulo: 'Mantenimiento programado',
    mensaje: 'El sistema estará en mantenimiento el domingo',
    tipoDestinatario: 'todos',
    tipoDestino: 'sin_accion',
    programada: true,
    fechaProgramada: '20/12/2024',
    horaProgramada: '22:00',
    estado: 'Programada',
    fechaCreacion: '05/12/2024 - 16:00',
    creadoPor: 'Administrador',
  },
  {
    id: '5',
    titulo: 'Bienvenida a nuevos usuarios',
    mensaje: 'Gracias por unirte a nuestra comunidad',
    tipoDestinatario: 'especificos',
    tipoDestino: 'deeplink',
    deeplink: 'home',
    programada: false,
    estado: 'Enviada',
    fechaCreacion: '01/12/2024 - 10:00',
    fechaEnvio: '01/12/2024 - 10:00',
    creadoPor: 'Editor 2',
  },
];

export const Notificaciones: React.FC = () => {
  const navigate = useNavigate();
  const [notificaciones, setNotificaciones] = useState<Notificacion[]>(MOCK_NOTIFICACIONES);
  const [filtros, setFiltros] = useState<FiltrosNotificacion>({
    busqueda: '',
    estado: 'Todos',
    fechaDesde: '',
    fechaHasta: '',
    creadoPor: '',
  });
  const [errorFecha, setErrorFecha] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Validar filtros de fecha
  const validarFechas = (desde: string, hasta: string) => {
    if (desde && hasta && desde > hasta) {
      setErrorFecha('La fecha de inicio no puede ser mayor a la fecha fin');
      return false;
    }
    setErrorFecha(null);
    return true;
  };

  // Actualizar filtro de fecha desde
  const handleFechaDesde = (value: string) => {
    setFiltros({ ...filtros, fechaDesde: value });
    validarFechas(value, filtros.fechaHasta);
  };

  // Actualizar filtro de fecha hasta
  const handleFechaHasta = (value: string) => {
    setFiltros({ ...filtros, fechaHasta: value });
    validarFechas(filtros.fechaDesde, value);
  };

  // Limpiar filtros
  const handleLimpiarFiltros = () => {
    setFiltros({
      busqueda: '',
      estado: 'Todos',
      fechaDesde: '',
      fechaHasta: '',
      creadoPor: '',
    });
    setErrorFecha(null);
  };

  // Filtrar notificaciones
  const notificacionesFiltradas = notificaciones.filter((notif) => {
    const matchBusqueda =
      !filtros.busqueda ||
      notif.titulo.toLowerCase().includes(filtros.busqueda.toLowerCase());

    const matchEstado =
      filtros.estado === 'Todos' || notif.estado === filtros.estado;

    const matchCreadoPor =
      !filtros.creadoPor || notif.creadoPor === filtros.creadoPor;

    return matchBusqueda && matchEstado && matchCreadoPor;
  });

  // Navegar a crear
  const handleCrear = () => {
    navigate('/notificaciones/crear');
  };

  // Navegar a editar
  const handleEditar = (id: string) => {
    navigate(`/notificaciones/editar/${id}`);
  };

  // Navegar a detalle
  const handleVerDetalle = (id: string) => {
    navigate(`/notificaciones/detalle/${id}`);
  };

  // Abrir modal de eliminar
  const handleEliminar = (id: string) => {
    setDeletingId(id);
    setIsDeleteModalOpen(true);
  };

  // Confirmar eliminación
  const handleConfirmarEliminar = () => {
    if (deletingId) {
      setNotificaciones(notificaciones.filter((n) => n.id !== deletingId));
      setIsDeleteModalOpen(false);
      setDeletingId(null);
    }
  };

  // Obtener variante de badge según estado
  const getBadgeVariant = (estado: EstadoNotificacion) => {
    switch (estado) {
      case 'Enviada':
        return 'success';
      case 'Programada':
        return 'info';
      case 'Borrador':
        return 'neutral';
      default:
        return 'neutral';
    }
  };

  // Verificar si se puede editar/eliminar
  const puedeEditar = (estado: EstadoNotificacion) =>
    estado === 'Programada' || estado === 'Borrador';

  return (
    <div className="notificaciones-page">
      {/* HEADER */}
      <div className="notificaciones-page__header">
        <div>
          <h1 className="notificaciones-page__title">Notificaciones</h1>
          <p className="notificaciones-page__subtitle">
            Gestiona las notificaciones del sistema
          </p>
        </div>
        <Button leftIcon={<Plus size={20} />} variant="primary" onClick={handleCrear}>
          Agregar
        </Button>
      </div>

      {/* FILTROS */}
      <Card padding="md" className="notificaciones-page__filters">
        <div className="notificaciones-page__filters-row">
          <div className="notificaciones-page__search">
            <Search size={20} className="notificaciones-page__search-icon" />
            <input
              type="text"
              placeholder="Buscar por título..."
              value={filtros.busqueda}
              onChange={(e) => setFiltros({ ...filtros, busqueda: e.target.value })}
              className="notificaciones-page__search-input"
            />
            {filtros.busqueda && (
              <button
                className="notificaciones-page__search-clear"
                onClick={() => setFiltros({ ...filtros, busqueda: '' })}
              >
                <X size={16} />
              </button>
            )}
          </div>

          <select
            className="notificaciones-page__select"
            value={filtros.estado}
            onChange={(e) =>
              setFiltros({
                ...filtros,
                estado: e.target.value as EstadoNotificacion | 'Todos',
              })
            }
          >
            <option value="Todos">Todos los estados</option>
            <option value="Enviada">Enviada</option>
            <option value="Programada">Programada</option>
            <option value="Borrador">Borrador</option>
          </select>

          <div className="notificaciones-page__date-group">
            <Calendar size={18} className="notificaciones-page__date-icon" />
            <Input
              type="date"
              value={filtros.fechaDesde}
              onChange={(e) => handleFechaDesde(e.target.value)}
              className="notificaciones-page__date-input"
            />
            <span className="notificaciones-page__date-separator">-</span>
            <Input
              type="date"
              value={filtros.fechaHasta}
              onChange={(e) => handleFechaHasta(e.target.value)}
              className="notificaciones-page__date-input"
            />
          </div>

          <select
            className="notificaciones-page__select"
            value={filtros.creadoPor}
            onChange={(e) => setFiltros({ ...filtros, creadoPor: e.target.value })}
          >
            {USUARIOS_BO.map((u) => (
              <option key={u.value} value={u.value}>
                {u.label}
              </option>
            ))}
          </select>

          <button className="notificaciones-page__clear-btn" onClick={handleLimpiarFiltros}>
            Limpiar filtros
          </button>
        </div>

        {errorFecha && <div className="notificaciones-page__error">{errorFecha}</div>}
      </Card>

      {/* TABLA */}
      <Card padding="none">
        <div className="notificaciones-table__wrapper">
          <table className="notificaciones-table">
            <thead>
              <tr>
                <th className="notificaciones-table__th">TÍTULO</th>
                <th className="notificaciones-table__th">FECHA CREACIÓN</th>
                <th className="notificaciones-table__th">FECHA ENVÍO</th>
                <th className="notificaciones-table__th">ESTADO</th>
                <th className="notificaciones-table__th">CREADO POR</th>
                <th className="notificaciones-table__th notificaciones-table__th--actions">
                  ACCIONES
                </th>
              </tr>
            </thead>
            <tbody>
              {notificacionesFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={6} className="notificaciones-table__empty">
                    No se encontraron notificaciones
                  </td>
                </tr>
              ) : (
                notificacionesFiltradas.map((notif) => (
                  <tr key={notif.id} className="notificaciones-table__row">
                    <td className="notificaciones-table__td">
                      <span className="notificaciones-table__titulo">{notif.titulo}</span>
                    </td>
                    <td className="notificaciones-table__td">{notif.fechaCreacion}</td>
                    <td className="notificaciones-table__td">
                      {notif.fechaEnvio || '–'}
                    </td>
                    <td className="notificaciones-table__td">
                      <Badge variant={getBadgeVariant(notif.estado)} size="sm">
                        {notif.estado}
                      </Badge>
                    </td>
                    <td className="notificaciones-table__td">{notif.creadoPor}</td>
                    <td className="notificaciones-table__td notificaciones-table__td--actions">
                      <div className="notificaciones-table__actions">
                        {puedeEditar(notif.estado) ? (
                          <>
                            <button
                              className="notificaciones-table__action-btn notificaciones-table__action-btn--edit"
                              onClick={() => handleEditar(notif.id)}
                              title="Editar"
                            >
                              <EditIcon size={16} />
                            </button>
                            <button
                              className="notificaciones-table__action-btn notificaciones-table__action-btn--delete"
                              onClick={() => handleEliminar(notif.id)}
                              title="Eliminar"
                            >
                              <DeleteIcon size={16} />
                            </button>
                          </>
                        ) : (
                          <button
                            className="notificaciones-table__action-btn notificaciones-table__action-btn--chevron"
                            onClick={() => handleVerDetalle(notif.id)}
                            title="Ver detalle"
                          >
                            <ChevronRight size={20} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* MODAL DE ELIMINACIÓN */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Eliminar Notificación"
        size="sm"
      >
        <div className="notificaciones-delete-modal">
          <p className="notificaciones-delete-modal__message">
            ¿Estás seguro de que deseas eliminar esta notificación? Esta acción no se
            puede deshacer.
          </p>
          <div className="notificaciones-delete-modal__actions">
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmarEliminar}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
