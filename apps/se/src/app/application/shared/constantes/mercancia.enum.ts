/**
 * @descripcion
 * Constante que define las propiedades de la fecha de pago en el formulario.
 */
export const FECHA = {
  /**
   * @descripcion
   * Etiqueta asociada al campo de fecha.
   */
  labelNombre: 'Fecha de factura',

  /**
   * @descripcion
   * Indica si el campo de fecha es obligatorio.
   */
  required: true,

  /**
   * @descripcion
   * Indica si el campo de fecha está habilitado.
   */
  habilitado: true,
};

/**
 * Configuración del campo "Fecha de factura / Referencia".
 * Contiene información sobre su etiqueta, obligatoriedad y estado de habilitación.
 */
export const FECHA_FACTURA_REFERENCIA = {
  /**
   * @descripcion
   * Etiqueta asociada al campo de fecha.
   */
  labelNombre: 'Fecha de factura / Referencia',

  /**
   * @descripcion
   * Indica si el campo de fecha es obligatorio.
   */
  required: true,

  /**
   * @descripcion
   * Indica si el campo de fecha está habilitado.
   */
  habilitado: true,
};

/**
 * IDs de procedimientos para los campos de fracción arancelaria.
 */
export const FRACCION_ARANCELARIA_IDS = [110205, 110212, 110222, 110207, 110208, 110214, 110217, 110223];

/**
 * IDs de procedimientos para la clasificación NALADI.
 */
export const CLASIFICACION_NALADI_IDS = [110204,110223];

/**
 * IDs de procedimientos para la clasificación NALADISA 1993.
 */
export const CLASIFICACION_NALADISA_1993_IDS = [110204,110223];

/**
 * IDs de procedimientos para la clasificación NALADISA 1996.
 */
export const CLASIFICACION_NALADISA_1996_IDS = [110204,110223];

/**
 * IDs de procedimientos para la clasificación NALADISA 2002.
 */
export const CLASIFICACION_NALADISA_2002_IDS = [110204,110223];

/**
 * IDs de procedimientos para el campo “Número de factura de referencia”.
 */
export const N_FACTURA_REFERENCIA_IDS = [110204, 110222];

/**
 * IDs de procedimientos para el campo “Número de factura”.
 */
export const N_FACTURA_IDS = [110205, 110212, 110207, 110208, 110217, 110223];

/**
 * IDs de procedimientos para el campo “Norma de origen”.
 */
export const NORMA_ORIGEN_IDS = [110204,110223];

/**
 * IDs de procedimientos para el campo “Nombre en inglés”.
 */
export const NOMBRE_EN_INGLES_IDS = [110205, 110212, 110207, 110208, 110214, 110217];

/**
 * IDs de procedimientos para el campo “Otras instancias”.
 */
export const OTRAS_INSTANCIAS_IDS = [110205, 110222, 110214, 110217];

/**
 * IDs de procedimientos para el campo “Criterio para conferir origen”.
 */
export const CRITERIO_PARA_CONFERIR_ORIGEN_IDS = [110205, 110212, 110207, 110208, 110217];

/**
 * IDs de procedimientos para el campo “Criterio para trato preferencial”.
 */
export const CRITERIO_PARA_TRATO_PREFERENCIAL_IDS = [110222, 110214];

/**
 * Identificadores asociados al valor de la mercancía.
 * @type {number[]}
 */
export const VALOR_MERCANCIA_IDS = [110204, 110205, 110212, 110222, 110207, 110208, 110214, 110217, 110223];

/**
 * Identificadores asociados al valor del contenido regional.
 * @type {number[]}
 */
export const VALOR_CONTENIDO_REGIONAL_IDS = [110222, 110214];

/**
 * Identificadores asociados a la fecha de la factura.
 * @type {number[]}
 */
export const FECHA_FACTURA_IDS = [110204, 110205, 110212, 110207, 110217, 110223];

/**
 * Identificadores asociados a la fecha de la factura de referencia.
 * @type {number[]}
 */
export const FECHA_FACTURA_REFERENCIA_IDS = [110222];

/**
 * Identificadores asociados al tipo de factura.
 * @type {number[]}
 */
export const TIPO_DE_FACTURA_IDS = [110204, 110205, 110212, 110207, 110208, 110217, 110223];

/**
 * Identificadores asociados al tipo de factura de referencia.
 * @type {number[]}
 */
export const TIPO_DE_FACTURA_REFERENCIA_IDS = [110222];

/**
 * Identificadores asociados al número de serie.
 * @type {number[]}
 */
export const NUMERO_DE_SERIE_IDS = [110222, 110214 ];

/**
 * Identificadores asociados a la marca.
 * @type {number[]}
 */
export const MARCA_IDS = [110207, 110208];

/* =====================================================
 *                 CAMPOS REQUERIDOS
 * ===================================================== */

/**
 * IDs de procedimientos en los que el campo “Fecha de factura” es obligatorio.
 */
export const REQUIRED_FECHA_FACTURA: number[] = [110204, 110205, 110212];

/**
 * IDs de procedimientos en los que el campo “Cantidad” es obligatorio.
 */
export const REQUIRED_CANTIDAD: number[] = [110204, 110205, 110212, 110222];

/**
 * IDs de procedimientos en los que el campo “UMC” (Unidad de Medida Comercial) es obligatorio.
 */
export const REQUIRED_UMC: number[] = [110204, 110205];

/**
 * IDs de procedimientos en los que el campo “Valor de mercancía” es obligatorio.
 */
export const REQUIRED_VALOR_MERCANCIA: number[] = [
  110204, 110205, 110212, 110222,
];

/**
 * IDs de procedimientos en los que el campo “Complemento de descripción” es obligatorio.
 */
export const REQUIRED_COMPLEMENTO_DESCRIPCION: number[] = [
  110204, 110205, 110212, 110222, 110223
];

/**
 * IDs de procedimientos en los que el campo “Número de factura” es obligatorio.
 */
export const REQUIRED_NUMERO_FACTURA: number[] = [110212];

/**
 * IDs de procedimientos en los que el campo “Tipo de factura” es obligatorio.
 */
export const REQUIRED_TIPO_FACTURA: number[] = [110204, 110205, 110222];
