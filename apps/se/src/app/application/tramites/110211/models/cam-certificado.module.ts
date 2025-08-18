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


/**
 * @description
 * Representa la información de una mercancía en el trámite de certificado.
 * @property {string} fraccion - Fracción arancelaria de la mercancía.
 * @property {string} descripcionFraccion - Descripción de la fracción arancelaria.
 * @property {string} nico - Número de Identificación Comercial (NICO).
 * @property {string} descripcionNico - Descripción del NICO.
 * @property {number} cantidadSolicitadaUMT - Cantidad solicitada en la unidad de medida de tarifa.
 * @property {string} unidadMedidaTarifa - Unidad de medida utilizada en la tarifa.
 * @property {number} cantidadTotalUMT - Cantidad total en la unidad de medida de tarifa.
 * @property {number} saldoPendiente - Saldo pendiente de la mercancía.
 * @author Compodoc
 */
export interface Merchandise {
  fraccion: string;
  descripcionFraccion: string;
  nico: string;
  descripcionNico: string;
  cantidadSolicitadaUMT: number;
  unidadMedidaTarifa: string;
  cantidadTotalUMT: number;
  saldoPendiente: number;
}
