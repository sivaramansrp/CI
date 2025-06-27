
/**
 * DiscripccionDeLaMercanciaForm: Interface para la información de la persona fisca
 * @interface DiscripccionDeLaMercancia
 */
export interface DiscripccionDeLaMercanciaForm {
    /**
     * Denominación de la persona fisca
     * @type {string}
     */
    consecutivo: string;

    /**
     * Estado de la persona fisca
     * @type {string}
     */
    estado: string;

    /**
 * Denominación de la persona fisca
 * @type {string}
 */
    cantidad: string;


    /**
     *  Forma parte de patrimonio persona fisca
     * @type { string; }
     */
    formaParteDePatrimonio: string;

    /**
 * Número de registro del aviso
 * @type {string}
 */
    numeroderegistro: string;

    /**
     * Nombre, denominación o razón social
     * @type {string}
     */
    NobmreDenominationRazonSocial: string;

    /**
     * RFC o tax ID
     * @type {string}
     */
    rfctaxid: string;

    /**
     * Teléfono de contacto
     * @type {string}
     */
    Telefono: string;

    /**
     * Correo electrónico de contacto
     * @type {string}
     */
    correoelectronico: string;

    /**
     * Entidad federativa
     * @type {string}
     */
    entidadadfederativa: string;

    /**
     * Alcaldía o municipio
     * @type {string}
     */
    alcadilamunicipio: string;

    /**
     * Colonia
     * @type {string}
     */
    colonia: string;

    /**
     * Código postal
     * @type {string}
     */
    codigopostal: string;

    /**
     * Calle
     * @type {string}
     */
    calle: string;

    /**
     * Número o letra exterior
     * @type {string}
     */
    numeroletraexterior: string;

    /**
     * Número o letra interior
     * @type {string}
     */
    numeroletrainterior: string;

    /**
     * Entre calle
     * @type {string}
     */
    entrecalle: string;

    /**
     * Y calle
     * @type {string}
     */
    ycalle: string;
}
/**
 * Interfaz que representa los datos de un solicitante.
 */
export interface SolicitanteMockData {
  /**
   * RFC del solicitante
   * @type {string}
   */
  rfc: string;

  /**
   * Denominación o razón social del solicitante
   * @type {string}
   */
  denominacion: string;

  /**
   * Actividad económica del solicitante
   * @type {string}
   */
  actividadEconomica: string;

  /**
   * Correo electrónico del solicitante
   * @type {string}
   */
  correoElectronico: string;

  /**
   * Lada telefónica
   * @type {string}
   */
  lada: string;

  /**
   * País del solicitante
   * @type {string}
   */
  pais: string;

  /**
   * Código postal
   * @type {string}
   */
  codigoPostal: string;

  /**
   * Municipio o alcaldía
   * @type {string}
   */
  municipioOAlcadia: string;

  /**
   * Estado
   * @type {string}
   */
  estado: string;

  /**
   * Calle
   * @type {string}
   */
  calle: string;

  /**
   * Número exterior
   * @type {string}
   */
  numeroExterior: string;

  /**
   * Número interior
   * @type {string}
   */
  numeroInterior: string;

  /**
   * Teléfono
   * @type {string}
   */
  telefono: string;
}
