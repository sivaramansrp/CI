/**
 * Array que define los pasos del proceso para el reporte anual.
 * Cada objeto en el array representa un paso con su índice, título, y estado actual.
 * Los pasos pueden estar activos o completados.
 */
export const REPORTE_ANUAL_PASOS = [
  {
    /**
     * Identificador numérico único del paso en el proceso.
     */
    indice: 1,

    /**
     * Título descriptivo que representa la acción o etapa del paso.
     */
    titulo: 'Capturar solicitud',

    /**
     * Indica si el paso está activo actualmente (true) o no (false).
     */
    activo: true,

    /**
     * Indica si el paso ha sido completado (true) o está pendiente (false).
     */
    completado: false,
  },
  {
    /**
     * Identificador numérico único del paso en el proceso.
     */
    indice: 2,

    /**
     * Título descriptivo que representa la acción o etapa del paso.
     */
    titulo: 'Firmar solicitud',

    /**
     * Indica si el paso está activo actualmente (true) o no (false).
     */
    activo: false,

    /**
     * Indica si el paso ha sido completado (true) o está pendiente (false).
     */
    completado: false,
  },
];
