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
  /**
 * Representa el modelo de datos para los montos a expedir.
 */
export interface Monto {
  /**
   * Monto que se va a expedir.
   */
  Montoaexpedir: string;
}


export interface AsignacionResponse {
  idAsignacion: number;
  idSolicitud: number;
  idMecanismoAsignacion: number | null;
  cantidadSolicitada: number | null;
  cantidadAprobada: number | null;
  impTotalAprobado: number | null;
  impTotalExpedido: number | null;
  cantidadCancelada: number;
  asignacionActiva: boolean;
  aprobada: boolean;
  fechaInicioVigencia: string;
  fechaFinVigenciaSolicitada: string | null;
  fechaFinVigenciaAprobada: string | null;
  ideTipoAsignacionDirecta: number | null;
  idAsignacionR: number | null;
  numFolioAsignacion: number;
  numFolioAsignacionTPL: number | null;
  fechaAutorizacion: string | null;
  impAntecedenteAsignacion: number | null;
  idLicitacionPublica: number | null;
  rfcParticipante: string | null;
  impCalculadoProrrata: number | null;
  areaVenta: string | null;
  areaRefrigeracion: string | null;
  impAntecedenteEmpresa: number | null;
  montoDisponible: number | null;
  montoExpedido: number | null;
  añoAutorizacion: number;

  solicitud: Solicitud;

  mecanismoAsignacion: object | null;
  asignacionOrigen: object | null;

  participante: Participante;

  saldoMecanismo: number | null;
  saldoMecanismoAsignado: number | null;
  saldoMecanismoExpedido: number | null;
  porcentajeParticipacion: number | null;
  resultadoParcial: number | null;
  fechaInicioVigenciaLicitacion: string | null;
}

export interface Solicitud {
  modalidad: string | null;
  booleanGenerico: boolean;
  descripcionSistemasMedicion: string | null;
  descripcionLugarEmbarque: string | null;
  numeroPermiso: string | null;
  fechaOperacion: string | null;
  nomOficialAutorizado: string | null;
  notario: string | null;
}

export interface Participante {
  idLicitacionPublica: number | null;
  rfcParticipante: string | null;
  rfc: string | null;
  montoAdjudicado: number | null;
  ganador: boolean;
  tipoParticipante: string | null;

  licitacionPublica: LicitacionPublica | null;

  montoDisponible: number | null;
}

export interface LicitacionPublica {
  idLicitacion: number;
  anio: number;
  cantidadMaxima: number;
  fechaLimiteCalificacion: string;
  fechaConcurso: string;
  fechaInicioVigencia: string;
  fechaFinVigencia: string;
  fundamento: string;
  ideTipoConstancia: string;
  ideTipoLicitacion: string;
  numeroLicitacion: string;
  idMecanismoAsignacion: number;
}