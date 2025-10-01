/**
 * Modelo de request para generar la cadena original.
 */
export interface GenerarCadenaOrigRequest {
    /** Número de folio del trámite */
    num_folio_tramite: string;

    /** Indica si el solicitante es extranjero */
    boolean_extranjero: boolean;

    /** Lista de documentos requeridos */
    documento_requerido: DocumentoRequeridoRequest[];

    /** Datos del solicitante */
    solicitante: SolicitanteRequest;

    /** Rol del capturista */
    cve_rol_capturista: string;

    /** Usuario del capturista */
    cve_usuario_capturista: string;

    /** Fecha de firma del trámite */
    fecha_firma: string;
}

 /**
 * Modelo para documento requerido
 */
export interface DocumentoRequeridoRequest {
    /** ID del documento seleccionado */
    id_documento_seleccionado: string;
}

/**
 * Modelo para solicitante
 */
export interface SolicitanteRequest {
    /** RFC del solicitante */
    rfc: string;

    /** CURP del solicitante */
    curp: string;

    /** Nombre del solicitante */
    nombre: string;

    /** Apellido materno del solicitante */
    apellidoMaterno: string;

    /** Apellido paterno del solicitante */
    apellidoPaterno: string;

    /** Correo electrónico del solicitante */
    correoElectronico: string;

    /** Actividad económica preponderante del solicitante */
    actividadEconomicaPreponderante: string;
}
