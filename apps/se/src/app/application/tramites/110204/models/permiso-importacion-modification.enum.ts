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