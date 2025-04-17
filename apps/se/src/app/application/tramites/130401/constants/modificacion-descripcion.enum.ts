/**
 * Constante que define los pasos del proceso del trámite 130401.
 * 
 * Cada paso incluye:
 * - `indice`: Número del paso en el proceso.
 * - `titulo`: Título descriptivo del paso.
 * - `activo`: Indica si el paso está activo.
 * - `completado`: Indica si el paso ha sido completado.
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
 * Constante que contiene textos utilizados en el trámite 130401.
 * 
 * Incluye mensajes de alerta y textos informativos.
 */
export const TEXTOS = {
  /**
   * Mensaje de alerta para terceros.
   */
  TERCEROS_TEXTO_DE_ALERTA: 'La solicitud ha quedado registrada con el número temporal 202768161 Éste no tiene validez legal y sirve solamente para efectos de identificar tu solicitud. Un folio oficial le será asignado a la solicitud al momento en que ésta sea firmada.',
};

/**
 * Mensaje de alerta para continuar con el trámite.
 * 
 * Este mensaje se muestra cuando no se han agregado mercancías al trámite.
 */
export const TERCEROS_TEXTO_DE_ALERTA = 'Para continuar con el trámite, debes agregar por lo menos una mercancía.';
/**
 * Opciones de radio para el tipo de solicitud.
 * 
 * Cada opción incluye:
 * - `label`: Etiqueta descriptiva de la opción.
 * - `value`: Valor asociado a la opción.
 */
export const SOLICITUD_OPCION_RADIO = [
  {
    label: 'Modificación',
    value: '1',
  },
];

/**
 * Opciones de radio para el tipo de producto.
 * 
 * Cada opción incluye:
 * - `label`: Etiqueta descriptiva de la opción.
 * - `value`: Valor asociado a la opción.
 */
export const PRODUCTO_OPCION_RADIO = [
  {
    label: 'Nuevo',
    value: '0',
  },
  {
    label: 'Usado',
    value: '1',
  },
];