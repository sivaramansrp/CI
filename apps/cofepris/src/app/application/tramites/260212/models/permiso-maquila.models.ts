/**
 * Modelo de datos para una solicitud.
 * Contiene información básica sobre la solicitud.
 */
export interface solicitudModel {
  /**
   * Fecha de creación de la solicitud.
   */
  fechaCreación: string;
  /**
   * Mercancía involucrada en la solicitud.
   */
  mercancía: string;
  /**
   * Cantidad de la mercancía.
   */
  cantidad: string;
  /**
   * Proveedor de la mercancía.
   */
  proveedor: string;
}

/**
 * Modelo de datos para una mercancía.
 * Detalla las características específicas de la mercancía.
 */
export interface MercanciaModel {
  /**
   * Clasificación del producto según su naturaleza.
   */
  clasificaciónProducto: string;
  /**
   * Especificación adicional sobre la clasificación del producto.
   */
  especificarClasificación: string;
  /**
   * Denominación específica de la mercancía.
   */
  denominaciónEspecífica: string;
  /**
   * Denominación distintiva de la mercancía.
   */
  denominaciónDistintiva: string;
  /**
   * Denominación común o genérica de la mercancía.
   */
  denominaciónComún: string;
  /**
   * Forma farmacéutica de la mercancía (si aplica).
   */
  formaFarmacéutica: string;
  /**
   * Estado físico de la mercancía (sólido, líquido, etc.).
   */
  estadoFsico: string;
}

/**
 * Modelo de datos para una clave.
 * Contiene una clave y su descripción.
 */
export interface ClaveModel {
  /**
   * Valor de la clave.
   */
  clave: string;
  /**
   * Descripción de la clave.
   */
  descripcíon: string;
}

/**
 * Modelo para opciones de un select.
 * Cada opción tiene un label y un valor.
 */
export interface LosOption {
  /**
   * Etiqueta visible para la opción.
   */
  label: string;
  /**
   * Valor asociado a la opción.
   */
  value: string;
}

/**
 * Modelo de datos para una fila de una tabla.
 * Representa los datos que se mostrarán en la tabla.
 */
export interface tableData {
  /**
   * Datos de la fila representados por un arreglo de cadenas.
   * 
   * @property {string[]} tbodyData - Datos de la fila que se mostrarán en la tabla.
   */
  tbodyData: string[];
}

/**
 * Modelo que extiende a tableData, incluyendo información sobre la selección de la fila.
 * Indica si la fila está seleccionada o no.
 */
export interface selectedRowData extends tableData {
  /**
   * Indica si la fila está seleccionada o no.
   * 
   * @property {boolean} checked - Estado de selección de la fila.
   */
  checked: boolean;
}
