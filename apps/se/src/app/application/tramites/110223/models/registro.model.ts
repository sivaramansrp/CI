/**
 * Interfaz que define la estructura de las columnas de la tabla.
 * 
 * @interface ColumnasTabla
 * @property {string} fraccionArancelaria - Fracción arancelaria del producto.
 * @property {string} nombreTecnico - Nombre técnico del producto.
 * @property {string} nombreComercial - Nombre comercial del producto.
 * @property {string} numeroRegistroProductos - Número de registro del producto.
 * @property {string} fechaExpedicion - Fecha de expedición del producto.
 * @property {string} fechaVencimiento - Fecha de vencimiento del producto.
 */
export interface ColumnasTabla {
  fraccionArancelaria: string;
  nombreTecnico: string;
  nombreComercial: string;
  numeroRegistroProductos: string;
  fechaExpedicion: string;
  fechaVencimiento: string;
}

/**
 * Interfaz que define la estructura de las filas seleccionadas de la tabla.
 * 
 * @interface SeleccionadasTabla
 * @property {string} fraccionArancelaria - Fracción arancelaria del producto seleccionado.
 * @property {string} cantidad - Cantidad de productos seleccionados.
 * @property {string} unidadMedida - Unidad de medida del producto.
 * @property {string} valorMercancia - Valor de la mercancía.
 * @property {string} tipoFactura - Tipo de factura.
 * @property {string} numFactura - Número de la factura.
 * @property {string} complementoDescripcion - Descripción complementaria de la factura.
 * @property {string} fechaFactura - Fecha de la factura.
 */
export interface SeleccionadasTabla {
  fraccionArancelaria: string;
  cantidad: string;
  unidadMedida: string;
  valorMercancia: string;
  tipoFactura: string;
  numFactura: string;
  complementoDescripcion: string;
  fechaFactura: string;
}

/**
 * Configuración de la fecha inicial para los filtros.
 * 
 * @constant FECHA_INICIAL
 * @type {Object}
 * @property {string} labelNombre - Nombre de la etiqueta para la fecha de inicio.
 * @property {boolean} required - Indica si es un campo obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado.
 */
export const FECHA_INICIAL = {
  labelNombre: 'Fecha inicio',
  required: false,
  habilitado: true,
};

/**
 * Configuración de la fecha final para los filtros.
 * 
 * @constant FECHA_FINAL
 * @type {Object}
 * @property {string} labelNombre - Nombre de la etiqueta para la fecha de fin.
 * @property {boolean} required - Indica si es un campo obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado.
 */
export const FECHA_FINAL = {
  labelNombre: 'Fecha fin',
  required: false,
  habilitado: true,
};

/**
 * Configuración de la fecha de la factura o referencia.
 * 
 * @constant FECHA_FACTURA
 * @type {Object}
 * @property {string} labelNombre - Nombre de la etiqueta para la fecha de factura.
 * @property {boolean} required - Indica si es un campo obligatorio.
 * @property {boolean} habilitado - Indica si el campo está habilitado.
 */
export const FECHA_FACTURA = {
  labelNombre: 'Fecha de factura / Referencia',
  required: true,
  habilitado: true,
};

/**
 * Configuración del campo para el despacho LDA.
 * 
 * @constant DESPACHO_LDA
 * @type {Object}
 * @property {string} labelNombre - Etiqueta que indica si es un despacho LDA.
 * @property {number} maxlength - Longitud máxima permitida.
 * @property {number} minlenght - Longitud mínima permitida.
 * @property {boolean} required - Indica si es un campo obligatorio.
 * @property {boolean} alfanumerico - Indica si solo acepta caracteres alfanuméricos.
 */
export const DESPACHO_LDA = {
  labelNombre: 'Sí',
  maxlength: 10,
  minlenght: 0,
  required: false,
  alfanumerico: true,
};
