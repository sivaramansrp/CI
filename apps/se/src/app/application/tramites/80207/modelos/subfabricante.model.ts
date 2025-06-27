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
}

/**
 * Representa el estado del trámite 80207.
 * @export
 * @interface Tramite80207State
 */
export interface Tramite80207State {
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
   * Lista de plantas de subfabricantes que se agregarán.
   * @property {SubfabricanteDireccionModelo[]} plantasSubfabricantesAgregar
   */
  plantasSubfabricantesAgregar: SubfabricanteDireccionModelo[];

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