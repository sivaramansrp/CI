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
/**
 * Modelo que representa la información de una mercancía para el trámite de permiso de maquila.
 *
 * @property {string} clasificacionProducto - Clasificación del producto.
 * @property {string} especificarClasificacion - Especificación de la clasificación del producto.
 * @property {string} denominacionEspecifica - Denominación específica del producto.
 * @property {string} denominacionDistintiva - Denominación distintiva del producto.
 * @property {string} denominacionComun - Denominación común del producto.
 * @property {string} formaFarmaceutica - Forma farmacéutica del producto.
 * @property {string} estadoFsico - Estado físico del producto.
 * @property {string} fraccionArancelaria - Fracción arancelaria correspondiente.
 * @property {string} descripcionFraccion - Descripción de la fracción arancelaria.
 * @property {string} cantidadUMT - Cantidad en la Unidad de Medida de Transporte (UMT).
 * @property {string} UMT - Unidad de Medida de Transporte.
 * @property {string} cantidadUMC - Cantidad en la Unidad de Medida de Comercialización (UMC).
 * @property {string} UMC - Unidad de Medida de Comercialización.
 * @property {string} tipoDeEnvase - Tipo de envase utilizado.
 * @property {string} tipoDePresentacion - Tipo de presentación del producto.
 * @property {string} numeroRegistroSanitario - Número de registro sanitario.
 * @property {string} paisDeOrigen - País de origen del producto.
 * @property {string} paisDeProcedencia - País de procedencia del producto.
 * @property {string} tipoProducto - Tipo de producto.
 * @property {string} usoEspecifico - Uso específico del producto.
 * @property {string} fechaCaducidad - Fecha de caducidad del producto.
 *
 * @compodoc
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

  numeroDeregistroSanitario?: string;

  paisDeorigen?: string;

  paisDeprocedencia?: string;

  tipoProducto?: string;

  usoEspecifico?: string;

  fechaDeCaducidad?: string;
  
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
