/**
 * @const PASOS
 * @description Representa los pasos del proceso para solicitar un permiso extraordinario.
 * Cada paso contiene su índice dentro del proceso, el título que lo describe, y su estado actual.
 *
 * @property {number} indice - El número que indica el orden del paso.
 * @property {string} titulo - El nombre descriptivo del paso del proceso.
 * @property {boolean} activo - Indica si el paso está activo actualmente.
 * @property {boolean} completado - Indica si el paso ya fue completado.
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
 * @description Título principal mostrado durante el proceso de solicitud.
 * Representa el mensaje contextual para el trámite de permiso extraordinario
 * relacionado con la importación de armamento, municiones y materiales diversos
 * para personas físicas y morales.
 */
export const TITULOMENSAJE =
  'Registro de solicitud modificación programa IMMEX (Baja de empresa submanufacturera)';

/**
 * @const TEXTOS_REQUISITOS
 * @description Mensaje informativo que se muestra después de registrar la solicitud.
 * Indica que el número asignado es temporal y no tiene validez legal hasta que se firme la solicitud.
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * @const ID_PROCEDIMIENTO
 * @description Identificador numérico del procedimiento correspondiente al trámite de permiso extraordinario.
 * Este ID se utiliza para controlar la lógica del flujo en el sistema.
 */
export const ID_PROCEDIMIENTO = 240102;
