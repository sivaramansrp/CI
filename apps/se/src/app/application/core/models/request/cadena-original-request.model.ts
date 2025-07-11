export interface CadenaOriginalRequest {
    num_folio_tramite: string;
    boolean_extranjero: boolean;
    documento_requerido: DocumentoRequerido[];
    solicitante: Solicitante;
    cve_rol_capturista: string;
    cve_usuario_capturista: string;
    fecha_firma: Date;
}

export interface DocumentoRequerido {
    id_documento_seleccionado: number;
    hash_documento: string;
    sello_documento: string;
}

export interface Solicitante {
    rfc: string;
    nombre: string;
    es_persona_moral: boolean;
    certificado_serial_number: string;
}
