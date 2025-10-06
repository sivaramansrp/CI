/**
 * Representa la información de registro de un subfabricante.
 * @export
 * @interface InfoRegistro
 */
export interface InfoRegistro {
  /**
   * La modalidad del registro.
   * @property {string} modalidad
   */
  modalidad: string;

  /**
   * El folio asociado al registro.
   * @property {string} folio
   */
  folio: string;

  /**
   * El año del registro.
   * @property {number} ano
   */
  ano: number;
}

/**
 * Interfaz que representa los datos de un subcontratista.
 * @export
 * @interface DatosSubcontratista
 */
export interface DatosSubcontratista {
  /**
   * El Registro Federal de Contribuyentes (RFC) del subcontratista.
   * @property {string} rfc
   */
  rfc: string;

  /**
   * El estado o región donde se encuentra el subcontratista.
   * @property {string} estado
   */
  estado: string;
}

/**
 * Modelo que representa la dirección de un subfabricante.
 * @export
 * @interface SubfabricanteDireccionModelo
 */
export interface SubfabricanteDireccionModelo {
  /**
   * Nombre de la calle.
   * @property {string} calle
   */
  calle: string;

  /**
   * Número exterior del domicilio.
   * @property {number} numExterior
   */
  numExterior: number;

  /**
   * Número interior del domicilio.
   * @property {number} numInterior
   */
  numInterior: number;

  /**
   * Código postal del domicilio.
   * @property {number} codigoPostal
   */
  codigoPostal: number;

  /**
   * Nombre de la colonia.
   * @property {string} colonia
   */
  colonia: string;

  /**
   * Nombre de la delegación o municipio.
   * @property {string} delegacionMunicipio
   */
  delegacionMunicipio: string;
  /**
   * Nombre de la entidad federativa.
   * @property {string} entidadFederativa
   */
  entidadFederativa: string;
  /**
   * Nombre del país.
   * @property {string} pais
   */
  pais: string;
  /**
   * Identificador único del subfabricante.
   * @property {string} idSubfabricante
   */
  idSubfabricante: string;
  /**
   * Registro Federal de Contribuyentes del subfabricante.
   * @property {string} rfc
   */
  rfc: string;
  /**
   * Domicilio fiscal del solicitante.
   * @property {string} domicilioFiscalSolicitante
   */
  domicilioFiscalSolicitante: string;
  /**
   * Razón social del subfabricante.
   * @property {string} razonSocial
   */
  razonSocial: string;
}
export interface PlantasDireccionModelo {
  /**
   * Nombre de la calle.
   * @property {string} calle
   */
  calle: string;

  /**
   * Número exterior del domicilio.
   * @property {number} numExterior
   */
  numExterior: number;

  /**
   * Número interior del domicilio.
   * @property {number} numInterior
   */
  numInterior: number;

  /**
   * Código postal del domicilio.
   * @property {number} codigoPostal
   */
  codigoPostal: number;

  /**
   * Nombre de la colonia.
   * @property {string} colonia
   */
  localidad: string;

  /**
   * Nombre de la delegación o municipio.
   * @property {string} delegacionMunicipio
   */
  delegacionMunicipio: string;
  /**
   * Nombre de la entidad federativa.
   * @property {string} entidadFederativa
   */
  entidadFederativa: string;
  /**
   * Nombre del país.
   * @property {string} pais
   */
  pais: string;
  /**
   * Identificador único del subfabricante.
   * @property {string} idSubfabricante
   */
  idSubfabricante: string;
  /**
   * Registro Federal de Contribuyentes del subfabricante.
   * @property {string} rfc
   */
  rfc: string;
  /**
   * Domicilio fiscal del solicitante.
   * @property {string} domicilioFiscalSolicitante
   */
  domicilioFiscalSolicitante: string;
  /**
   * Razón social del subfabricante.
   * @property {string} razonSocial
   */
  razonSocial: string;
}


/**
 * Representa el estado del trámite 80207.
 * @export
 * @interface Tramite80207State
 */
export interface Tramite80207State {
  
    /** Identificador de la solicitud, puede ser nulo si aún no se ha creado. */
  idSolicitud: number | null;
  /**
   * Información del registro asociada al trámite.
   * @property {InfoRegistro} infoRegistro
   */
  infoRegistro: InfoRegistro;

  /**
   * Datos del subcontratista relacionados con el trámite.
   * @property {DatosSubcontratista} datosSubcontratista
   */
  datosSubcontratista: DatosSubcontratista;

  /**
   * Lista de plantas buscadas para el subfabricante.
   * @property {SubfabricanteDireccionModelo[]} plantasBuscadas
   */
  plantasBuscadas: SubfabricanteDireccionModelo[];

  
  /**
   * Lista de plantas que se agregarán al subfabricante.
   * @property {PlantasDireccionModelo[]} plantas
   */
  plantas: PlantasDireccionModelo[];

  /**
   * Lista de plantas de subfabricantes que se agregarán.
   * @property {SubfabricanteDireccionModelo[]} plantasSubfabricantesAgregar
   */
  plantasSubfabricantesAgregar:PlantasDireccionModelo[];

  /**
   * Validación de la forma.
   * @property {Object} formaValida
   */
  formaValida: {
    /**
     * Indica si los datos del subcontratista son válidos.
     * @property {boolean} esDatosSubcontratistaValido
     */
    esDatosSubcontratistaValido: boolean;
  };
}

export interface DomicilioPayload {
  idDomicilio: number;
  calle: string;
  numeroExterior: string;
  numeroInterior: string;
  codigoPostal: string;
  informacionExtra: string;
  clave: string;
  cveLocalidad: string;
  cveDelegMun: string;
  cveEntidad: string;
  cvePais: string;
  ciudad: string;
  telefono: string;
  fax: string;
  municipio: string;
  colonia: string;
  descUbicacion: string;
  cveCatalogo: string;
  telefonos: string;
  tipoDomicilio: number;
}
