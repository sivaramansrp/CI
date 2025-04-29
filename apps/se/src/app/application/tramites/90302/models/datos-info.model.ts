/**
 * @fileoverview
 * Este archivo define las interfaces utilizadas en el módulo de ampliación de servicios.
 * Proporciona estructuras de datos para sectores, fracciones arancelarias, importaciones, respuestas de API y otros modelos relacionados.
 *
 * @module DatosInfoModel
 * @description
 * Este archivo contiene las definiciones de las interfaces necesarias para manejar los datos relacionados con sectores, fracciones arancelarias,
 * importaciones, servicios y respuestas de API en el módulo de ampliación de servicios.
 */





/**
 * Interfaz que representa la respuesta de datos de una API.
 * @export
 * @interface DatosResponse
 */
export interface DatosResponse {
  /**
   * Código de respuesta.
   * @property {number} code
   */
  code: number;

  /**
   * Datos de la respuesta.
   * @property {Object} data
   */
  data: {
    /**
     * Identificador del subfabricante.
     * @property {string} idsubmanufacturer
     */
    idsubmanufacturer: string;

    /**
     * Información de los servicios.
     * @property {InfoServicios} infoServicios
     */
    infoServicios: {
      seleccionaLaModalidad: string;
      folio: string;
      ano: string;
    };
  };
}


export interface InfoServicios {
  rfc: string;
  representacionFederal: string;
  tipoModificacion: string;
  modificacionPrograma: string;
}

/**
 * Interfaz que representa los datos de respuesta de una API.
 * @export
 * @interface ResponseData
 */
export interface ResponseData {
  /**
   * Identificador del subfabricante.
   * @property {string} idsubmanufacturer
   */
  idsubmanufacturer: string;

  /**
   * Información de los servicios.
   * @property {InfoServicios} infoServicios
   */
  infoServicios: InfoServicios;
}

/**
 * Interfaz que representa la respuesta de una API.
 * @export
 * @interface ApiResponse
 */
export interface ApiResponse {
  /**
   * Código de respuesta.
   * @property {number} code
   */
  code: number;

  /**
   * Datos de la respuesta.
   * @property {ResponseData} data
   */
  data: ResponseData;

  /**
   * Información de los servicios.
   * @property {InfoServicios} infoServicios
   */
  infoServicios: InfoServicios;
}

/**
 * Interfaz que representa una acción de un botón.
 * @export
 * @interface AccionBoton
 */
export interface AccionBoton {
  /**
   * Acción del botón.
   * @property {string} accion
   */
  accion: string;

  /**
   * Valor asociado a la acción.
   * @property {number} valor
   */
  valor: number;
}

export interface Plantas {
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codingPostal: string;
  colonia: string;
  municipio: string;
  estado: string;
  pais: string;
  rfc: string;
  razonSocial: string;
  domicilioFisical: string;
  estatus: string;
}

export interface MercanciasAProducir{
  fraccionArancelaria:string,
  claveSector:string,
  estatus:string,
}
export interface Sector {
  listaSectores: string;
  claveSector: string;
  estatus: string;
}

export interface ProductorIndirecto {
  rfc: string;
  denominacion: string;
  correo: string;
  estatus: string;
}
export interface Bitacora{
  tipoModificacion:string;
  fechaModificacion:string;
  valoresAnteriores:string;
  valoresNuevos:string;


}
export interface BitacoraRespuesta {
  code: number;
  data: Bitacora[];
  message: string;
}
export interface PlantasRespuesta {
  code: number;
  data: Plantas[];
  message: string;
}
export interface MercanciasRespuesta {
  code: number;
  data: MercanciasAProducir[];
  message: string;
}
export interface SectorRespuesta {
  code: number;
  data: Sector[];
  message: string;
}
export interface ProductorIndirectoRespuesta {
  code: number;
  data: ProductorIndirecto[];
  message: string;
}

export interface DatosDelModificacion {
  id?: number;
  calle?: string;
  numeroExterior?: number;
  numeroInterior?: number;
  codigoPostal?: number;
  colonia?: string;
  municipioOAlcaldia?: string;
  entidadFederativa?: string;
  pais?: string;
  telefono?: string;
  desEstatus?: string;
}
