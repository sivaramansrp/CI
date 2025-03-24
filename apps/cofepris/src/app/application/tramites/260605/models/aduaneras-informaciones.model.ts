/**
 * Interfaz que representa un representante.
 * 
 * @export
 * @interface Represtantante
 */
export interface Represtantante {
  /**
   * RFC del representante.
   * 
   * @type {string}
   * @memberof Represtantante
   */
  rfc: string;

  /**
   * Nombre del representante.
   * 
   * @type {string}
   * @memberof Represtantante
   */
  nombre: string;

  /**
   * Apellido paterno del representante.
   * 
   * @type {string}
   * @memberof Represtantante
   */
  apellidoPaterno: string;

  /**
   * Apellido materno del representante.
   * 
   * @type {string}
   * @memberof Represtantante
   */
  apellidoMaterno: string;
}

/**
 * Interfaz que representa la información aduanera.
 * 
 * @export
 * @interface AduanerasInformaciones
 */
export interface AduanerasInformaciones {
  /**
   * Número de permiso de importación.
   * 
   * @type {string}
   * @memberof AduanerasInformaciones
   */
  importPermitNumber: string;

  /**
   * Lista de aduanas actuales.
   * 
   * @type {string[]}
   * @memberof AduanerasInformaciones
   */
  currentCustoms: string[];

  /**
   * Lista de aduanas disponibles.
   * 
   * @type {string[]}
   * @memberof AduanerasInformaciones
   */
  availableCustoms: string[];

  /**
   * Lista de aduanas seleccionadas.
   * 
   * @type {string[]}
   * @memberof AduanerasInformaciones
   */
  selectedCustoms: string[];

  /**
   * Justificación técnica para la información aduanera.
   * 
   * @type {string}
   * @memberof AduanerasInformaciones
   */
  technicalJustification: string;
}

/**
 * Interfaz que representa una aduana.
 * 
 * @export
 * @interface Aduana
 */
export interface Aduana {
  /**
   * ID de la aduana.
   * 
   * @type {number}
   * @memberof Aduana
   */
  id: number;

  /**
   * Nombre de la aduana.
   * 
   * @type {string}
   * @memberof Aduana
   */
  name: string;
}