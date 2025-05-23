/**
 * @interface ListsPasoWizard
 * @description
 * Representa la información de un paso en el wizard del trámite.
 */
export interface ListsPasoWizard {
  /** Índice del paso */
  indice: number;
  /** Título del paso */
  titulo: string;
  /** Indica si el paso está activo */
  activo: boolean;
  /** Indica si el paso está completado */
  completado: boolean;
}

/**
 * @interface AccionBoton
 * @description
 * Representa un botón de acción en la interfaz.
 */
export interface AccionBoton {
  /** Acción que se debe realizar */
  accion: string;
  /** Valor asociado a la acción */
  valor: number;
}

/**
 * @interface DatosPasos
 * @description
 * Contiene la información de los botones y el estado de los pasos del wizard.
 */
export interface DatosPasos {
  /** Texto del botón siguiente */
  txtBtnSig: string;
  /** Texto del botón anterior */
  txtBtnAnt: string;
  /** Índice del paso actual */
  indice: number;
  /** Número total de pasos */
  nroPasos: number;
}

/**
 * @interface FormularioGrupo
 * @description
 * Agrupa los datos de los diferentes formularios del trámite.
 */
export interface FormularioGrupo {
  datosRealizar: DatosRealizar,
  combinacionRequerida: CombinacionRequerida,
  transporte: Transporte,
  pagoDerechos: PagoDerechos,
  datosRealizarValidada: boolean,
  combinacionRequeridaValidada: boolean,
  transporteValidada: boolean,
  pagoDerechosValidada: boolean,
}

/**
 * @interface DatosRealizar
 * @description
 * Datos requeridos para realizar el trámite.
 */
export interface DatosRealizar {
  certificadoTipo: string,
  aduanaEmbarque: string,
  numeroContenedor: string,
  parisOrigen: string,
  entidadFederativaOrigen: string,
  municipoOrigen: string,
  paisDestino: string,
}

/**
 * @interface CombinacionRequerida
 * @description
 * Información sobre la combinación requerida para el trámite.
 */
export interface CombinacionRequerida {
  especie: string,
  paisDeDestino: string,
  instalacionAcuicola: string
}

/**
 * @interface Transporte
 * @description
 * Información relacionada con el transporte de la mercancía.
 */
export interface Transporte {
  medioTransporte: string,
  identificacionMedioTransporte: string,
  numeroDeContenedor: string,
  denodenominacionRazonSocial: string,
  numeroFlejes: string,
}

/**
 * @interface PagoDerechos
 * @description
 * Información referente al pago de derechos del trámite.
 */
export interface PagoDerechos {
  claveReferencia: string,
  cadenaDependencia: string,
  banco: string,
  llavePago: string,
  fechaPago: string,
  importePago: string,
}

/**
 * @interface ColumnasTabla
 * @description
 * Define las columnas de la tabla de partidas arancelarias y mercancías.
 */
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