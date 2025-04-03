/**
 * Mensaje de alerta relacionado con la mercancía.
 */
export const MENSAJE_DE_ALERTA_MERCANCIA: string =
  'De no existir marca anotar "sin marca". En su caso el sistema de marca con las especificaciones correspondientes';

/**
 * Clave de referencia utilizada en el trámite.
 */
export const CLAVE_DE_REFERENCIA: number = 84000966;

/**
 * Cadena de la dependencia asociada al trámite.
 */
export const CADENA_PAGO_DEPENDENCIA: number = 130090940161;

/**
 * Importe de pago requerido para el trámite.
 */
export const IMP_PAGO: number = 672;

/**
 * Etiquetas para los movimientos disponibles y seleccionados en la interfaz.
 */
export const MOVIMIENTO_CROSSLIST_LABEL = {
  /**
   * Título para los movimientos disponibles.
   */
  tituluDeLaIzquierda: 'Movimientos disponibles',

  /**
   * Título para los movimientos seleccionados.
   */
  derecha: 'Movimientos seleccionadas',
};

/**
 * Etiquetas para las aduanas disponibles y seleccionadas en la interfaz.
 */
export const AQUANDAS_CROSSLIST_LABEL = {
  /**
   * Título para las aduanas disponibles.
   */
  tituluDeLaIzquierda: 'Aduanas disponibles',

  /**
   * Título para las aduanas seleccionadas.
   */
  derecha: 'Aduanas seleccionadas',
};

/**
 * Configuración para el campo de fecha.
 */
export const FECHA = {
  /**
   * Etiqueta para el nombre del campo de fecha.
   */
  labelNombre: 'Fecha de pago',

  /**
   * Indica si el campo de fecha es obligatorio.
   */
  required: true,

  /**
   * Indica si el campo de fecha está habilitado.
   */
  habilitado: true,
};