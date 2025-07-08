/**
 * PASOS DEL PROCESO
 * Arreglo que representa los pasos de un flujo para el registro de solicitudes.
 * Cada paso incluye:
 *  - índice de orden,
 *  - título que lo describe,
 *  - y los estados `activo` y `completado`.
 */
export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true,
    completado: true,
  },
  {
    indice: 2,
    titulo: 'Requisitos necesarios',
    activo: false,
    completado: false,
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * CONFIGURACIÓN DE COLUMNAS PARA LA TABLA DE DOMICILIOS
 * Cada objeto especifica:
 *  - Encabezado visible en la UI,
 *  - Función para obtener el valor de la propiedad del modelo `DomicilioInfo`,
 *  - Orden de la columna en la visualización.
 */
export const CONFIGURACION_DOMICILIOS = [ /* ...sin cambios */ ];

/**
 * CONFIGURACIÓN DE COLUMNAS PARA ACCIONISTAS
 * Define los campos que se mostrarán para cada accionista.
 * Utiliza el modelo `Complimentaria`.
 */
export const CONFIGURACION_ACCIONISTAS = [ /* ...sin cambios */ ];

/**
 * CONFIGURACIÓN DE COLUMNAS PARA FEDATARIOS
 * Muestra la información relacionada con fedatarios públicos.
 * Extrae valores del modelo `Federetarios`.
 */
export const CONFIGURACION_FEDERETARIOS = [ /* ...sin cambios */ ];

/**
 * CONFIGURACIÓN DE COLUMNAS PARA OPERACIONES
 * Muestra domicilios y detalles operativos de plantas o bodegas.
 * Incluye campo transformado como estatus legible: "Activada" o "Baja".
 */
export const CONFIGURACION_OPERACIONES = [ /* ...sin cambios */ ];

/**
 * CONFIGURACIÓN DE LA BITÁCORA
 * Se usa para mostrar los cambios realizados sobre registros.
 * Incluye tipo de modificación, fecha y valores antes/después.
 */
export const CONFIGURACION_BITACORA_TABLA = [ /* ...sin cambios */ ];

/**
 * CONFIGURACIÓN DE ANEXOS DE EXPORTACIÓN
 * Muestra las fracciones arancelarias exportables y su descripción.
 */
export const CONFIGURACION_ANEXOS_TABLA = [ /* ...sin cambios */ ];

/**
 * CONFIGURACIÓN DE ANEXOS DE IMPORTACIÓN
 * Muestra tanto fracción exportación como importación para productos específicos.
 */
export const CONFIGURACION_ANEXOS_IMPORTACION = [ /* ...sin cambios */ ];

/**
 * CONFIGURACIÓN DE MODIFICACIONES
 * Define la estructura para mostrar los detalles de las solicitudes de modificación.
 * Extrae datos del modelo `DatosDelModificacion`.
 */
export const CONFIGURACION_MODIFICACION = [ /* ...sin cambios */ ];

/**
 * TÍTULO DEL MENSAJE FINAL
 * Título mostrado en el resumen de la solicitud.
 */
export const TITULOMENSAJE =
  'Registro de solicitud de modificación programa IMMEX (Modificación Alta a domicilio de una planta, bodega o almacén)';

/**
 * TEXTO DE REQUISITOS
 * Mensaje informativo que acompaña el registro inicial de la solicitud.
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';
