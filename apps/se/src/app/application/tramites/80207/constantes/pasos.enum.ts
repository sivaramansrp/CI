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