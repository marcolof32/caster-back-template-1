import React, { useState } from 'react';
import { Search, Download, Bell, X } from 'lucide-react';
import { Button, Input, Card, Modal, ViewMoreIcon, EditIcon, DeleteIcon } from '../components/ui';
import { useNavigate } from 'react-router-dom';
import './UsuariosApp.css';

// Tipos extendidos
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

// Datos de ejemplo con estructura completa
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

export const UsuariosApp: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('Fecha de Registro');
  const [fechaDesde, setFechaDesde] = useState('');
  const [fechaHasta, setFechaHasta] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('Todos');
  const [users, setUsers] = useState<UsuarioApp[]>(MOCK_USERS);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  
  // Estados del modal de edición
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UsuarioApp | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  // Filtrado de usuarios
  const filteredUsers = users.filter((user) => {
    // Búsqueda por texto
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      user.nombre.toLowerCase().includes(searchLower) ||
      user.apellido.toLowerCase().includes(searchLower) ||
      user.dni.includes(searchQuery) ||
      user.email.toLowerCase().includes(searchLower);

    // Filtro por estado
    const matchesEstado =
      estadoFilter === 'Todos' ||
      (estadoFilter === 'Activos' && user.estado) ||
      (estadoFilter === 'Inactivos' && !user.estado);

    return matchesSearch && matchesEstado;
  });

  // Toggle de estado de usuario
  const handleToggleEstado = async (userId: string) => {
    setIsProcessing(userId);
    
    // Simular llamada API
    setTimeout(() => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, estado: !user.estado } : user
        )
      );
      setIsProcessing(null);
      
      // Aquí podrías mostrar un toast de éxito
      console.log('Estado actualizado correctamente');
    }, 500);
  };

  // Limpiar filtros
  const handleLimpiarFiltros = () => {
    setSearchQuery('');
    setFilterCriteria('Fecha de Registro');
    setFechaDesde('');
    setFechaHasta('');
    setEstadoFilter('Todos');
  };

  // Descargar reportes
  const handleDescargarReporteGeneral = () => {
    console.log('Descargando reporte general...');
    // Implementar lógica de descarga
  };

  const handleDescargarReporteDetallado = () => {
    console.log('Descargando reporte detallado de conexiones...');
    // Implementar lógica de descarga
  };

  // Checkbox de selección
  const handleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map((u) => u.id)));
    }
  };

  // Abrir modal de edición
  const handleEditUser = (user: UsuarioApp) => {
    setEditingUser({ ...user });
    setIsEditModalOpen(true);
  };

  // Guardar cambios de edición
  const handleSaveUser = () => {
    if (!editingUser) return;

    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === editingUser.id ? editingUser : user
      )
    );

    setIsEditModalOpen(false);
    setEditingUser(null);
    
    // Aquí podrías mostrar un toast de éxito
    console.log('Usuario actualizado correctamente');
  };

  // Cerrar modal de edición
  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingUser(null);
  };

  // Abrir modal de confirmación de borrado
  const handleDeleteUser = (userId: string) => {
    setDeletingUserId(userId);
    setIsDeleteModalOpen(true);
  };

  // Confirmar borrado
  const handleConfirmDelete = () => {
    if (!deletingUserId) return;

    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.id !== deletingUserId)
    );

    setIsDeleteModalOpen(false);
    setDeletingUserId(null);
    
    // Aquí podrías mostrar un toast de éxito
    console.log('Usuario eliminado correctamente');
  };

  // Cerrar modal de borrado
  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeletingUserId(null);
  };

  // Ver detalles del usuario
  const handleViewUser = (userId: string) => {
    navigate(`/usuarios-app/${userId}`);
  };

  return (
    <div className="usuarios-page">
      {/* HEADER */}
      <div className="usuarios-page__header">
        <div>
          <h1 className="usuarios-page__title">Usuarios App</h1>
          <p className="usuarios-page__subtitle">Administrar usuarios</p>
        </div>
        <Button
          leftIcon={<Bell size={20} />}
          variant="primary"
          onClick={handleDescargarReporteGeneral}
        >
          Reporte General
        </Button>
      </div>

      {/* FILTROS */}
      <div className="usuarios-page__filters">
        <div className="usuarios-page__filters-row">
          <button className="usuarios-page__filters-toggle">
            Filtros
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="usuarios-page__filter-group">
            <select
              className="usuarios-page__select"
              value={filterCriteria}
              onChange={(e) => setFilterCriteria(e.target.value)}
            >
              <option>Fecha de Registro</option>
              <option>Último Logueo</option>
              <option>Última Conexión</option>
            </select>
          </div>

          <Input
            type="date"
            value={fechaDesde}
            onChange={(e) => setFechaDesde(e.target.value)}
            className="usuarios-page__date-input"
          />

          <Input
            type="date"
            value={fechaHasta}
            onChange={(e) => setFechaHasta(e.target.value)}
            className="usuarios-page__date-input"
          />

          <div className="usuarios-page__filter-group">
            <select
              className="usuarios-page__select"
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)}
            >
              <option>Todos</option>
              <option>Activos</option>
              <option>Inactivos</option>
            </select>
          </div>

          <button
            className="usuarios-page__clear-btn"
            onClick={handleLimpiarFiltros}
          >
            Limpiar filtro
          </button>

          <Button
            leftIcon={<Download size={18} />}
            variant="primary"
            size="sm"
            onClick={handleDescargarReporteDetallado}
          >
            Reporte detallado de conexiones
          </Button>
        </div>
      </div>

      {/* BUSCADOR */}
      <div className="usuarios-page__search">
        <div className="usuarios-page__search-wrapper">
          <Search size={20} className="usuarios-page__search-icon" />
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="usuarios-page__search-input"
          />
          {searchQuery && (
            <button
              className="usuarios-page__search-clear"
              onClick={() => setSearchQuery('')}
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* TABLA */}
      <Card padding="none">
        <div className="usuarios-table__wrapper">
          <table className="usuarios-table">
            <thead>
              <tr>
                <th className="usuarios-table__th usuarios-table__th--checkbox">
                  <input
                    type="checkbox"
                    checked={
                      selectedUsers.size === filteredUsers.length &&
                      filteredUsers.length > 0
                    }
                    onChange={handleSelectAll}
                    className="usuarios-table__checkbox"
                  />
                </th>
                <th className="usuarios-table__th">NOMBRE</th>
                <th className="usuarios-table__th">APELLIDO</th>
                <th className="usuarios-table__th">DNI</th>
                <th className="usuarios-table__th">EMAIL</th>
                <th className="usuarios-table__th">ESTADO</th>
                <th className="usuarios-table__th usuarios-table__th--actions">
                  ACCIONES
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={9} className="usuarios-table__empty">
                    No se encontraron usuarios
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="usuarios-table__row">
                    <td className="usuarios-table__td usuarios-table__td--checkbox">
                      <input
                        type="checkbox"
                        checked={selectedUsers.has(user.id)}
                        onChange={() => handleSelectUser(user.id)}
                        className="usuarios-table__checkbox"
                      />
                    </td>
                    <td className="usuarios-table__td">
                      <div className="usuarios-table__user-cell">
                        <div className="usuarios-table__avatar">
                          {user.nombre.charAt(0)}
                        </div>
                        <span className="usuarios-table__user-name">
                          {user.nombre}
                        </span>
                      </div>
                    </td>
                    <td className="usuarios-table__td">{user.apellido}</td>
                    <td className="usuarios-table__td">{user.dni}</td>
                    <td className="usuarios-table__td">
                      <a
                        href={`mailto:${user.email}`}
                        className="usuarios-table__email"
                      >
                        {user.email}
                      </a>
                    </td>
                    <td className="usuarios-table__td usuarios-table__td--estado">
                      <label className="usuarios-table__toggle">
                        <input
                          type="checkbox"
                          checked={user.estado}
                          onChange={() => handleToggleEstado(user.id)}
                          disabled={isProcessing === user.id}
                        />
                        <span className="usuarios-table__toggle-slider"></span>
                      </label>
                    </td>
                    <td className="usuarios-table__td usuarios-table__td--actions">
                      <div className="usuarios-table__actions">
                        <button
                          className="usuarios-table__action-btn usuarios-table__action-btn--view"
                          onClick={() => handleViewUser(user.id)}
                          title="Ver más"
                        >
                          <ViewMoreIcon size={18} />
                        </button>
                        <button
                          className="usuarios-table__action-btn usuarios-table__action-btn--edit"
                          onClick={() => handleEditUser(user)}
                          title="Editar usuario"
                        >
                          <EditIcon size={18} />
                        </button>
                        <button
                          className="usuarios-table__action-btn usuarios-table__action-btn--delete"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Eliminar usuario"
                        >
                          <DeleteIcon size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* MODAL DE EDICIÓN */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title="Editar Usuario"
        size="lg"
      >
        {editingUser && (
          <div className="edit-user-form">
            <div className="edit-user-form__row">
              <Input
                label="Nombre"
                value={editingUser.nombre}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, nombre: e.target.value })
                }
                fullWidth
              />
              <Input
                label="Apellido"
                value={editingUser.apellido}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, apellido: e.target.value })
                }
                fullWidth
              />
            </div>

            <div className="edit-user-form__row">
              <Input
                label="DNI"
                value={editingUser.dni}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, dni: e.target.value })
                }
                fullWidth
              />
              <Input
                label="Email"
                type="email"
                value={editingUser.email}
                onChange={(e) =>
                  setEditingUser({ ...editingUser, email: e.target.value })
                }
                fullWidth
              />
            </div>

            <div className="edit-user-form__row">
              <Input
                label="Fecha de Registro"
                value={editingUser.fechaRegistro}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    fechaRegistro: e.target.value
                  })
                }
                fullWidth
              />
              <div className="edit-user-form__toggle-field">
                <label className="edit-user-form__label">Estado</label>
                <label className="edit-user-form__toggle">
                  <input
                    type="checkbox"
                    checked={editingUser.estado}
                    onChange={(e) =>
                      setEditingUser({
                        ...editingUser,
                        estado: e.target.checked
                      })
                    }
                  />
                  <span className="edit-user-form__toggle-slider"></span>
                  <span className="edit-user-form__toggle-label">
                    {editingUser.estado ? 'Activo' : 'Inactivo'}
                  </span>
                </label>
              </div>
            </div>

            <div className="edit-user-form__row">
              <Input
                label="Último Logueo"
                value={editingUser.ultimoLogueo || ''}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    ultimoLogueo: e.target.value
                  })
                }
                fullWidth
              />
              <Input
                label="Última Conexión"
                value={editingUser.ultimaConexion || ''}
                onChange={(e) =>
                  setEditingUser({
                    ...editingUser,
                    ultimaConexion: e.target.value
                  })
                }
                fullWidth
              />
            </div>

            <div className="edit-user-form__actions">
              <Button variant="outline" onClick={handleCloseEditModal}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSaveUser}>
                Guardar Cambios
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* MODAL DE CONFIRMACIÓN DE BORRADO */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Eliminar Usuario"
        size="sm"
      >
        <div className="delete-user-modal">
          <p className="delete-user-modal__message">
            ¿Estás seguro de que deseas eliminar este usuario? Esta acción no
            se puede deshacer.
          </p>
          <div className="delete-user-modal__actions">
            <Button variant="outline" onClick={handleCloseDeleteModal}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Eliminar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

