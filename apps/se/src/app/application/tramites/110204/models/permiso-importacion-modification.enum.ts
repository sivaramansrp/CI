/**
 * @enum {string} InputTypes
 * @description Enumeración que define los diferentes tipos de entrada que se pueden utilizar en la aplicación.
 * 
 * @property {string} SELECT - Representa un campo de selección.
 * @property {string} TEXT - Representa un campo de texto.
 * @property {string} BREAK_CONTENT - Representa un contenido de interrupción.
 * @property {string} DATE - Representa un campo de fecha.
 * @property {string} RADIO - Representa un campo de opción múltiple (radio button).
 */
export enum InputTypes { 
  SELECT = 'select',
  TEXT = 'text',
  BREAK_CONTENT = 'break-content',
  DATE = 'date',
  RADIO = 'radio',
}

/**
 * @constant {Object} SECCIONES_TRAMITE - Representa las secciones y su estado de validación en el proceso de trámite.
 * @property {Object} PASO_1 - Contiene las validaciones de las secciones del paso 1.
 * @property {boolean} PASO_1.VALIDACION_SECCION_1 - Indica si la sección 1 del paso 1 está validada.
 * @property {boolean} PASO_1.VALIDACION_SECCION_2 - Indica si la sección 2 del paso 1 está validada.
 * @property {boolean} PASO_1.VALIDACION_SECCION_3 - Indica si la sección 3 del paso 1 está validada.
 * @property {Object} PASO_2 - Contiene las validaciones de las secciones del paso 2.
 * @property {boolean} PASO_2.VALIDACION_SECCION - Indica si la sección del paso 2 está validada.
 */
export const SECCIONES_TRAMITE = {
  PASO_1: {
    VALIDACION_SECCION_1: false,
    VALIDACION_SECCION_2: true,
    VALIDACION_SECCION_3: true,
  },
  PASO_2: {
    VALIDACION_SECCION: false,
  }
};