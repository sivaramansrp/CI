/**
 * Constante que define los pasos del proceso de exportación.
 * Cada paso incluye un índice, un título, y los estados de activo y completado.
 */
export const PASOS_EXPORTACION = [
    {
      /**
       * Índice del paso.
       */
      indice: 1,
  
      /**
       * Título del paso.
       */
      titulo: 'Capturar solicitud',
  
      /**
       * Indica si el paso está activo.
       */
      activo: true,
  
      /**
       * Indica si el paso está completado.
       */
      completado: true,
    },
    
    {
      indice: 2,
      titulo: 'Firmar solicitud',
      activo: false,
      completado: false,
    },
  ];