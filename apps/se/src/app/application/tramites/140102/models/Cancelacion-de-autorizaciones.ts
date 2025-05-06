/**
 * @interface CancelacionTabla
 * @description
 * Representa la estructura de los datos utilizados en la tabla de cancelación de autorizaciones.
 */
export interface CancelacionTabla {
  /**
   * @property {string} folioDePrograma
   * Representa el folio único del programa asociado a la cancelación.
   */
  folioDePrograma: string;

  /**
   * @property {string} seleccionaLaModalidad
   * Indica la modalidad seleccionada para la cancelación del programa.
   */
  seleccionaLaModalidad: string;

  /**
   * @property {string} representacionFederal
   * Especifica la representación federal asociada al programa.
   */
  representacionFederal: string;

  /**
   * @property {string} tipoPrograma
   * Define el tipo de programa al que pertenece la cancelación.
   */
  tipoPrograma: string;

  /**
   * @property {string} estatus
   * Indica el estado actual del programa (por ejemplo, "Vigente", "Cancelado").
   */
  estatus: string;
}