/**
 * @interface
 * @name AccionBoton
 * @description
 * Representa una acción asociada a un botón en la interfaz de usuario.
 */
export interface AccionBoton {
  /**
   * Nombre de la acción asociada al botón.
   * @type {string}
   */
  accion: string;

  /**
   * Valor numérico asociado a la acción del botón.
   * @type {number}
   */
  valor: number;
}

/**
 * @constant
 * @name FECHA_DE_PAGO
 * @description
 * Configuración predeterminada para el campo de fecha de pago.
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
 */
export interface PreOperativo {
  /**
   * Etiqueta que describe la opción preoperativa.
   * @type {string}
   */
  label: string;

  /**
   * Valor asociado a la opción preoperativa.
   * @type {string}
   */
  value: string;
}

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