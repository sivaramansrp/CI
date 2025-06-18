/**
 * Modelos utilizados en el trámite 32503.
 * 
 * Este archivo contiene las interfaces que definen las estructuras de datos utilizadas
 * en el trámite de aviso de traslado, incluyendo catálogos, datos del solicitante,
 * tablas de avisos, tablas de mercancías, formularios y documentos.
 */

/**
 * Representa un elemento de un catálogo.
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
 * Representa una lista de elementos de un catálogo.
 */
export interface CatalogoLista {
  /**
   * Lista de elementos del catálogo.
   */
  datos: Catalogo[];
}

/**
 * Representa una acción de un botón en el wizard.
 */
export interface AccionBoton {
  /**
   * Acción realizada por el botón (e.g., "cont" para continuar, "atras" para retroceder).
   */
  accion: string;

  /**
   * Valor asociado a la acción (e.g., índice del paso en el wizard).
   */
  valor: number;
}

/**
 * Representa la respuesta de un servicio que devuelve un catálogo.
 */
export interface RespuestaCatalogos {
  /**
   * Código de respuesta del servicio.
   */
  code: number;

  /**
   * Lista de elementos del catálogo.
   */
  data: Catalogo[];

  /**
   * Mensaje de respuesta del servicio.
   */
  message: string;
}

/**
 * Representa los datos generales del solicitante.
 */
export interface DatosSolicitante {
  rfc: string;
  denominacion: string;
  actividadEconomica: string;
  correoElectronico: string;
  pais: string;
  codigoPostal: string;
  entidadFederativa: string;
  municipio: string;
  localidad: string;
  colonia: string;
  calle: string;
  nExt: string;
  nInt: string;
  lada: string;
  telefono: string;
  adace: string;
}

/**
 * Representa un aviso en la tabla de avisos.
 */
export interface AvisoTabla {
  idTransaccionVUCEM: string; 
  cantidad: string;         
  pesoKg: string;           
  descripcionUnidadMedida: string; 
  descripcion: string; 
}

/**
 * Representa los datos de la tabla de avisos.
 */
export interface AvisoTablaDatos {
  /**
   * Lista de avisos en la tabla.
   */
  datos: AvisoTabla[];
}


/**
 * Representa el formulario de un aviso.
 */
export interface AvisoFormulario {
   
  adace: string;
  valorProgramaImmex: string;
  valorAnioProgramaImmex: string;
  tipoBusqueda: string;
  levantaActa: string;
  tipoAviso: string;
  idTransaccion: string;
  motivoProrroga: string;
  fechaTranslado: string;
  nombreComercial: string;
  claveEntidadFederativa: string;
  claveDelegacionMunicipio: string;
  claveColonia: string;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  tipoCarga: string;
  transaccionId: string;
  cantidad: string;
  peso: string;
  unidadMedida:string;
  descripcion: string;
  

}

/**
 * @interface RespuestaConsulta
 * @description Representa la respuesta de la API para una consulta.
 * 
 * @property {boolean} success - Indica si la operación fue exitosa.
 * @property {ConsultaDatos} datos - Datos de la consulta.
 * @property {string} message - Mensaje de la respuesta.
 */
export interface RespuestaConsulta {
  success: boolean;
  datos: ConsultaDatos;
  message: string;
}

/**
 * @interface RespuestaCatalogos
 *  @description Representa la respuesta de una consulta a un catálogo.
 *  @property {boolean} success - Indica si la consulta fue exitosa.
 *  @property {CatalogoLista} datos - Datos del catálogo consultado.
 *   @property {string} message - Mensaje de la respuesta.
 */ 
export interface ConsultaDatos {
 valorProgramaImmex: string;
 valorAnioProgramaImmex: string;
  adace: string;
  tipoAviso: string;
  levantaActa: string;
  tipoBusqueda: string;

}







