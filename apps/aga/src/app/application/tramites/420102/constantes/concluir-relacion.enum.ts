import { DatosDelContenedorTabla } from "../models/tramite420102.enum";

/**
 * @const PASOS
 * @description Arreglo que define los pasos de un proceso en la aplicación.
 * Cada paso incluye un índice, un título, y estados de actividad y completitud.
 * 
 * @property {number} indice - Número que identifica el orden del paso.
 * @property {string} titulo - Título descriptivo del paso.
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
    titulo: 'Firmar solicitud',
    activo: false,
    completado: false,
  },
];

/**
 * @const TITULOMENSAJE
 * @description Título del mensaje que describe el propósito de la solicitud.
 * Este mensaje se muestra en la interfaz de usuario para informar al usuario
 * sobre el tipo de solicitud que está realizando.
 */
export const TITULOMENSAJE =
  'Solicitud Permiso ordinario para la exportación de sustancias químicas';

/**
 * @const TEXTOS_REQUISITOS
 * @description Texto informativo que se muestra al usuario después de registrar
 * una solicitud. Incluye un número temporal que no tiene validez legal y explica
 * que un folio oficial será asignado al momento de firmar la solicitud.
 */
export const TEXTOS_REQUISITOS =
  'La solicitud ha quedado registrada con el número temporal [202767640]. Este no tiene validez legal y sirve solamente para efectos de identificar tu Solicitud. Un folio oficial le será asignado a la solicitud al momento en que esta sea firmada.';

/**
 * @const ID_PROCEDIMIENTO
 * @description Identificador único del procedimiento asociado a esta solicitud.
 * Este ID se utiliza para identificar el trámite en el sistema.
 */
export const ID_PROCEDIMIENTO = 240117;

export const DOMICILIO_TABLA_COLUMNAS = [
  {
      encabezado: 'Registro Federal de Contribuyentes',
      clave: (ele: DatosDelContenedorTabla) => ele.rfc,
      orden: 1
  },
  {
      encabezado: 'Denominación o razón social',
      clave: (ele: DatosDelContenedorTabla) => ele.denominacionORazonSocial,
      orden: 2
  },
  {
      encabezado: 'Norma',
      clave: (ele: DatosDelContenedorTabla) => ele.norma,
      orden: 3
  },
  {
      encabezado: 'Fecha inicio relación',
      clave: (ele: DatosDelContenedorTabla) => ele.fechainciorelacion,
      orden: 4
  },
];

export const URL = '../../../../../assets/json/420102/';

export const FECHA_INGRESO = {
  labelNombre: 'Fecha de ingreso',
  required: true,
  habilitado: true,
};