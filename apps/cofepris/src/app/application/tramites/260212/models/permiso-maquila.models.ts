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

  fraccionArancelaria: string;

  descripcionFraccion: string;

  cantidadUMT: string;

  UMT: string;

  cantidadUMC: string;

  UMC: string;
  
  tipoDeEnvase: string;

  tipoDePresentacion: string;

  numeroRegistroSanitario: string;
  paisDeOrigen: string;

  paisDeProcedencia: string;
  tipoProducto: string;

  usoEspecifico: string;
  fechaCaducidad: string;

  
}

/**
 * Modelo de datos para una clave.
 * Contiene una clave y su descripción.
 */
export interface ClaveModel {

  clave: string;

  descripcion: string;
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

/**
 * @interface EstadoFisico
 * @description
 * Representa el estado físico de un objeto o entidad dentro del sistema.
 *
 * @property {number} id - Identificador único del estado físico.
 * @property {string} descripcíon - Descripción detallada del estado físico.
 */
export interface EstadoFisico {
  id: number;
  descripcíon: string;
}
