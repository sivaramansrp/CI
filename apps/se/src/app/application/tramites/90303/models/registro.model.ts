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
