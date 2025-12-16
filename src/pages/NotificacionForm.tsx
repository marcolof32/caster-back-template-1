import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ArrowLeft, Upload, FileText, Trash2 } from 'lucide-react';
import { Button, Input, Card } from '../components/ui';
import {
  NotificacionFormData,
  TipoDestinatario,
  TipoDestino,
  ArchivoCSV,
  DEEPLINK_OPTIONS,
} from '../types/notificaciones';
import './NotificacionForm.css';

// Datos mock para edición
const MOCK_NOTIFICACION = {
  id: '2',
  titulo: 'Promoción especial de Navidad',
  mensaje: '¡Aprovecha nuestros descuentos navideños!',
  tipoDestinatario: 'todos' as TipoDestinatario,
  tipoDestino: 'link_externo' as TipoDestino,
  deeplink: '',
  urlExterna: 'https://ejemplo.com/promo',
  abrirVentanaExterna: true,
  programada: true,
  fechaProgramada: '2024-12-24',
  horaProgramada: '08:00',
};

export const NotificacionForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;
  const isReadOnly = location.pathname.includes('/detalle/');

  const [formData, setFormData] = useState<NotificacionFormData>({
    titulo: '',
    mensaje: '',
    tipoDestinatario: 'todos',
    tipoDestino: 'sin_accion',
    deeplink: '',
    urlExterna: '',
    abrirVentanaExterna: false,
    programada: false,
    fechaProgramada: '',
    horaProgramada: '',
    csvArchivo: undefined,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Cargar datos si estamos editando
  useEffect(() => {
    if (isEditing) {
      // En producción, esto sería una llamada a la API
      setFormData({
        ...MOCK_NOTIFICACION,
      });
    }
  }, [isEditing]);

  // Validar formulario
  const validarFormulario = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.titulo.trim()) {
      newErrors.titulo = 'El título es obligatorio';
    } else if (formData.titulo.length > 60) {
      newErrors.titulo = 'El título no puede exceder 60 caracteres';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es obligatorio';
    } else if (formData.mensaje.length > 200) {
      newErrors.mensaje = 'El mensaje no puede exceder 200 caracteres';
    }

    if (formData.tipoDestinatario === 'especificos' && !formData.csvArchivo) {
      newErrors.csv = 'Debe cargar un archivo CSV con los destinatarios';
    }

    if (formData.tipoDestino === 'deeplink' && !formData.deeplink) {
      newErrors.deeplink = 'Debe seleccionar un DeepLink';
    }

    if (formData.tipoDestino === 'link_externo') {
      if (!formData.urlExterna.trim()) {
        newErrors.urlExterna = 'La URL es obligatoria';
      } else if (!isValidUrl(formData.urlExterna)) {
        newErrors.urlExterna = 'La URL no es válida';
      }
    }

    if (formData.programada) {
      if (!formData.fechaProgramada) {
        newErrors.fechaProgramada = 'La fecha es obligatoria';
      }
      if (!formData.horaProgramada) {
        newErrors.horaProgramada = 'La hora es obligatoria';
      }

      // Validar que la fecha/hora no sea en el pasado
      if (formData.fechaProgramada && formData.horaProgramada) {
        const fechaHora = new Date(
          `${formData.fechaProgramada}T${formData.horaProgramada}`
        );
        if (fechaHora < new Date()) {
          newErrors.fechaProgramada = 'La fecha y hora no pueden ser en el pasado';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Validar URL
  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Manejar cambio de tipo de destinatario
  const handleTipoDestinatarioChange = (tipo: TipoDestinatario) => {
    setFormData({
      ...formData,
      tipoDestinatario: tipo,
      csvArchivo: tipo === 'todos' ? undefined : formData.csvArchivo,
    });
  };

  // Manejar carga de CSV
  const handleCSVUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.name.endsWith('.csv')) {
      const csvArchivo: ArchivoCSV = {
        id: Date.now().toString(),
        nombre: file.name,
        fechaCarga: new Date().toLocaleDateString('es-ES'),
        cantidadRegistros: Math.floor(Math.random() * 500) + 50, // Simulado
      };
      setFormData({ ...formData, csvArchivo });
      setErrors({ ...errors, csv: '' });
    } else {
      setErrors({ ...errors, csv: 'Solo se permiten archivos .csv' });
    }
  };

  // Eliminar CSV
  const handleEliminarCSV = () => {
    setFormData({ ...formData, csvArchivo: undefined });
  };

  // Guardar como borrador
  const handleGuardarBorrador = async () => {
    if (!formData.titulo.trim() || !formData.mensaje.trim()) {
      validarFormulario();
      return;
    }

    setIsLoading(true);
    // Simular guardado
    setTimeout(() => {
      console.log('Guardado como borrador:', formData);
      setIsLoading(false);
      navigate('/notificaciones');
    }, 1000);
  };

  // Enviar o programar
  const handleEnviar = async () => {
    if (!validarFormulario()) return;

    setIsLoading(true);
    // Simular envío
    setTimeout(() => {
      console.log(
        formData.programada ? 'Notificación programada:' : 'Notificación enviada:',
        formData
      );
      setIsLoading(false);
      navigate('/notificaciones');
    }, 1000);
  };

  // Cancelar
  const handleCancelar = () => {
    navigate('/notificaciones');
  };

  // Verificar si el formulario es válido para mostrar botón enviar
  const isFormValid =
    formData.titulo.trim() &&
    formData.mensaje.trim() &&
    (formData.tipoDestinatario !== 'especificos' || formData.csvArchivo) &&
    (formData.tipoDestino !== 'deeplink' || formData.deeplink) &&
    (formData.tipoDestino !== 'link_externo' || formData.urlExterna) &&
    (!formData.programada ||
      (formData.fechaProgramada && formData.horaProgramada));

  return (
    <div className="notificacion-form-page">
      {/* HEADER */}
      <div className="notificacion-form-page__header">
        <Button variant="ghost" leftIcon={<ArrowLeft size={20} />} onClick={handleCancelar}>
          Volver
        </Button>
        <h1 className="notificacion-form-page__title">
          {isReadOnly ? 'Detalle de Notificación' : isEditing ? 'Editar Notificación' : 'Crear Notificación'}
        </h1>
      </div>

      <Card padding="lg">
        <div className="notificacion-form">
          {/* INFORMACIÓN BÁSICA */}
          <div className="notificacion-form__section">
            <h2 className="notificacion-form__section-title">Información básica</h2>

            <Input
              label="Título"
              value={formData.titulo}
              onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
              placeholder="Título de la notificación"
              error={errors.titulo}
              helperText={!isReadOnly ? `${formData.titulo.length}/60 caracteres` : undefined}
              fullWidth
              disabled={isReadOnly}
            />

            <div className="notificacion-form__field">
              <label className="notificacion-form__label">Mensaje</label>
              <textarea
                className={`notificacion-form__textarea ${
                  errors.mensaje ? 'notificacion-form__textarea--error' : ''
                } ${isReadOnly ? 'notificacion-form__textarea--disabled' : ''}`}
                value={formData.mensaje}
                onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                placeholder="Mensaje de la notificación"
                rows={4}
                disabled={isReadOnly}
              />
              {errors.mensaje && (
                <span className="notificacion-form__error">{errors.mensaje}</span>
              )}
              {!isReadOnly && (
                <span className="notificacion-form__helper">
                  {formData.mensaje.length}/200 caracteres
                </span>
              )}
            </div>
          </div>

          {/* DESTINATARIOS */}
          <div className="notificacion-form__section">
            <h2 className="notificacion-form__section-title">Destinatarios</h2>

            <div className="notificacion-form__radio-group">
              <label className="notificacion-form__radio">
                <input
                  type="radio"
                  name="tipoDestinatario"
                  checked={formData.tipoDestinatario === 'todos'}
                  onChange={() => handleTipoDestinatarioChange('todos')}
                  disabled={isReadOnly}
                />
                <span className="notificacion-form__radio-label">
                  Todos los usuarios
                </span>
              </label>

              <label className="notificacion-form__radio">
                <input
                  type="radio"
                  name="tipoDestinatario"
                  checked={formData.tipoDestinatario === 'especificos'}
                  onChange={() => handleTipoDestinatarioChange('especificos')}
                  disabled={isReadOnly}
                />
                <span className="notificacion-form__radio-label">
                  Usuarios específicos (CSV)
                </span>
              </label>
            </div>

            {formData.tipoDestinatario === 'especificos' && (
              <div className="notificacion-form__csv-section">
                {!formData.csvArchivo ? (
                  <div className="notificacion-form__csv-upload">
                    <Upload size={32} className="notificacion-form__csv-icon" />
                    <p>Cargar archivo CSV con destinatarios</p>
                    <label className="notificacion-form__csv-btn">
                      <input
                        type="file"
                        accept=".csv"
                        onChange={handleCSVUpload}
                        hidden
                      />
                      Seleccionar archivo
                    </label>
                    <span className="notificacion-form__csv-hint">
                      El CSV debe contener email, ID de usuario o DNI
                    </span>
                  </div>
                ) : (
                  <div className="notificacion-form__csv-file">
                    <div className="notificacion-form__csv-file-info">
                      <FileText size={24} />
                      <div>
                        <p className="notificacion-form__csv-name">
                          {formData.csvArchivo.nombre}
                        </p>
                        <p className="notificacion-form__csv-details">
                          {formData.csvArchivo.cantidadRegistros} registros •{' '}
                          {formData.csvArchivo.fechaCarga}
                        </p>
                      </div>
                    </div>
                    <button
                      className="notificacion-form__csv-remove"
                      onClick={handleEliminarCSV}
                      title="Eliminar CSV"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}
                {errors.csv && (
                  <span className="notificacion-form__error">{errors.csv}</span>
                )}
              </div>
            )}
          </div>

          {/* DESTINO */}
          <div className="notificacion-form__section">
            <h2 className="notificacion-form__section-title">Destino de la notificación</h2>

            <div className="notificacion-form__field">
              <label className="notificacion-form__label">Tipo de destino</label>
              <select
                className="notificacion-form__select"
                value={formData.tipoDestino}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tipoDestino: e.target.value as TipoDestino,
                    deeplink: '',
                    urlExterna: '',
                  })
                }
                disabled={isReadOnly}
              >
                <option value="sin_accion">Sin acción</option>
                <option value="deeplink">DeepLink (sección de la app)</option>
                <option value="link_externo">Link externo</option>
              </select>
            </div>

            {formData.tipoDestino === 'deeplink' && (
              <div className="notificacion-form__field">
                <label className="notificacion-form__label">Sección de la app</label>
                <select
                  className={`notificacion-form__select ${
                    errors.deeplink ? 'notificacion-form__select--error' : ''
                  }`}
                  value={formData.deeplink}
                  onChange={(e) =>
                    setFormData({ ...formData, deeplink: e.target.value })
                  }
                  disabled={isReadOnly}
                >
                  {DEEPLINK_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                {errors.deeplink && (
                  <span className="notificacion-form__error">{errors.deeplink}</span>
                )}
              </div>
            )}

            {formData.tipoDestino === 'link_externo' && (
              <>
                <Input
                  label="URL externa"
                  type="url"
                  value={formData.urlExterna}
                  onChange={(e) =>
                    setFormData({ ...formData, urlExterna: e.target.value })
                  }
                  placeholder="https://ejemplo.com"
                  error={errors.urlExterna}
                  fullWidth
                  disabled={isReadOnly}
                />

                <label className="notificacion-form__checkbox">
                  <input
                    type="checkbox"
                    checked={formData.abrirVentanaExterna}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        abrirVentanaExterna: e.target.checked,
                      })
                    }
                    disabled={isReadOnly}
                  />
                  <span>Abrir en ventana externa (iOS)</span>
                </label>
              </>
            )}
          </div>

          {/* PROGRAMACIÓN */}
          {!isReadOnly && (
            <div className="notificacion-form__section">
              <h2 className="notificacion-form__section-title">Programar envío</h2>

              <div className="notificacion-form__switch-row">
                <label className="notificacion-form__switch">
                  <input
                    type="checkbox"
                    checked={formData.programada}
                    onChange={(e) =>
                      setFormData({ ...formData, programada: e.target.checked })
                    }
                  />
                  <span className="notificacion-form__switch-slider"></span>
                </label>
                <span className="notificacion-form__switch-label">
                  {formData.programada ? 'Programar para más tarde' : 'Enviar inmediatamente'}
                </span>
              </div>

              {formData.programada && (
                <div className="notificacion-form__datetime-row">
                  <Input
                    label="Fecha"
                    type="date"
                    value={formData.fechaProgramada}
                    onChange={(e) =>
                      setFormData({ ...formData, fechaProgramada: e.target.value })
                    }
                    error={errors.fechaProgramada}
                  />
                  <Input
                    label="Hora"
                    type="time"
                    value={formData.horaProgramada}
                    onChange={(e) =>
                      setFormData({ ...formData, horaProgramada: e.target.value })
                    }
                    error={errors.horaProgramada}
                  />
                  <div className="notificacion-form__timezone">
                    <span className="notificacion-form__timezone-label">Zona horaria:</span>
                    <span className="notificacion-form__timezone-value">
                      {Intl.DateTimeFormat().resolvedOptions().timeZone}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ACCIONES */}
          <div className="notificacion-form__actions">
            {isReadOnly ? (
              <Button variant="primary" onClick={handleCancelar}>
                Cerrar
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={handleCancelar}>
                  Cancelar
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleGuardarBorrador}
                  isLoading={isLoading}
                >
                  Guardar y salir
                </Button>
                {isFormValid && (
                  <Button variant="primary" onClick={handleEnviar} isLoading={isLoading}>
                    {formData.programada ? 'Programar' : 'Enviar'}
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};
