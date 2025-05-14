export interface LISTAPASOWIZARD {
  /**
   * @descripcion Índice del paso.
   */
  indice: number;

  /**
   * @descripcion Título del paso.
   */
  titulo: string;

  /**
   * @descripcion Indica si el paso está activo.
   */
  activo: boolean;

  /**
   * @descripcion Indica si el paso está completado.
   */
  completado: boolean;
}

/**
 * @descripcion Interfaz que representa un botón de acción.
 */
export interface ACCIONBOTON {
  /**
   * @descripcion Acción que se debe realizar.
   */
  accion: string;

  /**
   * @descripcion Valor asociado a la acción.
   */
  valor: number;
}