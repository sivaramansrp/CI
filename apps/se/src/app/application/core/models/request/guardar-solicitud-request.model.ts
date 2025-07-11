export interface GuadarSolicitudRequest {
    id_solcitud: number | null;
    cve_regimen: string;
    cve_clasificacion_regimen: string;
    mercancia: Mercancia;
    productor: Productor;
    solicitante: Solicitante;
    representacion_federal: RepresentacionFederal;
}

export interface Mercancia {
    cve_fraccion_arancelaria: string;
    cve_subdivision: string;
    descripcion: string;
    cve_unidad_medida_tarifaria: string;
    cve_pais_origen: string;
    cve_pais_destino: string;
    cantidad_tarifaria: number;
    valor_factura_usd: string;
    precio_unitario: number;
    lote: string;
    fecha_salida: string;
    observaciones: string;
}

export interface Productor {
    tipo_persona: boolean;
    nombre: string;
    apellido_materno: string;
    apellido_paterno: string;
    razon_social: string;
    descripcion_ubicacion: string;
    rfc: string;
    pais: string;
}

export interface RepresentacionFederal {
    cve_entidad_federativa: string;
    cve_unidad_administrativa: string;
}

export interface Solicitante {
    rfc: string;
    nombre: string;
    es_persona_moral: boolean;
    certificado_serial_number: string
}
