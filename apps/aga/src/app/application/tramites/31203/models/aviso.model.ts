/**
 * @interface
 * @name AccionBoton
 * @description
 * Representa una acción asociada a un botón en la interfaz de usuario.
 *
 * @property {string} accion - Nombre de la acción asociada al botón.
 * @property {number} valor - Valor numérico asociado a la acción del botón.
 */
export interface AccionBoton {
  /**
   * @property {string} accion
   * @description Nombre de la acción asociada al botón.
   */
  accion: string;

  /**
   * @property {number} valor
   * @description Valor numérico asociado a la acción del botón.
   */
  valor: number;
}

/**
 * @constant
 * @name FECHA_DE_PAGO
 * @description
 * Configuración predeterminada para el campo de fecha de pago.
 *
 * @property {string} labelNombre - Etiqueta que describe el campo de fecha de pago.
 * @property {boolean} required - Indica si el campo de fecha de pago es obligatorio.
 * @property {boolean} habilitado - Indica si el campo de fecha de pago está habilitado.
 */
export const FECHA_DE_PAGO = {
  /**
   * Nombre de la etiqueta que describe el campo de fecha de pago.
   * @type {string}
   */
  labelNombre: 'Fecha de pago',

  /**
   * Indica si el campo de fecha de pago es obligatorio.
   * @type {boolean}
   */
  required: false,

  /**
   * Indica si el campo de fecha de pago está habilitado.
   * @type {boolean}
   */
  habilitado: true,
};
/**
 * @interface
 * @name PreOperativo
 * @description
 * Representa una opción preoperativa con una etiqueta y un valor asociado.
 *
 * @property {string} label - Etiqueta que describe la opción preoperativa.
 * @property {string} value - Valor asociado a la opción preoperativa.
 */
export interface PreOperativo {
  /**
   * @property {string} label
   * @description Etiqueta que describe la opción preoperativa.
   */
  label: string;

  /**
   * @property {string} value
   * @description Valor asociado a la opción preoperativa.
   */
  value: string;
}

/**
 * @interface
 * @name AvisoValor
 * @description
 * Representa los valores asociados a un aviso, incluyendo clave de referencia, cadena de dependencia e importe de pago.
 *
 * @property {string} claveReferencia - claveReferencia del valor en español.
 * @property {string} cadenaDependencia - cadenaDependencia asociada al valor.
 * @property {string} importePago - Importe de pago asociado al valor.
 */
/**
 * @interface
 * @name AvisoValor
 * @description
 * Representa los valores asociados a un aviso, incluyendo clave de referencia, cadena de dependencia e importe de pago.
 */
export interface AvisoValor {
  /**
   * Clave de referencia del aviso.
   * @type {string}
   * @description claveReferencia del valor en español.
   */
  claveReferencia: string;

  /**
   * Cadena de dependencia asociada al aviso.
   * @type {string}
   * @description cadenaDependencia asociada al valor.
   */
  cadenaDependencia: string;

  /**
   * Importe de pago asociado al aviso.
   * @type {string}
   * @description Importe de pago asociado al valor.
   */
  importePago: string;
}