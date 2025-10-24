export interface GuardaSolicitud {
    id_solicitud: number | null,
    datos_solicitud: {
        cve_aduana: string,
        oficina_inspeccion_sanidad_agropecuaria: string,
        punto_inspeccion: string,
        clave_UCON: string,
        establecimiento_TIF: string,
        nombre_veterinario: string,
        numero_autorizacion: string,
        clave_regimen: string,
        mercancia: Mercancia[]
    },
    transporte: {
        coordenadas: string,
        ide_medio_transporte: string,
        identificacion_transporte: string,
        id_punto_verificacion: 0,
        razon_social: string
    },
    terceros: {
        terceros_exportador: [
            {
                tipo_persona_sol: string,
                persona_moral: true,
                nombre: string,
                apellido_paterno: string,
                apellido_materno: string,
                razon_social: string,
                pais: string,
                descripcion_ubicacion: string,
                lada: string,
                telefonos: string,
                correo: string
            }
        ],
        terceros_destinatario: [
            {
                tipo_persona_sol: string,
                persona_moral: true,
                num_establ_tif: string,
                nom_establ_tif: string,
                nombre: string,
                apellido_paterno: string,
                apellido_materno: string,
                razon_social: string,
                pais: string,
                codigo_postal: string,
                cve_entidad: string,
                cve_deleg_mun: string,
                cve_colonia: string,
                calle: string,
                num_exterior: string,
                num_interior: string,
                lada: string,
                telefonos: string,
                correo: string
            }
        ]
    },
    pago: {
        exento_pago: true,
        ide_motivo_exento_pago: string,
        cve_referencia_bancaria: string,
        cadena_pago_dependencia: string,
        cve_banco: string,
        llave_pago: string,
        fec_pago: string,
        imp_pago: number
    },
    solicitante: {
        rfc: string,
        nombre: string,
        es_persona_moral: true,
        certificado_serial_number: string
    },
    representacion_federal: {
        cve_entidad_federativa: "DGO",
        cve_unidad_administrativa: "1016"
    }
}

export interface ListaDetalleMercancia {
    numero_lote_detalle: string,
    color_pelaje_detalle: string,
    edad_animal_detalle: string,
    fase_desarrollo_detalle: string,
    funcion_zootecnica_detalle: string,
    nombre_mercancia_detalle: string,
    numeroidentificacion_detalle: string,
    raza_detalle: string,
    id_sexo_detalle: string,
    nombre_cientifico_detalle: string,
    fecha_sacrificio: string,
    fecha_elaboracion: string,
    fecha_caducidad: string,
    fecha_elaboracion_fin: string,
    fecha_caducidad_fin: string,
    fecha_sacrificio_fin: string
}

export interface Mercancia {
    tipo_mercancia: string,
    tipo_requisito: number,
    requisito: string,
    numero_certificado: number,
    cve_fraccion: string,
    id_fraccion_gubernamental: number,
    clave_nico: string,
    descripcion_mercancia: string,
    cantidad_umt: number,
    clave_unidad_medida: string,
    cantidad_umc: number,
    clave_unidad_comercial: string,
    id_especie: number,
    id_uso_mercancia_tipo_tramite: number,
    presentacion: string,
    cantidad_presentacion: number,
    id_tipo_presentacion: string,
    id_tipo_planta: string,
    id_planta_autorizada: string,
    clave_paises_origen: string,
    clave_paises_procedencia: string,
    lista_detalle_mercancia: ListaDetalleMercancia[]
}