/**
 * @fileoverview
 * Este archivo contiene constantes relacionadas con el trámite 260213, incluyendo la configuración de los pasos,
 * el título del mensaje, los textos de requisitos, y el identificador único del procedimiento.
 *
 * @module MedicosUsoEnum
 * @description
 * Define las constantes utilizadas para gestionar los pasos del flujo del trámite 260213, así como mensajes y configuraciones adicionales.
 */

/**
 * Configuración de los pasos del trámite.
 *
 * Cada paso está representado por un objeto que contiene las siguientes propiedades:
 * - `indice`: Número del paso.
 * - `titulo`: Título descriptivo del paso.
 * - `activo`: Indica si el paso está activo.
 * - `completado`: Indica si el paso ha sido completado.
 *
 * @constant {Array<Object>}
 */
export const PASOS = [
  {
    /**
     * @property {number} indice
     * Índice del paso en el flujo.
     */
    indice: 1,

    /**
     * @property {string} titulo
     * Título descriptivo del paso.
     */
    titulo: 'Capturar solicitud',

    /**
     * @property {boolean} activo
     * Indica si el paso está activo.
     */
    activo: true,

    /**
     * @property {boolean} completado
     * Indica si el paso ha sido completado.
     */
    completado: true,
  },
  {
    /**
     * @property {number} indice
     * Índice del paso en el flujo.
     */
    indice: 2,

    /**
     * @property {string} titulo
     * Título descriptivo del paso.
     */
    titulo: 'Anexar necesarios',

    /**
     * @property {boolean} activo
     * Indica si el paso está activo.
     */
    activo: false,

    /**
     * @property {boolean} completado
     * Indica si el paso ha sido completado.
     */
    completado: false,
  },
  {
    /**
     * @property {number} indice
     * Índice del paso en el flujo.
     */
    indice: 3,

    /**
     * @property {string} titulo
     * Título descriptivo del paso.
     */
    titulo: 'Firmar solicitud',

    /**
     * @property {boolean} activo
     * Indica si el paso está activo.
     */
    activo: false,

    /**
     * @property {boolean} completado
     * Indica si el paso ha sido completado.
     */
    completado: false,
  },
];

/**
 * Título del mensaje relacionado con el trámite 260213.
 *
 * @constant {string}
 * @description
 * Este mensaje se muestra en la parte superior de la interfaz del trámite 260213.
 *
 * @example
 * ```typescript
 * const TITULOMENSAJE = 'Permiso sanitario de importación de dispositivos médicos para uso personal';
 * ```
 */
export const TITULOMENSAJE =
  'Permiso sanitario de importación de dispositivos médicos para uso personal';

/**
 * Texto de requisitos para el trámite 260213.
 *
 * @constant {string}
 * @description
 * Este texto informa al usuario que la solicitud ha sido registrada con un número temporal y que no tiene validez legal
 * hasta que se firme la solicitud.
 *
 * @example
 * ```typescript
 * const TEXTOS_REQUISITOS = 'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';
 * ```
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * Identificador único del procedimiento 260213.
 *
 * @constant {number}
 * @description
 * Este identificador se utiliza para asociar el trámite 260213 con su configuración y datos específicos.
 *
 * @example
 * ```typescript
 * const ID_PROCEDIMIENTO = 260213;
 * ```
 */
export const ID_PROCEDIMIENTO = 260213;

/**
 * @const ELEMENTOS_REQUERIDOS
 * @description Lista de elementos requeridos para el trámite.
 */
export const ELEMENTOS_REQUERIDOS= [
  'fabricante'
];