/**
 * Representa una lista de pasos en un proceso.
 * Cada paso contiene la información sobre el índice, el título y el estado de completitud.
 * @example
 * const pasos = [
 *   { indice: 1, titulo: 'Capturar solicitud', activo: true, completado: true },
 *   { indice: 2, titulo: 'Firmar solicitud', activo: false, completado: false }
 * ];
 */
export const PASOS = [
  {
    indice: 1, // Índice del paso en el proceso
    titulo: 'Capturar solicitud', // Título del paso
    activo: true, // Indica si el paso está activo
    completado: true, // Indica si el paso ha sido completado
  },
  {
    indice: 2, // Índice del paso en el proceso
    titulo: 'Firmar solicitud', // Título del paso
    activo: false, // Indica si el paso está activo
    completado: false, // Indica si el paso ha sido completado
  }
];
