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
 * Título del mensaje para el permiso sanitario de importación de dispositivos médicos usados sin registro.
 * @type {string}
 * @constant
 */
export const TITULO_MENSAJE = 
  'Permiso sanitario de importación de remedios herbolarios';

/**
 * Texto que describe los requisitos y proporciona información sobre el número temporal de solicitud.
 * @type {string}
 * @constant
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * Identificador numérico único del procedimiento.
 * @type {number}
 * @constant
 */
export const ID_PROCEDIMIENTO = 260219;

/**
 * @const ELEMENTOS_REQUERIDOS
 * @description Lista de elementos requeridos para completar el formulario o proceso.
 */
export const ELEMENTOS_REQUERIDOS = [
  'denominacionRazon',
  'scian',
  'correoElectronico',
  'rfcSanitario',
  'fabricante',
  'destinoFinal'
];
