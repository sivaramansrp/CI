/** 
 * Interfaz que representa una solicitud u orden.
 */
export interface Solicitud {
  /** Fecha de creación */
  fechaCreacion: string;

  /** Nombre o identificador de la mercancía */
  mercancia: string;

  /** Cantidad solicitada */
  cantidad: string;

  /** Proveedor de la mercancia */
  proovedor: string;
}
/**
 * Interfaz que define la estructura de los datos de respuesta de un catálogo.
 */
export interface ProductoTable {
  clasificacionDelProducto: string;
  tipoDeProducto: string;
  fraccionArancelaria: string;
  descripcionDeLaFraccion: string;
  modelo: string;
  descripcionDelProducto: string;
  paisDeOrigen: string;
}

/**
 * @interface ScianTable
 * @description
 * Representa la estructura de los datos de la tabla S.C.I.A.N.
 */
export interface ScianTable {
  claveScian: string;
  descripcionScian: string;
}

/**
 * Interfaz que representa una declaración de manifiesto.
 */
export interface Manifiestos {
  /**
   * Los detalles de la declaración.
   * 
   * @property {string} clave - El identificador único de la declaración.
   * @property {string} descripcion - La descripción de la declaración.
   */
  declaracion: {
    clave: string;
    descripcion: string;
  }
  /**
   * Indicador de si la declaración forma parte del manifiesto.
   * 
   * @type {boolean}
   */
  manifiestoDeclaracion: boolean;
}

/**
* Respuesta de la API al obtener múltiples manifiestos.
*/
export interface ManifiestosRespuesta {
  /**
   * Lista de manifiestos.
   * 
   * @type {Manifiestos[]}
   */
  data: Manifiestos[];
}

/**
 * Interfaz que define las etiquetas para una lista cruzada.
 */
export interface CrossListLable {
  /** Texto que aparece en la parte izquierda de la etiqueta. */
  tituluDeLaIzquierda: string;

  /** Texto que aparece en la parte derecha de la etiqueta. */
  derecha: string;
}

/**
 * Interfaz que representa una lista cruzada, incluyendo etiquetas y fechas asociadas.
 */
export interface CrossList {
  /** Etiquetas asociadas a la lista cruzada. */
  label: CrossListLable;

  /** Fechas asociadas con los datos de la lista cruzada. */
  fechas: string[];
}

/**
 * Interfaz que agrupa varias listas cruzadas relacionadas con una mercancía.
 */
export interface MercanciaCrossList {
  /** Lista cruzada para los países de origen de la mercancía. */
  paisOrigenCrossList: CrossList;

  /** Lista cruzada para los países de procedencia de la mercancía. */
  paisProcedencisCrossList: CrossList;

  /** Lista cruzada para los usos específicos de la mercancía. */
  usoEspecificoCrossList: CrossList;
}

/**
 * Respuesta de la API al buscar datos del representante legal.
 */
export interface RepresentanteLegalRespuesta {
  /**
   * Datos del representante legal obtenidos de la API.
   */
  data: RepresentanteLegal[];
}

/**
 * Interfaz que representa los datos de un representante legal.
 */
export interface RepresentanteLegal {
  /** 
   * RFC del representante legal. 
   */
  rfc: string;

  /**
   * Nombre o razón social del representante legal.
   */
  nombreOrazonsocial: string;

  /**
   * Apellido paterno del representante legal.
   */
  apellidoPaterno: string;

  /**
   * Apellido materno del representante legal.
   */
  apellidoMaterno: string;
}