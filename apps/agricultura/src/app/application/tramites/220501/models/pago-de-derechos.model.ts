/** 
 * Interfaz que representa los datos del pago de derechos. 
 */
export interface PagoDeDerechos {
  /** Indica si el pago no está exento. */
  exentoPagoNo: string | number;

  /** Indica si el pago está exento. */
  exentoPagoSi: string;

  /** Justificación en caso de exención de pago. */
  justificacion: string;

  /** Clave de referencia del pago. */
  claveReferencia: string;

  /** Cadena de dependencia asociada al pago. */
  cadenaDependencia: string;

  /** Nombre del banco donde se realizó el pago. */
  banco: number;

  /** Llave única de identificación del pago. */
  llavePago: string;

  /** Importe total del pago realizado. */
  importePago: string;

  /** Fecha en la que se efectuó el pago. */
  fetchapago: string;
}

/**
 * Interfaz para definir la estructura de las filas.
 */
export interface Row {
  /**
   * Nombre de la persona.
   * @type {string}
   */
  nombre: string;

  /**
   * Número de teléfono de la persona.
   * @type {string}
   */
  telefono: string;

  /**
   * Correo electrónico de la persona.
   * @type {string}
   */
  correo: string;

  /**
   * Domicilio de la persona.
   * @type {string}
   */
  domicilio: string;

  /**
   * País de residencia de la persona.
   * @type {string}
   */
  pais: string;
}

/**
 * Interfaz para definir la estructura de las filas con detalles adicionales.
 */
export interface Rows {
  /**
   * Nombre de la persona.
   * @type {string}
   */
  nombre: string;

  /**
   * Número de teléfono de la persona.
   * @type {string}
   */
  telefono: string;

  /**
   * Correo electrónico de la persona.
   * @type {string}
   */
  correo: string;

  /**
   * Calle donde reside la persona.
   * @type {string}
   */
  calle: string;

  /**
   * Número exterior del domicilio de la persona.
   * @type {number}
   */
  exterior: number;

  /**
   * Número interior del domicilio de la persona.
   * @type {number}
   */
  interior: number;

  /**
   * País de residencia de la persona.
   * @type {string}
   */
  pais: string;
}
/**
 * Interfaz para definir la estructura de las filas.
 */
export interface Tabla {
  /**
   * Partida arancelaria de la mercancía.
   * @type {string}
   */
  Partida: string;

  /**
   * Tipo de requisito asociado a la mercancía.
   * @type {string}
   */
  Tiporequisito: string;

  /**
   * Requisito específico para la mercancía.
   * @type {string}
   */
  Requisito: string;

  /**
   * Certificado asociado a la mercancía.
   * @type {number}
   */
  Certificado: number;

  /**
   * Fracción arancelaria de la mercancía.
   * @type {string}
   */
  Fraccion: string;

  /**
   * Descripción de la mercancía.
   * @type {string}
   */
  FraccionDescripcion: string;

  /**
   * Nico del responsable de la mercancía.
   * @type {string}
   */
  Nico: string;

  /**
   * Descripción del Nico.
   * @type {string}
   */
  NicoDescripcion: string;

  /**
   * Descripción adicional de la mercancía.
   * @type {string}
   */
  Descripcion: string;

  /**
   * Unidad de medida del tipo de mercancía.
   * @type {string}
   */
  Umt: string;

  /**
   * Cantidad en UMT de la mercancía.
   * @type {number}
   */
  CantidadUMT: number;

  /**
   * Unidad de medida comercial de la mercancía.
   * @type {string}
   */
  Umc: string;

  /**
   * Cantidad en UMC de la mercancía.
   * @type {number}
   */
  CantidadUMC: number;

  /**
   * Especie de la mercancía.
   * @type {string}
   */
  Especie: string;

  /**
   * Uso de la mercancía.
   * @type {string}
   */
  Uso: string;

  /**
   * País de origen de la mercancía.
   * @type {string}
   */
  PaisOrigen: string;

  /**
   * País de procedencia de la mercancía.
   * @type {string}
   */
  PaisProcedencia: string;

  /**
   * Presentación de la mercancía.
   * @type {string}
   */
  Presentacion?: string;

  /**
   * Cantidad de presentación de la mercancía.
   * @type {number}
   */
  CantidadPresentacion?: number;

  /**
   * Tipo de presentación de la mercancía.
   * @type {string}
   */
  TipoPresentacion?: string;

  /**
   * Tipo de planta de la mercancía.
   * @type {string}
   */
  TipoPlanta?: string;

  /**
   * Planta autorizada de origen de la mercancía.
   * @type {string}
   */
  PlantaAutorizadaOrigen?: string;

  /**
   * Certificado internacional electrónico asociado a la mercancía.
   * @type {string}
   */
  CertificadoInternacionalElectronico: string;
}
/**
 * Interfaz que define la estructura de un destinatario.
 */
export interface Exportador {
  /** Nombre o razón social del destinatario. */
  nombre: string;
  /** Teléfono del destinatario. */
  telefono: string;
  /** Correo electrónico del destinatario. */
  correoElectronico: string;
  /** domoicilio del destinatario. */
  domoicilio: string;
  /** País del destinatario. */
  pais: string;
  
}
/**
 * Interfaz que define la estructura de un destinatario.
 */
export interface Destinatario {
  /** Nombre o razón social del destinatario. */
  nombre: string;
  /** Teléfono del destinatario. */
  telefono: string;
  /** Correo electrónico del destinatario. */
  correoElectronico: string;
   /** Calle del destinatario. */
  calle: string;
  /** Número exterior del destinatario. */
  numeroExterior: string;
  /** Número interior del destinatario. */
  numeroInterior: string;
  /** País del destinatario. */
  pais: string;
  /** Colonia del destinatario. */
  colonia: string;
  /** Municipio o alcaldía del destinatario. */
  municipioAlcaldia: string;
  /** Entidad federativa del destinatario. */
  entidadFederativa: string;
  /** Código postal del destinatario. */
  codigoPostal: string;
}