export interface SolicitudPayload {
    id_solicitud: number;
    datos_tramite: DatosTramite;
}

export interface DatosTramite {
    importador_exportador: ImportadorExportador;
    despacho: Despacho;
    pedimentos: Pedimento[];
    tipo_servicio: TipoServicio;
    lista_pagos: ListaPago[];
    mercancias: Mercancias;
    list_transporte_despacho?: TransporteDespacho[];
    list_unidad_arribo?: UnidadArribo[];
    persona_responsable?: ListPersonaNoti[];
    list_fechas_sevex?: ListFechasSevex[];
    list_persona_noti?: ListPersonaNoti[];
}

export interface Despacho {
    aduana_despacho: string;
    id_seccion_despacho: number;
    bln_lda: boolean;
    rfc_despacho: string;
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

export interface TransporteDespacho {
    tipo_transporte: string;
    emp_transportista: string;
    numero_porte: string;
    fecha_porte: Date;
    marca_transporte: string;
    modelo_transporte: string;
    placas_transporte: string;
    contenedor_transporte: string;
    observaciones: string;
    numero_bl: string;
    tipo_equipo: string;
    iniciales_equipo: string;
    numero_equipo: string;
    rfc_empresa: string;
    nombre_transportista: string;
    num_gafete: string;
    tipo_transporte_des: string;
    datos_transporte: string;
    descripcion_equipo: string;
}

export interface UnidadArribo {
    tipo_transporte: string;
    emp_transportista: string;
    numero_porte: string;
    fecha_porte: Date;
    marca_transporte: string;
    modelo_transporte: string;
    placas_transporte: string;
    contenedor_transporte: string;
    numero_bl: string;
    tipo_equipo: string;
    descripcion_equipo: string;
    iniciales_equipo: string;
    numero_equipo: string;
    arribo_pendiente_aereo: boolean;
    guia_master_aereo: string;
    guia_house_aereo: string;
    fecha_arribo_aereo: Date;
    hora_arribo_aereo: string;
    guia_valida: boolean;
    guia_house_valida: boolean;
    guia_master_valida: boolean;
    guia_bl_Maritimo: string;
    guia_house_maritimo: string;
    nombre_buque_maritimo: string;
    contenedor_maritimo: string;
    datos_transporte: string;
    observaciones: string;
    mismosDatosTransporte: boolean;
}

export interface ListFechasSevex {
    id_fecha: number;
    id_solicitud: number;
    fecha: Date;
    fecha_desc: Date;
    hora_inicio_svex: string;
    hora_final_svex: string;
    hora_inicio_rni: string;
    hora_fin_rni: string;
    fuera_horario: number;
    mismo_horario: number;
}

export interface ListPersonaNoti {
    id_persona: number;
    id_solicitud: number;
    gafete: string;
    correo_electronico: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
}

export interface ListaPago {
    id_pago?: number;
    id_solicitud: number;
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

export interface Pedimento {
    id_pedimento: number;
    id_solicitud: number;
    numero_pedimento: number;
    patente: number;
    pedimento: string;
    aduana: string;
    tipo_pedimento: string;
    numeros: string;
    cove: string;
    bln_activo: boolean;
    fecha_edo_ws_pedimento: string;
    estado_pedimento: number;
    sub_estado_pedimento: number;
    bln_valido_pedimento: boolean;
}

export interface TipoServicio {
    id_tipo_servicio?: number;
    id_solicitud: number;
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
