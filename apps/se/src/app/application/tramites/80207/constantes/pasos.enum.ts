/**
 * @fileoverview Constantes para los pasos del proceso.
 * Este archivo define los pasos del proceso, incluyendo el índice, el título, y el estado de cada paso.
 * @module pasosEnum --80207
 */

/**
 * Constantes para los pasos del proceso.
 * @constant {Array<Object>} PASOS
 * @property {number} indice - Índice del paso.
 * @property {string} titulo - Título del paso.
 * @property {boolean} activo - Indica si el paso está activo.
 * @property {boolean} completado - Indica si el paso está completado.
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
    }
  ];