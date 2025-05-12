/**
 * Representa la estructura de un reporte de programas.
 */
export interface ProgramasReporte {
  /**
   * Folio único del programa.
   */
  folioPrograma: string;

  /**
   * Modalidad del programa.
   */
  modalidad: string;

  /**
   * Tipo de programa.
   */
  tipoPrograma: string;

  /**
   * Estatus actual del programa.
   */
  estatus: string;
}

/**
 * Interfaz que representa las fechas de un reporte anual.
 * 
 * @property {string} reporteAnualFechaInicio - Fecha de inicio del reporte anual.
 * @property {string} reporteAnualFechaFin - Fecha de finalización del reporte anual.
 */
export interface ReporteFechas {
  /**
   * Fecha de inicio del reporte anual.
   */
  reporteAnualFechaInicio: string;

  /**
   * Fecha de finalización del reporte anual.
   */
  reporteAnualFechaFin: string;
}
