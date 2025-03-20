export interface LISTAPASOWIZARD {
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
export interface ACCIONBOTON {
  /** Action to be performed */
  accion: string;
  /** Value associated with the action */
  valor: number;
}

export interface DatosPasos {
  txtBtnSig: string;
  txtBtnAnt: string;
  indice: number;
  nroPasos: number;
}

export interface FormularioGrupo {
  datosRealizer: DatosRealizer,
  combinacionRequerida: CombinacionRequerida,
  transporte: Transporte,
  pagoDerechos: PagoDerechos,
}

export interface DatosRealizer {
  certificadoTipo: string,
  aduanaEmbarque: string,
  numeroContenedor: string,
  parisOrigen: string,
  entidadFederativaOrigen: string,
  municipoOrigen: string,
  paisDestino: string,
}

export interface CombinacionRequerida {
  especie: string,
  paisDeDestino: string,
  instalacionAcuicola: string
}

export interface Transporte {
  medioTransporte: string,
  identificacionMedioTransporte: string,
  numeroDeContenedor: string,
  denodenominacionRazonSocial: string,
  numeroFlejes: string,
}

export interface PagoDerechos {
  claveReferencia: string,
  cadenaDependencia: string,
  banco: string,
  llavePago: string,
  fechaPago: string,
  importePago: string,
}

export interface ColumnasTabla {
  noPartida: string,
  fraccionArancelaria: string,
  descripcionFrccion: string,
  descripcion: string,
  undidadUmt: string,
  cantidadUmt: string,
  unidadUmc: string,
  cantidadUmc: string,
  tipoMercancia: string,
  uso: string,
  nombreCientifico: string,
  nombreComun: string,
  faseDesarrollo: string,
  presentacion: string,
  paisProcedencia: string,
}