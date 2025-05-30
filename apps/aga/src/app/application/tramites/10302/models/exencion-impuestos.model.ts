/**
 * Interfaz que representa la respuesta de una operación relacionada con mercancías.
 */
export interface RespuestaMercancia {
  /**
   * Indica si la operación fue exitosa.
   * @type {boolean}
   */
  success: boolean;

  /**
   * Datos del contenedor relacionados con la mercancía.
   * @type {datosDelMercancia}
   */
  datos: datosDelMercancia;

  /**
   * Mensaje de la respuesta.
   * @type {string}
   */
  message: string;
}

/**
 * Interfaz que representa los datos de una mercancía.
 */
export interface datosDelMercancia {
  /**
   * Identificador único de la mercancía.
   * @type {number}
   */
  id: number;

  /**
   * Tipo de mercancía.
   * @type {string}
   */
  tipoDeMercancia: string;

  /**
   * Unidad de medida de la mercancía.
   * @type {string}
   */
  unidadMedida: string;

  /**
   * Condición de la mercancía.
   * @type {string}
   */
  condicionMercancia: string;

  /**
   * Año relacionado con la mercancía.
   * @type {Array<any>}
   */
  ano: [];

  /**
   * Cantidad de mercancía.
   * @type {string}
   */
  cantidad: string;

  /**
   * Marca de la mercancía.
   * @type {string}
   */
  marca: string;

  /**
   * Modelo de la mercancía.
   * @type {string}
   */
  modelo: string;

  /**
   * Serie de la mercancía.
   * @type {string}
   */
  serie: string;

  /**
   * Datos adicionales relacionados con la mercancía.
   * @type {Array<any>}
   */
  datosDelMercancia: [];
}

export interface RespuestaConsulta {
  success: boolean;
  datos: ConsultaDatos;
  message: string;
}

export interface ConsultaDatos {
  
}
