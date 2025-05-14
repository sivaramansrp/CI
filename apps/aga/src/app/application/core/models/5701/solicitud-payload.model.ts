import { TransporteAereo, TransporteCarretero, TransporteFerroviario, TransporteMaritimo, TransporteOtro, TransportePeatonal } from "@libs/shared/data-access-user/src";

export interface SolicitudPayload {
    id_solicitud: number | null;
    id_tipo_tramite: number;
    costo_total: string;
    rfc: string;
    representante_legal: RepresentanteLegal;
    datos_tramite: DatosTramite;
}

export interface RepresentanteLegal {
    rfc: string;
    telefono: string;
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
}

export interface DatosTramite {
    importador_exportador: ImportadorExportador;
    despacho: Despacho;
    pedimentos: Pedimento[];
    tipo_servicio: TipoServicio;
    lista_pagos: ListaPago[];
    mercancias: Mercancias;
    tipo_transporte_despacho: string;
    list_transporte_despacho?: TransporteFerroviario[] | TransporteCarretero[] | TransportePeatonal[] | TransporteOtro[];
    tipo_transporte_arribo: string;
    list_unidad_arribo?: TransporteCarretero[] | TransporteFerroviario[] | TransporteAereo[] | TransporteMaritimo[] | TransporteOtro[];
    persona_responsable?: PersonaResponsableDespacho[];
    list_fechas_sevex?: ListFechasSevex[];
    list_persona_noti?: ListPersonaNoti[];
}
export interface ImportadorExportador {
    rfc: string;
    nombre: string;
    industria_automotriz: boolean;
    desc_industrial_automotriz: string;
    programa_fomento: boolean;
    desc_programa_fomento: string;
    immex: boolean;
    desc_inmex: string;
    numero_registro: boolean;
    desc_numero_registro: string;
    certificacion_a: boolean;
    certificacion_aa: boolean;
    certificacion_aaa: boolean;
    socio_comercial: boolean;
    id_socio_comercial: string;
    oea: boolean;
    revision_origen: boolean;
}

export interface Despacho {
    aduana_despacho: string;
    id_seccion_despacho: number;
    bln_lda: boolean;
    rfc_despacho_lda: string;
    bln_dd: boolean;
    folio_ddex: string;
    tipo_despacho: string;
    nombre_recinto: string;
    domicilio: string;
    especifique: string;
    fecha_inicio: string;
    hora_inicio: string;
    fecha_final: string;
    hora_fin: string;
    tipo_operacion: string;
    encargo_conferido: boolean;
    relacion: boolean;
    bln_despacho: boolean;
}
export interface Pedimento {
    id_pedimento: number;
    patente: number;
    pedimento: string;
    aduana: string;
    tipo_pedimento: string;
    numeros: string;
    cove: string;
    estado_pedimento: number;
    sub_estado_pedimento: number;
    numero_pedimento: number;
    tipo_pedimento_por_evaluacion: string;
    bln_valido_pedimento: boolean;
    fecha_edo_ws_pedimento?: string;
    bln_activo?: boolean;
}
export interface TipoServicio {
    bln_activo: boolean;
    cve_tipo_servicio: number;
    desc_tipo_servicio: string;
    numero_svex: string;
    rni: number;
    fecha_inicio_servicio: string;
    fecha_fin_servicio: string;
    hora_inicio_servicio: string;
    hora_fin_servicio: string;
    patente: number;
    id_patentes_aduanales: number;
}
export interface ListaPago {
    linea_captura: string;
    monto: number;
    bln_activo: boolean;
    id_modulo: number;
    cve_modulo: string;
}
export interface Mercancias {
    pais_origen: string;
    descripcion_generica: string;
    justificacion: string;
    pais_procedencia: string;
}
export interface PersonaResponsableDespacho {
    gafete: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
}
export interface ListPersonaNoti {
    correo_electronico: string;
    nombreTercero: string;
}

export interface ListFechasSevex {
    fecha: Date;
    fecha_desc: Date;
    hora_inicio_svex: string;
    hora_final_svex: string;
    hora_inicio_rni: string;
    hora_fin_rni: string;
    fuera_horario: number;
    mismo_horario: number;
}








