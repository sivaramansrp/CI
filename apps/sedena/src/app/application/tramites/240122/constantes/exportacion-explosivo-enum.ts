/**
 * @const PASOS
 * @description Arreglo que define los pasos de un proceso en la aplicación.
 * Cada paso incluye un índice, un título, y estados de actividad y completitud.
 * 
 * @property {number} indice - Número que identifica el orden del paso.
 * @property {string} titulo - Título descriptivo del paso.
 * @property {boolean} activo - Indica si el paso está activo actualmente.
 * @property {boolean} completado - Indica si el paso ha sido completado.
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
      titulo: 'Anexar requisitos',
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
 * @const TITULOMENSAJE
 * @description Título del mensaje que describe el propósito de la solicitud.
 * @value {string} 'Solicitud Permiso ordinario para la exportación de para la exportación de material explosivo'
 */
export const TITULOMENSAJE =
  'Solicitud Permiso extraordinario para la exportación de material explosivo';

/**
 * @const TEXTOS_REQUISITOS
 * @description Texto que informa al usuario sobre el estado de su solicitud registrada.
 * @value {string} Mensaje que incluye un número temporal de solicitud y detalles adicionales.
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * @const ID_PROCEDIMIENTO
 * @description Identificador único del procedimiento asociado al trámite.
 * @value {number} 240122
 */
export const ID_PROCEDIMIENTO = 240122;