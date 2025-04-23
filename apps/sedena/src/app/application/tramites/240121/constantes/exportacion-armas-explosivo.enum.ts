/**
 * @const PASOS
 * @description Arreglo que define los pasos de un proceso en una solicitud.
 * Cada paso contiene información sobre su índice, título, estado de actividad y si ha sido completado.
 * 
 * @property {number} indice - El número de orden del paso dentro del proceso.
 * @property {string} titulo - El título descriptivo del paso.
 * @property {boolean} activo - Indica si el paso está activo actualmente.
 * @property {boolean} completado - Indica si el paso ha sido completado.
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
      titulo: 'Anexar requisitos',
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
  
/**
 * @const TITULOMENSAJE
 * @description Título del mensaje que describe el propósito de la solicitud.
 */
export const TITULOMENSAJE =
    'Solicitud Permiso ordinario para la importación de armamento, municiones y diverso material para personas físicas y morales';

/**
 * @const TEXTOS_REQUISITOS
 * @description Mensaje que informa al usuario sobre el registro temporal de la solicitud.
 * Contiene un número temporal que no tiene validez legal y sirve para identificar la solicitud.
 */
export const TEXTOS_REQUISITOS =
    'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * @const ID_PROCEDIMIENTO
 * @description Identificador único del procedimiento asociado a la solicitud.
 */
export const ID_PROCEDIMIENTO = 240121;
  