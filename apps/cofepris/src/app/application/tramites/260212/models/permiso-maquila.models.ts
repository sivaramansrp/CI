/**
 * Modelo de datos para una solicitud.
 * Contiene información básica sobre la solicitud.
 */
export interface SolicitudModel {
  fechaCreacion: string;
  mercancía: string;
  cantidad: string;
  proveedor: string;
}

/**
 * Modelo de datos para una mercancía.
 * Detalla las características específicas de la mercancía.
 */
export interface MercanciaModel {

  clasificacionProducto: string;

  especificarClasificacion: string;
  
  denominacionEspecifica: string;

  denominacionDistintiva: string;

  denominacionComun: string;

  formaFarmaceutica: string;

  estadoFsico: string;
}

/**
 * Modelo de datos para una clave.
 * Contiene una clave y su descripción.
 */
export interface ClaveModel {

  clave: string;

  descripcíon: string;
}

/**
 * Modelo para opciones de un select.
 * Cada opción tiene un label y un valor.
 */
export interface OpcionesPublicacion{

  label: string;
  value: string;
}

/**
 * Modelo de datos para una fila de una tabla.
 * Representa los datos que se mostrarán en la tabla.
 */
export interface TablaDatos {

  tbodyData: string[];
}

/**
 * Modelo que extiende a tableData, incluyendo información sobre la selección de la fila.
 * Indica si la fila está seleccionada o no.
 */
export interface DatosSeleccionados extends TablaDatos {

  checked: boolean;
}
