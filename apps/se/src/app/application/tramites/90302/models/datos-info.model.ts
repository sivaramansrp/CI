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
 *
 * @interface InfoServicios
 */

export interface InfoServicios {
  /**
   * @property {string} rfc - El Registro Federal de Contribuyentes asociado al servicio.
   */
  rfc: string;
  /**
   * @property {string} representacionFederal - La representación federal correspondiente.
   */
  representacionFederal: string;
  /**
   * @property {string} tipoModificacion - El tipo de modificación realizada.
   */
  tipoModificacion: string;

  /**
   * @property {string} modificacionPrograma - La descripción de la modificación del programa.
   */
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

/**
 * @interface Plantas
 * @description Representa la estructura de datos para las plantas.
 * 
 * @property {string} calle - La calle donde se encuentra la planta.
 * @property {string} numeroExterior - El número exterior del domicilio de la planta.
 * @property {string} numeroInterior - El número interior del domicilio de la planta.
 * @property {string} codingPostal - El código postal del domicilio de la planta.
 * @property {string} colonia - La colonia donde se encuentra la planta.
 * @property {string} municipio - El municipio donde se encuentra la planta.
 * @property {string} estado - El estado donde se encuentra la planta.
 * @property {string} pais - El país donde se encuentra la planta.
 * @property {string} rfc - El Registro Federal de Contribuyentes (RFC) de la planta.
 * @property {string} razonSocial - La razón social de la planta.
 * @property {string} domicilioFisical - El domicilio fiscal de la planta.
 * @property {string} estatus - El estatus actual de la planta.
 */
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

/**
 * Representa la información de las mercancías a producir.
 * 
 * @property {string} fraccionArancelaria - La fracción arancelaria asociada a la mercancía.
 * @property {string} claveSector - La clave del sector al que pertenece la mercancía.
 * @property {string} estatus - El estado actual de la mercancía.
 */
export interface MercanciasAProducir {
  fraccionArancelaria: string;
  claveSector: string;
  estatus: string;
}

/**
 * Representa un sector con información relevante.
 * 
 * @interface Sector
 * @property {string} listaSectores - Lista de sectores asociados.
 * @property {string} claveSector - Clave única que identifica al sector.
 * @property {string} estatus - Estado actual del sector.
 */
export interface Sector {
  listaSectores: string;
  claveSector: string;
  estatus: string;
}

/**
 * Representa un productor indirecto con su información relevante.
 *
 * @interface ProductorIndirecto
 * @property {string} rfc - El Registro Federal de Contribuyentes (RFC) del productor indirecto.
 * @property {string} denominacion - La denominación o nombre del productor indirecto.
 * @property {string} correo - La dirección de correo electrónico del productor indirecto.
 * @property {string} estatus - El estado o estatus actual del productor indirecto.
 */
export interface ProductorIndirecto {
  rfc: string;
  denominacion: string;
  correo: string;
  estatus: string;
}

/**
 * @interface Bitacora
 * @description Representa un registro de bitácora que contiene información sobre modificaciones realizadas.
 * @property {string} tipoModificacion - Tipo de modificación realizada.
 * @property {string} fechaModificacion - Fecha en la que se realizó la modificación.
 * @property {string} valoresAnteriores - Valores anteriores antes de la modificación.
 * @property {string} valoresNuevos - Nuevos valores después de la modificación.
 */
export interface Bitacora {
  tipoModificacion: string;
  fechaModificacion: string;
  valoresAnteriores: string;
  valoresNuevos: string;
}

/**
 * Representa la respuesta de la bitácora.
 * 
 * @property {number} code - Código de estado de la respuesta.
 * @property {Bitacora[]} data - Lista de objetos de tipo Bitacora que contiene los datos de la respuesta.
 * @property {string} message - Mensaje descriptivo de la respuesta.
 */
export interface BitacoraRespuesta {
  code: number;
  data: Bitacora[];
  message: string;
}


/**
 * @interface PlantasRespuesta
 * @description Representa la estructura de la respuesta para las plantas.
 * @property {number} code - Código de estado de la respuesta.
 * @property {Plantas[]} data - Lista de plantas devueltas en la respuesta.
 * @property {string} message - Mensaje descriptivo de la respuesta.
 */
export interface PlantasRespuesta {
  code: number;
  data: Plantas[];
  message: string;
}

/**
 * @interface MercanciasRespuesta
 * @description Representa la respuesta que contiene información sobre las mercancías a producir.
 * @property {number} code - Código de estado de la respuesta.
 * @property {MercanciasAProducir[]} data - Lista de mercancías a producir.
 * @property {string} message - Mensaje descriptivo de la respuesta.
 */
export interface MercanciasRespuesta {
  code: number;
  data: MercanciasAProducir[];
  message: string;
}

/**
 * Representa la respuesta del sector con información relevante.
 * 
 * @interface SectorRespuesta
 * @property {number} code - Código de estado de la respuesta.
 * @property {Sector1[]} data - Lista de datos del sector.
 * @property {string} message - Mensaje descriptivo de la respuesta.
 */
export interface SectorRespuesta {
  code: number;
  data: Sector[];
  message: string;
}

/**
 * Representa la respuesta de un productor indirecto.
 * 
 * @interface ProductorIndirectoRespuesta
 * @property {number} code - Código de estado de la respuesta.
 * @property {ProductorIndirecto[]} data - Lista de productores indirectos incluidos en la respuesta.
 * @property {string} message - Mensaje descriptivo de la respuesta.
 */
export interface ProductorIndirectoRespuesta {
  code: number;
  data: ProductorIndirecto[];
  message: string;
}

/**
 * Interfaz que representa los datos de modificación.
 * 
 * @interface DatosDelModificacion
 * @property {number} id - Identificador único del registro.
 * @property {string} calle - Nombre de la calle.
 * @property {number} numeroExterior - Número exterior del domicilio.
 * @property {number} numeroInterior - Número interior del domicilio.
 * @property {number} codigoPostal - Código postal del domicilio.
 * @property {string} colonia - Nombre de la colonia.
 * @property {string} municipioOAlcaldia - Nombre del municipio o alcaldía.
 * @property {string} entidadFederativa - Nombre de la entidad federativa.
 * @property {string} pais - Nombre del país.
 * @property {string} telefono - Número de teléfono de contacto.
 * @property {string} desEstatus - Descripción del estatus.
 */
export interface DatosDelModificacion {
  id: number;
  calle: string;
  numeroExterior: number;
  numeroInterior: number;
  codigoPostal: number;
  colonia: string;
  municipioOAlcaldia: string;
  entidadFederativa: string;
  pais: string;
  telefono: string;
  desEstatus: string;
}
