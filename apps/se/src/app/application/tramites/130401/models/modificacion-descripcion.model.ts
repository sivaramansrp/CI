/**
 * Representa una acción de un botón.
 * 
 * Contiene información sobre la acción que se debe realizar y el valor asociado.
 */
export interface AccionBoton {
  /**
   * Acción que se debe realizar (e.g., "guardar", "eliminar").
   */
  accion: string;

  /**
   * Valor asociado a la acción (e.g., identificador del elemento).
   */
  valor: number;
}

/**
 * Representa una lista de elementos de un catálogo.
 * 
 * Contiene un array de elementos del catálogo.
 */
export interface CatalogoLista {
  /**
   * Lista de elementos del catálogo.
   */
  datos: Catalogo[];
}

/**
 * Representa un elemento de un catálogo.
 * 
 * Contiene información básica como el identificador y la descripción.
 */
export interface Catalogo {
  /**
   * Identificador único del elemento del catálogo.
   */
  id: number;

  /**
   * Descripción del elemento del catálogo.
   */
  descripcion: string;
}

/**
 * Representa los datos de una solicitud.
 * 
 * Contiene información detallada sobre la solicitud, como el número de folio, régimen, mercancías, entre otros.
 */
export interface DatosSolicitud {
  numeroFolioTramiteOriginal: string;
  solicitud: string;
  regimen: string;
  clasificacionRegimen: string;
  condicionMercancia: string;
  mercanciaDescripcion: string;
  fraccionArancelaria: string;
  unidadMedidaComercial: string;
  unidadesAutorizadas: string;
  importeFacturaAutorizadoUSD: string;
  usoEspecifico: string;
  justificacionImportacionExportacion: string;
  observaciones: string;
  representacionFederal: string;
}

/**
 * Representa los datos de una tabla de solicitudes.
 * 
 * Contiene información como cantidad, descripción, precio unitario y total en USD.
 */
export interface SolicitudTablaDatos {
  id: number;
  cantidad: string;
  descripcion: string;
  precioUnitarioUSD: string;
  totalUSD: string;
}

/**
 * Representa una lista de partidas.
 * 
 * Contiene un array de datos de la tabla de solicitudes.
 */
export interface PartidasLista {
  /**
   * Lista de datos de la tabla de solicitudes.
   */
  datos: SolicitudTablaDatos[];
}

/**
 * Representa los datos de una arancelaria.
 * 
 * Contiene información como el identificador, fracción arancelaria y descripción.
 */
export interface DatosArancelaria {
  id: number;
  fraccionArancelaria: string;
  descripcion: string;
}

/**
 * Representa una lista de arancelarias.
 * 
 * Contiene un array de datos de arancelarias.
 */
export interface ArancelariaLista {
  /**
   * Lista de datos de arancelarias.
   */
  datos: DatosArancelaria[];
}

/**
 * Representa una solicitud.
 * 
 * Contiene información detallada sobre la solicitud, como el número de folio, régimen, mercancías, entre otros.
 */
export interface Solicitud {
  numeroFolioTramiteOriginal: string;
  solicitud: string;
  regimen: string;
  clasificacionRegimen: string;
  condicionMercancia: string;
  mercanciaDescripcion: string;
  fraccionArancelaria: string;
  unidadMedidaComercial: string;
  unidadesAutorizadas: string;
  importeFacturaAutorizadoUSD: string;
  usoEspecifico: string;
  justificacionImportacionExportacion: string;
  observaciones: string;
  representacionFederal: string;
}

/**
 * Representa una lista de solicitudes.
 * 
 * Contiene un array de datos de solicitudes.
 */
export interface SolicitudLista {
  /**
   * Lista de datos de solicitudes.
   */
  datos: Solicitud;
}

/**
 * Representa una mercancía.
 * 
 * Contiene información sobre la mercancía, como el número de folio, cantidad, descripción y modificaciones.
 */
export interface Mercancia {
  numeroFolioResolucion: string;
  cantidadLibreMercancia: string;
  descripcion: string;
  descripcionModificacion: string;
}

/**
 * Representa una lista de mercancías.
 * 
 * Contiene un array de datos de mercancías.
 */
export interface MercanciaLista {
  /**
   * Lista de datos de mercancías.
   */
  datos: Mercancia;
}

/**
 * Representa los datos de una tabla de mercancías.
 * 
 * Contiene información como cantidad, descripción autorizada, descripción solicitada, precio unitario y total en USD.
 */
export interface MercanciaTablaDatos {
  id: number;
  cantidad: string;
  descripcionAutorizada: string;
  descripcionSolicitada: string;
  precioUnitarioUSD: string;
  totalUSD: string;
}

/**
 * Representa una lista de datos de la tabla de mercancías.
 * 
 * Contiene un array de datos de la tabla de mercancías.
 */
export interface MercanciaTablaLista {
  /**
   * Lista de datos de la tabla de mercancías.
   */
  datos: MercanciaTablaDatos[];
}