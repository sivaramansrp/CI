/**
 * Modelo para la solicitud de guardado de permiso de importación con modificación temporal de mercancía.
 */
export interface GuardarSolicitudRequest {
    //Clave de la entidad federativa
    cve_entidad_federativa: string;
    //Descripción de la representación federal
    descripcion_representacion_federal: string;
    //Clave de clasificación del régimen
    clave_clasificacion_regimen: string;
    //Regimen
    regimen: Regimen;
    //Mercancia
    mercancia: Mercancia;
    //Productor
    productor: Productor;
    //Exportador
    exportador: Exportador;
    //Datos genéricos de la solicitud
    datos_genericos_solicitud: DatosGenericosSolicitud;
    //Clave de la unidad administrativa
    cve_unidad_administrativa: string;
    //RFC del representante legal
    rfc: string;
}

/**
 * Modelo para el régimen en la solicitud de guardado.
 */
export interface Regimen {
    /** Clave del régimen */
    cve_regimen: string;
}

/**
 * Modelo para la mercancía en la solicitud de guardado.
 */
export interface Mercancia {
    descripcion_temporal_modificacion_mercancia: string;
    marca: string;
    tipo_aduana: string;
    fraccion_arancelaria: string;
    subdivision: string;
    unidad_medida_tarifaria: string;
    unidad_medida_comercial: string;
    descripcion: string;
    cantidad_comercial: number;
    cantidad_tarifaria: number;
    precio_unitario: number;
    valor_total_factura: number;
    pais_destino_clave: string;
    pais_origen_clave: string;
    observaciones: string;
    numero_factura: string;
    fecha_factura: string;
    capacidad: number;
    moneda: string;
    valor_factura: number;
    valor_factura_usd: number;
    valor_total_factura_dolares: number;
}

/**
 * Modelo para el productor en la solicitud de guardado.
 */
export interface Productor {
    ide_tipo_persona_sol: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    razon_social: string;
    descripcion_ubicacion: string;
}

/**
 * Modelo para el exportador en la solicitud de guardado.
 */
export interface Exportador {
    ide_tipo_persona_sol: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    razon_social: string;
    descripcion_ubicacion: string;
}

/**
 * Modelo para los datos genéricos de la solicitud en la solicitud de guardado.
 */
export interface DatosGenericosSolicitud {
    descripcion_generica_1: string;
    fecha_generica_1: string;
    descripcion_generica_2: string;
    descripcion_generica_3: string;
    num_generico_1: number;
    num_generico_2: number;
    num_generico_3: number;
}

/**
 * Modelo para el representante legal en la solicitud de guardado.
 */
export interface RepresentanteLegal {
    nombre: string;
    ap_paterno: string;
    ap_materno: string;
    telefono: string;
}