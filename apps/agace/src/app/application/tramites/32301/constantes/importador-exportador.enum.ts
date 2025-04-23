/**
 * Objeto de selección que contiene constantes para distintas acciones de selección.
 */
export const SELECCION = {
  /**
   * Representa una acción para seleccionar todos los elementos disponibles.
   */
  SELECT_ALL: 'selectAll',
};

  

/**
 * Mensaje de aviso para la adjunción del listado de fracciones arancelarias
 * dentro de la descripción de actividades relacionadas con procesos productivos
 * o presentación de servicios, tal como se indica en la solicitud de inscripción.
 */
export const MESSAGE_FRACCION = 'Deberás adjuntar el listado de fracciones arancelarias señaladas en la descripción de las actividades relacionadas con los procesos productivos o presentación de servicios, exhibido en tu solicitud de inscripción.';

/**
 * Encabezados de la tabla que muestra la información de las fracciones declaradas.
 * Incluye detalles sobre la actividad relacionada, correlación, descripción, NICO, 
 * unidad de medida y país de origen.
 */
export const GRID_FRACCIONES_HEADER = [
    'Fracción declarada',
    'Actividad relacionada',
    'Correlación fracción actual',
    'Descripción fracción actual',
    'NICO',
    'Descripción del NICO',
    'UMT',
    'País de origen'
];

/**
 * Lista de pasos para el proceso, con información sobre su estado actual.
 * Cada paso tiene un índice, un título, y valores que indican si está activo o completado.
 */
export const PASOS = [
  {
      /**
       * Índice del primer paso dentro del proceso.
       */
      indice: 1,

      /**
       * Título del primer paso: Capturar solicitud.
       */
      titulo: 'Capturar solicitud',

      /**
       * Indica que el primer paso está activo.
       */
      activo: true,

      /**
       * Indica que el primer paso ya ha sido completado.
       */
      completado: true,
  },
  {
      /**
       * Índice del segundo paso dentro del proceso.
       */
      indice: 2,

      /**
       * Título del segundo paso: Anexar requisitos.
       */
      titulo: 'Anexar requisitos',

      /**
       * Indica que el segundo paso aún no está activo.
       */
      activo: false,

      /**
       * Indica que el segundo paso aún no ha sido completado.
       */
      completado: false,
  },
  {
      /**
       * Índice del tercer paso dentro del proceso.
       */
      indice: 3,

      /**
       * Título del tercer paso: Firmar solicitud.
       */
      titulo: 'Firmar solicitud',

      /**
       * Indica que el tercer paso aún no está activo.
       */
      activo: false,

      /**
       * Indica que el tercer paso aún no ha sido completado.
       */
      completado: false,
  },
];
