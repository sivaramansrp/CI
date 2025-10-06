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
 * Interfaz que representa un sector.
 * @export
 * @interface Sector
 */
export interface Sector {
  clave?: string;
  /**
   * Descripción detallada del sector.
   * @property {string} [descripcionSector]
   */
  descripcion?: string;
}

/**
 * Interfaz que representa una fracción arancelaria.
 * @export
 * @interface Arancelaria
 */
export interface Arancelaria {
  /**
   * Número de fracción.
   * @property {string} fraccion
   */
  fraccion: string;

  /**
   * Fracción arancelaria.
   * @property {string} fraccionArancelaria
   */
  fraccionArancelaria: string;

  /**
   * Descripción comercial de la fracción.
   * @property {string} descripcionComercial
   */
  descripcionComercial: string;

  /**
   * Información del Anexo II.
   * @property {string} anexoII
   */
  anexoII: string;

  /**
   * Tipo de fracción.
   * @property {string} tipo
   */
  tipo: string;

  /**
   * Unidad de medida de la fracción.
   * @property {string} umt
   */
  umt: string;

  /**
   * Categoría de la fracción.
   * @property {string} categoria
   */
  categoria: string;

  /**
   * Valor mensual de la fracción.
   * @property {string} valorMensual
   */
  valorMensual: string;

  /**
   * Valor anual de la fracción.
   * @property {string} valorAnual
   */
  valorAnual: string;

  /**
   * Volumen mensual de la fracción.
   * @property {string} volumenrMensual
   */
  volumenrMensual: string;

  /**
   * Volumen anual de la fracción.
   * @property {string} volumenAnual
   */
  volumenAnual: string;
}

/**
 * Interfaz que representa una fracción arancelaria de importación.
 * @export
 * @interface ArancelariaImportacion
 */
export interface ArancelariaImportacion {
  /**
   * Número de fracción.
   * @property {string} fraccion
   */
  fraccion: string;

  /**
   * Fracción arancelaria del producto de exportación.
   * @property {string} fraccionArancelaria
   */
  fraccionArancelaria: string;

  /**
   * Descripción comercial del producto de exportación.
   * @property {string} descripcionComercial
   */
  descripcionComercial: string;

  /**
   * Fracción arancelaria de la mercancía de importación.
   * @property {string} fraccionArancelariaImportacion
   */
  fraccionArancelariaImportacion: string;

  /**
   * Descripción comercial de la mercancía de importación.
   * @property {string} descripcionComercialImportacion
   */
  descripcionComercialImportacion: string;

  /**
   * Información del Anexo II.
   * @property {string} anexoII
   */
  anexoII: string;

  /**
   * Tipo de fracción.
   * @property {string} tipo
   */
  tipo: string;

  /**
   * Unidad de medida de la fracción.
   * @property {string} umt
   */
  umt: string;

  /**
   * Categoría de la fracción.
   * @property {string} categoria
   */
  categoria: string;

  /**
   * Valor mensual de la fracción.
   * @property {string} valorMensual
   */
  valorMensual: string;

  /**
   * Valor anual de la fracción.
   * @property {string} valorAnual
   */
  valorAnual: string;

  /**
   * Volumen mensual de la fracción.
   * @property {string} volumenrMensual
   */
  volumenrMensual: string;

  /**
   * Volumen anual de la fracción.
   * @property {string} volumenAnual
   */
  volumenAnual: string;
}

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

/**
 * Interfaz que representa la información de los servicios.
 * @export
 * @interface InfoServicios
 */
export interface InfoServicios {
  /**
   * Modalidad seleccionada.
   * @property {string} seleccionaLaModalidad
   */
  seleccionaLaModalidad: string;

  /**
   * Folio del servicio.
   * @property {string} folio
   */
  folio: string;

  /**
   * Año del servicio.
   * @property {string} ano
   */
  ano: string;
}

/**
 * Interfaz que representa los servicios.
 * @export
 * @interface Servicios
 */
export interface Servicios {
  /**
   * Modalidad seleccionada.
   * @property {string} seleccionaLaModalidad
   */
  seleccionaLaModalidad: string;

  /**
   * Folio del servicio.
   * @property {string} folio
   */
  folio: string;

  /**
   * Año del servicio.
   * @property {string} ano
   */
  ano: string;
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