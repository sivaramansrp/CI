/**
 * Modelo de request para generar la cadena original.
 */
export interface GenerarCadenaOrigRequest {
    /** Número de folio del trámite */
    num_folio_tramite: string | null;

    /** Indica si el solicitante es extranjero */
    boolean_extranjero: boolean;

    /** Lista de documentos requeridos */
    documento_requerido?: DocumentoRequeridoRequest[];

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
     /** ID del domicilio */
    id_domicilio: number;
    
    /** Nombre del solicitante */
    nombre: string;
    
    /** Apellido paterno */
    apellido_paterno: string;
    
    /** Apellido materno */
    apellido_materno: string;
    
    /** Razón social */
    razon_social: string;
    
    /** RFC del solicitante */
    rfc: string;
    
    /** CURP del solicitante */
    curp: string;
    
    /** Clave de usuario */
    cve_usuario: string;
    
    /** Descripción del giro */
    descripcion_giro: string;
    
    /** Número de identificación fiscal */
    numero_identificacion_fiscal: string;
    
    /** Número de seguridad social */
    nss: string;
    
    /** Correo electrónico */
    correo_electronico: string;
}
