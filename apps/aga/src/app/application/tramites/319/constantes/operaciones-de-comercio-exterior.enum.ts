/**
 * @const PASOS
 * @description Arreglo que define los pasos de un proceso en una solicitud de operaciones de comercio exterior.
 * Cada paso incluye un índice, un título descriptivo, y los estados de actividad y completitud.
 * @property {number} indice - Número que identifica el orden del paso.
 * @property {string} titulo - Descripción del paso.
 * @property {boolean} activo - Indica si el paso está activo para ser realizado.
 * @property {boolean} completado - Indica si el paso ya ha sido completado.
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
      titulo: 'Firmar solicitud',
      activo: false,
      completado: false,
    },
  ];
  /**
   * @const URL
   * @description Ruta relativa a los archivos JSON utilizados para las operaciones de comercio exterior.
   * @type {string}
   * @compodoc
   * Esta constante define la ubicación de los recursos JSON específicos para el trámite 319.
   */
  export const URL = '../../../../../assets/json/319/';