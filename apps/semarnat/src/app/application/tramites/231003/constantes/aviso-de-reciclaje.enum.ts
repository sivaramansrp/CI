/**
 * Lista de pasos del proceso de solicitud.
 * Cada paso contiene su índice, título, y el estado actual (activo y completado).
 */
export const PASOS = [
  {
    indice: 1,
    titulo: 'Capturar solicitud',
    activo: true, /** Indica si el paso está activo actualmente */
    completado: true, /** Indica si el paso ya fue completado */
  },
  {
    indice: 3,
    titulo: 'Firmar solicitud',
    activo: false, /** Indica que el paso aún no está activo */
    completado: false,/** Indica que el paso no ha sido completado */
  },
];
