/**
 * Constantes para los pasos del proceso.
 * @export
 * @constant {Array<Object>} PASOS
 * @property {number} indice - Índice del paso.
 * @property {string} titulo - Título del paso.
 * @property {boolean} activo - Indica si el paso está activo.
 * @property {boolean} completado - Indica si el paso está completado.
 */
export const PASOS = [
  {
    /**
     * Índice del paso.
     * @property {number} indice
     */
    indice: 1,

    /**
     * Título del paso.
     * @property {string} titulo
     */
    titulo: 'Capturar solicitud',

    /**
     * Indica si el paso está activo.
     * @property {boolean} activo
     */
    activo: true,

    /**
     * Indica si el paso está completado.
     * @property {boolean} completado
     */
    completado: true,
  },
  {
    /**
     * Índice del paso.
     * @property {number} indice
     */
    indice: 2,

    /**
     * Título del paso.
     * @property {string} titulo
     */
    titulo: 'Requisitos necesarios',

    /**
     * Indica si el paso está activo.
     * @property {boolean} activo
     */
    activo: false,

    /**
     * Indica si el paso está completado.
     * @property {boolean} completado
     */
    completado: false,
  },
  {
    /**
     * Índice del paso.
     * @property {number} indice
     */
    indice: 3,

    /**
     * Título del paso.
     * @property {string} titulo
     */
    titulo: 'Firmar solicitud',

    /**
     * Indica si el paso está activo.
     * @property {boolean} activo
     */
    activo: false,

    /**
     * Indica si el paso está completado.
     * @property {boolean} completado
     */
    completado: false,
  },
];
  
/**
 * @const TITULOMENSAJE
 * @description Título del mensaje que describe el propósito de la solicitud.
 */
export const TITULOMENSAJE =
    'Solicitud Permiso ordinario para la importación de armamento, municiones y diverso material para personas físicas y morales';

/**
 * @const TEXTOS_REQUISITOS
 * @description Mensaje que informa al usuario sobre el registro temporal de la solicitud.
 * Contiene un número temporal que no tiene validez legal y sirve para identificar la solicitud.
 */
export const TEXTOS_REQUISITOS =
    'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * @const ID_PROCEDIMIENTO
 * @description Identificador único del procedimiento asociado a la solicitud.
 */
export const ID_PROCEDIMIENTO = 240121;
  