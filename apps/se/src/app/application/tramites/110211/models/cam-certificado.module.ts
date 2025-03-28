export interface ListaPasoWizard {
  /** Index of the step */
  indice: number;
  /** Title of the step */
  titulo: string;
  /** Indicates if the step is active */
  activo: boolean;
  /** Indicates if the step is completed */
  completado: boolean;
}

/**
 * Interface representing an action button.
 */
export interface AccionBoton {
  /** Action to be performed */
  accion: string;
  /** Value associated with the action */
  valor: number;
}

export interface TablaDatosModal {
  id: number,
  fraccionArancelaria: number,
  nombreTecnico: string,
  numeroDeRegistrodeProductos: number,
  fechaExpedicion: string,
  fechaVencimiento: string,
  nombreComercial: string
}