import { ConfiguracionColumna } from '@ng-mf/data-access-user';

/**
 * @interface AcuseNotificacionRequerimiento
 * @description
 * Representa la estructura de datos para los documentos de notificación de requerimiento.
 */
export interface AcuseNotificacionRequerimiento {
  /** Número de identificación del documento. */
  numero: string;

  /** Descripción o nombre del documento. */
  documento: string;
}

/**
 * @constant ACUSE_NOTIFICACION_REQUERIMIENTO_ENCABEZADO_DE_TABLA
 * @description
 * Configuración de columnas de la tabla para mostrar los documentos de notificación de requerimiento.
 *
 * Cada columna contiene:
 * - encabezado: Título visible de la columna.
 * - clave: Función para acceder al campo correspondiente.
 * - orden: Orden de aparición.
 *
 * @type {ConfiguracionColumna<AcuseNotificacionRequerimiento>[]}
 */
export const ACUSE_NOTIFICACION_REQUERIMIENTO_ENCABEZADO_DE_TABLA: ConfiguracionColumna<AcuseNotificacionRequerimiento>[] =
  [
    {
      encabezado: 'No.',
      clave: (fila) => fila.numero,
      orden: 1,
    },
    {
      encabezado: 'Documento',
      clave: (fila) => fila.documento,
      orden: 2,
    },
  ];
