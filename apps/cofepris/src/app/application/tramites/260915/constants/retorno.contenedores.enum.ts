/**
 * Constante que define los pasos del proceso de trámite.
 * Cada paso contiene las siguientes propiedades:
 * - `indice`: Número que identifica el orden del paso.
 * - `titulo`: Descripción del paso.
 * - `activo`: Indica si el paso está activo actualmente.
 * - `completado`: Indica si el paso ha sido completado.
 */
export const PASOS1 = [
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
      titulo: 'Anexar requisitos',
      activo: false,
      completado: false,
    },
    {
        indice: 4,
        titulo: 'Firmar solicitud',
        activo: false,
        completado: false,
    },
];