/**
 * Representa un registro de la tabla de sectores activos.
 */
export interface ListaTabla {
  /**
   * Estado actual del sector (e.g., "Activado").
   */
  estatus: string;

  /**
   * Clave única que identifica al sector.
   */
  claveDeSector: string;

  /**
   * Nombre o descripción del sector.
   */
  sector: string;
}

/**
 * Representa un registro de la tabla de sectores en baja.
 */
export interface ListaTablaBaja {
  /**
   * Estado actual del sector (e.g., "Baja").
   */
  estatus: string;

  /**
   * Clave única que identifica al sector.
   */
  claveDeSector: string;

  /**
   * Nombre o descripción del sector.
   */
  sector: string;
}


/**
 * Interfaz que representa un registro de bitácora que contiene información sobre modificaciones realizadas.
 * @export
 * @interface Bitacora
 */
export interface Bitacora {
  /**
   * Tipo de modificación realizada.
   * @property {string} tipoModificacion
   */
  tipoModificacion: string;

  /**
   * Fecha en la que se realizó la modificación.
   * @property {string} fechaModificacion
   */
  fechaModificacion: string;

  /**
   * Valores anteriores antes de la modificación.
   * @property {string} valoresAnteriores
   */
  valoresAnteriores: string;

  /**
   * Nuevos valores después de la modificación.
   * @property {string} valoresNuevos
   */
  valoresNuevos: string;
}
export interface BitacoraRespuesta {
  /**
   * Código de estado de la respuesta.
   * @property {number} code
   */
  code: number;

  /**
   * Lista de objetos de tipo Bitacora que contiene los datos de la respuesta.
   * @property {Bitacora[]} data
   */
  data: Bitacora[];

  /**
   * Mensaje descriptivo de la respuesta.
   * @property {string} message
   */
  message: string;
}
