export interface TramiteList {
  descripcion: string;
  id: number;
}

export interface RespuestaTramite {
  code: number;
  data: TramiteList[]
  message: string;
}

export interface Contenedores {
  tipo: string;
  id: string;
}

export interface RespuestaContenedor {
  success: boolean;
  datos: DatosDeLaTabla
  message: string;
}

export interface RespuestaContenedores {
  code: number;
  data: Contenedores[];
  message: string;
}

export interface DatosDeLaTabla {
  id: number;
  folioTramite: string;
  tipoTramite: string;
  rfc: string;
  razonSocial: string;
  estadoDelTramite: number;
}

export interface FormaRequerimiento {
  folioTramite: string;
  tipoTramite: string;
  motivoCancelacion: string;
  tipoDeRequerimiento: string;
}

export interface FolioTramite {
  /** Folio único del trámite. */
  folioTramite: string;

  /** Tipo de trámite realizado. */
  tipoTramite: string;
}

/**
 * Representa un requerimiento con su columna asociada y datos de fila.
 */
export interface Requerimiento {
  /**
   * Nombre o identificador de la columna (usado en visualización o estructura).
   */
  column: string;

  /**
   * Objeto que contiene los datos del requerimiento.
   */
  row: RequerimientoOpciones;
}

/**
 * Representa las opciones asociadas a un requerimiento específico.
 */
export interface RequerimientoOpciones {
  /**
   * Estado actual del trámite.
   */
  estadoDelTramite: number;

  /**
   * Folio único que identifica el trámite.
   */
  folioTramite: string;

  /**
   * Identificador único del requerimiento.
   */
  id: number;

  /**
   * Razón social de la entidad asociada al trámite.
   */
  razonSocial: string;

  /**
   * RFC de la entidad o persona relacionada con el trámite.
   */
  rfc: string;

  /**
   * Tipo de trámite que se está gestionando.
   */
  tipoTramite: string;
}