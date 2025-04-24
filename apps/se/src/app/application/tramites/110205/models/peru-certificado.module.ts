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
 * Representa las columnas del histórico de productores.
 */
export interface HistoricoColumnas {
  id: number;
  nombreProductor: string;
  numeroRegistroFiscal: string;
  direccion: string;
  correoElectronico: string;
  telefono: string;
  fax: string;
}
/**
 * Representa los datos del productor exportador.
 */
export interface ProductorExportador {
  datos: HistoricoColumnas[];
}

/**
 * Representa los datos de la tabla de mercancías disponibles.
 */
export interface MercanciaTabla {
  fraccionArancelaria: string;
  nombreTecnico: string;
  nombreComercial: string;
  numeroRegistroProductos: string;
  fechaExpedicion: string;
  fechaVencimiento: string;
}
export interface MercanciasHistorico {
  datos: MercanciaTabla[];
}