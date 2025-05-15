/**
 * ## MontoExpedirTablaDatos
 * Interfaz que representa los datos de la tabla de montos a expedir.
 */
export interface MontoExpedirTablaDatos {
    /**
     * ## columns
     * Arreglo de cadenas que representa los encabezados de las columnas de la tabla.
     */
    columns: string[];
  }
  
  /**
   * ## TablaDatos
   * Interfaz que representa las filas de datos de una tabla.
   */
  export interface TablaDatos {
    /**
     * ## tbodyData
     * Arreglo de cadenas que representa los datos de las filas del cuerpo de la tabla.
     */
    tbodyData: string[];
  }