/**
 * @description
 * Constante que representa la configuración para el campo "Fecha de pago".
 * 
 * @property {string} labelNombre - Etiqueta que se muestra para el campo.
 * @property {boolean} required - Indica si el campo es obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado o no.
 *
 */
export const FECHA_DE_PAGO = {
  labelNombre: 'Fecha de pago',
  required: true,
  habilitado: false,
};

/**
 * @description Fecha límite para el pago de derechos.
 * @type {string}
 * @example
 * FECHAPAGODATE // '15/03/2025'
 *
 * @compodoc
 * @es Fecha límite establecida para realizar el pago de derechos en el sistema.
 */
export const FECHAPAGODATE ='15/03/2025'