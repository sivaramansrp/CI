export interface CertificacionResponse {
    codigo: string;
    mensaje: string;
    datos: Certificacion;
}

export interface Certificacion {
    patente: string;
    id_patentes_aduanales: number;
    rfc_solicitante: string;
    tipo_patente: string;
}