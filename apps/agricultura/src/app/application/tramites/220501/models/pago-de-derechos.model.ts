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
  Partida: string;
  Tiporequisito: string;
  Requisito: string;
  Certificado: number;
  Fraccion: string;
  Descripcion: string;
  Nico: string;
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
  
}