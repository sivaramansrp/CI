export interface LicitacionesResponse {
    idSolicitud: number;
    fechaCreacion: string;
    fechaInicioTramite: string;
    fechaEstatus: string;
    fechaActualizacion: string;
    costo: number;
    estadoSolicitud: string;
    cveRolCapturista: string;
    cveUsuarioCapturista: string;
    idPersonaSolicitante: number;
    idPeticionWs: number;
    blnDepuracionDocProcesada: boolean;
    certificadoSerialNumber: string;
    idTipoTramite: number;
    cveUnidadAdministrativa: string;
    numeroFolioTramiteOriginal: string;
    esNuevo: boolean;
    certSerialNumber: string;
    certificado: string;
    idPersonaSolicitud: number;
    solicitante: string;
    clave: string;
    unidadAdministrativaRepresentacionFederal: string;
    numFolioTramite: string;
    tramite: string;
    representanteLegalCapturistaGubernamental: string;
    discriminatorValue: string;
    documentosRequeridos: string;
    listaDocumentos: string;
    programaEconomia: string;
    fraccionesAnexoDos: string;
    fraccionesAnexoTres: string;
    tipoEmpresaRECIF: string;
    actividadEconomica: string;
    actividadProductiva: string;
    actividadProductivaProsec: string;
    ambito: string;
    numeroPermiso: string;
    nomOficialAutorizado: string;
    actividadEconomicaPreponderante: string;
    empresaControladora: string;
    mercanciaPatrimonio: string;
    cveRegimen: string;
    regimen: string;
    empresaMismoGrupo: string;
    tipoRegimen: string;
    tipoSolicitudPexim: string;
    tipoCaat: string;
    programaAutorizadoEconomia: string;
    descripcionOtroTipoDePropietarioAeronave: string;
    tratado: string;
    importeValorComercial: number;
    fechaEmbarque: string;
    fechaArribo: string;
    fechaOperacion: string;
    idNormaOficial: number;
    normaAplicable: string;
    claveTipoCertificado: string;
    booleanGenerico: boolean;
    claveAduana: string;
    ideGenerica1: string;
    registroAutomatizado: boolean;
    ideGenerica2: string;
    ideGenerica3: string;
    descripcion: string;
    descripcionClobGenerica1: string;
    descripcionClobGenerica2: string;
    descripcionSistemasMedicion: string;
    booleanIMMEX: boolean;
    periodoDictaminacion: string;
    motivo: string;
    numAutorizacion: string;
    domicilio: string;
    denominacionExposicion: string;
    descripcionGenerica2: string;
    fechaIniExposicion: string;
    fechaFinExposicion: string;
    consolidacionCargas: string;
    tipoTransito: string;
    tipoProgFomExp: string;
    idAsignacion: number;
    observaciones: string;
    fechaPropuestaVisita: string;
    clavePais: string;
    tienePrioridad: boolean;
    numeroProgramaImmex: string;
    informacionConfidencial: string;
    clavePermisoSedena: string;
    numeroPermisoCNSNS: string;
    actividadEnDestino: string;
    locacion: string;
    idFraccionGob: number;
    idFolioExternoOriginal: string;
    descripcionEspecificaciones: string;
    coordenadasGeograficas: string;
    justificacionTecnica: string;
    numeroRegistro: string;
    plazo: string;
    descripcionLugarEmbarque: string;
    establecimientoTIF: string;
    capacidadAlmacenamiento: string;
    licitacionPublica: LicitacionPublica;
    asignacion: string;
    participante: Participante;
    montosCertificado: string;
    idLicitacion: number;
    montoTransferir: number;
    maximoTransferir: number;
    fechaEncabezado: string;
    participantesLicitacion: ParticipanteLicitacion[];
    fraccionArancelaria: string[];
    tipoTramite: TipoTramite;
    entidadFederativa: string;
    producto: string;
    unidadMedidaTarifaria: string;
    bloqueComercial: string;
    paises: string;
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

export interface Participante {
    idLicitacionPublica: number;
    rfcParticipante: string;
    rfc: string;
    montoAdjudicado: number;
    ganador: boolean;
    tipoParticipante: string;
    licitacionPublica: string;
    montoDisponible: number;
}

export interface ParticipanteLicitacion {
    rfc: string;
    montoDisponible: number;
}

export interface TipoTramite {
    vigencia: string;
    idTipoTramite: number;
    servicio: string;
    descripcionServicio: string;
    subservicio: string;
    descripcionSubservicio: string;
    modalidad: string;
    descripcionModalidad: string;
    flujo: string;
    descripcionFlujo: string;
    nivelServicio: string;
    nombreServicioAxway: string;
    nombreMensajeAxway: string;
    urlAxway: string;
    cveUnidadAdmResponsable: string;
    fechaCaptura: string;
    dependencia: string;
    declaraciones: string;
    documentos: string;
    nombre: string;
    blnReplicaInfo: boolean;
    blnAutomatico: boolean;
    claveModulo: number;
    requiereVerificacion: string;
    asignado: string;
    suplencia: string;
    nivelRol: string;
    listTipoTramite: [];
    descripcionCorta: string;
    context: string;
    actionSSO: string;
}

export interface LicitacionResponse {
    idAsignacion: number;
    numeroLicitacion: string;
    montoAdjudicado: number;
    fechaInicioVigencia: string;
    fechaFinVigenciaAprobada: string;
    nombreProducto: string;
    fechaConcurso: string;
}

export interface ParticipantesData {
    rfc: string;
    montoAdjudicado: number;
}

export interface JSONResponse {
  codigo: string;
  mensaje: string;
  datos: {
    licitaciones: Licitacion[];
  };
}

export interface Licitacion {
  idAsignacion: number;
  numeroLicitacion: string;
  montoAdjudicado: number;
  fechaInicioVigencia: string;
  fechaFinVigenciaAprobada: string;
  nombreProducto: string;
  fechaConcurso: string;
}

export interface JSONLicitacionesResponse {
  codigo: string;
  mensaje: string;
  datos: LicitacionesResponse;
}
