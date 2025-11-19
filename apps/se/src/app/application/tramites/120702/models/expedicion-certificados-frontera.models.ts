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


/**
 * Representa la respuesta de una asignación de certificados en frontera.
 *
 * @property {number} idAsignacion - Identificador único de la asignación.
 * @property {number} idSolicitud - Identificador de la solicitud asociada.
 * @property {number | null} idMecanismoAsignacion - Identificador del mecanismo de asignación, si aplica.
 * @property {number | null} cantidadSolicitada - Cantidad solicitada en la asignación.
 * @property {number | null} cantidadAprobada - Cantidad aprobada en la asignación.
 * @property {number | null} impTotalAprobado - Importe total aprobado.
 * @property {number | null} impTotalExpedido - Importe total expedido.
 * @property {number} cantidadCancelada - Cantidad cancelada en la asignación.
 * @property {boolean} asignacionActiva - Indica si la asignación está activa.
 * @property {boolean} aprobada - Indica si la asignación fue aprobada.
 * @property {string} fechaInicioVigencia - Fecha de inicio de vigencia de la asignación.
 * @property {string | null} fechaFinVigenciaSolicitada - Fecha de fin de vigencia solicitada.
 * @property {string | null} fechaFinVigenciaAprobada - Fecha de fin de vigencia aprobada.
 * @property {number | null} ideTipoAsignacionDirecta - Identificador del tipo de asignación directa, si aplica.
 * @property {number | null} idAsignacionR - Identificador de la asignación relacionada, si aplica.
 * @property {number} numFolioAsignacion - Número de folio de la asignación.
 * @property {number | null} numFolioAsignacionTPL - Número de folio de asignación TPL, si aplica.
 * @property {string | null} fechaAutorizacion - Fecha de autorización de la asignación.
 * @property {number | null} impAntecedenteAsignacion - Importe antecedente de la asignación.
 * @property {number | null} idLicitacionPublica - Identificador de la licitación pública, si aplica.
 * @property {string | null} rfcParticipante - RFC del participante, si aplica.
 * @property {number | null} impCalculadoProrrata - Importe calculado por prorrata.
 * @property {string | null} areaVenta - Área de venta asociada.
 * @property {string | null} areaRefrigeracion - Área de refrigeración asociada.
 * @property {number | null} impAntecedenteEmpresa - Importe antecedente de la empresa.
 * @property {number | null} montoDisponible - Monto disponible para la asignación.
 * @property {number | null} montoExpedido - Monto expedido en la asignación.
 * @property {number} añoAutorizacion - Año de autorización de la asignación.
 * @property {Solicitud} solicitud - Información de la solicitud asociada.
 * @property {object | null} mecanismoAsignacion - Detalles del mecanismo de asignación, si aplica.
 * @property {object | null} asignacionOrigen - Detalles de la asignación de origen, si aplica.
 * @property {Participante} participante - Información del participante asociado.
 * @property {number | null} saldoMecanismo - Saldo del mecanismo de asignación.
 * @property {number | null} saldoMecanismoAsignado - Saldo asignado del mecanismo.
 * @property {number | null} saldoMecanismoExpedido - Saldo expedido del mecanismo.
 * @property {number | null} porcentajeParticipacion - Porcentaje de participación en la asignación.
 * @property {number | null} resultadoParcial - Resultado parcial de la asignación.
 * @property {string | null} fechaInicioVigenciaLicitacion - Fecha de inicio de vigencia de la licitación, si aplica.
 */
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

/**
 * Representa una solicitud para la expedición de certificados de frontera.
 *
 * @property modalidad - Modalidad de la solicitud (puede ser nulo).
 * @property booleanGenerico - Valor booleano genérico para la solicitud.
 * @property descripcionSistemasMedicion - Descripción de los sistemas de medición utilizados (puede ser nulo).
 * @property descripcionLugarEmbarque - Descripción del lugar de embarque (puede ser nulo).
 * @property numeroPermiso - Número de permiso asociado a la solicitud (puede ser nulo).
 * @property fechaOperacion - Fecha de la operación (puede ser nulo).
 * @property nomOficialAutorizado - Nombre del oficial autorizado (puede ser nulo).
 * @property notario - Nombre del notario (puede ser nulo).
 */
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

/**
 * Representa un participante en una licitación pública.
 *
 * @property {number | null} idLicitacionPublica - Identificador de la licitación pública asociada.
 * @property {string | null} rfcParticipante - RFC del participante.
 * @property {string | null} rfc - RFC adicional relacionado con el participante.
 * @property {number | null} montoAdjudicado - Monto adjudicado al participante.
 * @property {boolean} ganador - Indica si el participante fue el ganador de la licitación.
 * @property {string | null} tipoParticipante - Tipo de participante en la licitación.
 * @property {LicitacionPublica | null} licitacionPublica - Objeto que representa la licitación pública asociada.
 * @property {number | null} montoDisponible - Monto disponible para el participante.
 */
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

/**
 * Representa una licitación pública para la expedición de certificados de frontera.
 *
 * @property {number} idLicitacion - Identificador único de la licitación.
 * @property {number} anio - Año en que se realiza la licitación.
 * @property {number} cantidadMaxima - Cantidad máxima permitida en la licitación.
 * @property {string} fechaLimiteCalificacion - Fecha límite para la calificación de participantes.
 * @property {string} fechaConcurso - Fecha en que se realiza el concurso de la licitación.
 * @property {string} fechaInicioVigencia - Fecha de inicio de la vigencia de la licitación.
 * @property {string} fechaFinVigencia - Fecha de fin de la vigencia de la licitación.
 * @property {string} fundamento - Fundamento legal o normativo de la licitación.
 * @property {string} ideTipoConstancia - Identificador del tipo de constancia asociada.
 * @property {string} ideTipoLicitacion - Identificador del tipo de licitación.
 * @property {string} numeroLicitacion - Número asignado a la licitación.
 * @property {number} idMecanismoAsignacion - Identificador del mecanismo de asignación utilizado.
 */
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