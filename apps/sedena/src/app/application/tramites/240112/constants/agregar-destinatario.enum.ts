
/**
 * @const PASOS
 * @description Arreglo que define los pasos de un proceso en una solicitud.
 * Cada paso incluye información sobre su índice, título, estado de actividad y si ha sido completado.
 * 
 * @property {number} indice - Índice del paso en el proceso.
 * @property {string} titulo - Título descriptivo del paso.
 * @property {boolean} activo - Indica si el paso está activo actualmente.
 * @property {boolean} completado - Indica si el paso ha sido completado.
 */
export const PASOS = [
    {
      indice: 1,
      titulo: 'Capturar solicitud', // Paso 1: Capturar la información de la solicitud
      activo: true, // Este paso está activo actualmente
      completado: true, // Ya se ha completado este paso
    },
    {
      indice: 2,
      titulo: 'Anexar requisitos', // Paso 2: Subir o anexar los documentos requeridos
      activo: false, // Este paso aún no está activo
      completado: false, // Este paso no ha sido completado
    },
    {
      indice: 3,
      titulo: 'Firmar solicitud', // Paso 3: Firmar electrónicamente la solicitud
      activo: false, // Este paso aún no está activo
      completado: false, // Este paso no ha sido completado
    },
  ];

  /**
   * @const TITULOMENSAJE
   * @description Solicitud de permiso extraordinario para la importación de material explosivo.
   * @type {string}
   * @module agregar-destinatario.enum
   */
  export const TITULOMENSAJE =
    'Solicitud Permiso extraordinario para la importación de material explosivo';
  

  /**
   * @const TEXTOS_REQUISITOS
   * @description Contiene el mensaje informativo que se muestra al usuario cuando una solicitud ha sido registrada con un número temporal.
   * Este número no tiene validez legal y sirve únicamente para identificar la solicitud hasta que se le asigne un folio oficial al momento de ser firmada.
   * 
   * @usage
   * Este texto es utilizado en la interfaz de usuario para notificar al solicitante sobre el estado temporal de su solicitud.
   * 
   * @example
   * ```typescript
   * console.log(TEXTOS_REQUISITOS);
   * // Output: "La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada."
   * ```
   */
  export const TEXTOS_REQUISITOS =
    'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

  /**
   * @const ID_PROCEDIMIENTO
   * @description Identificador único del procedimiento asociado al trámite 240112.
   * @type {number}
   */
  export const ID_PROCEDIMIENTO = 240112;
  