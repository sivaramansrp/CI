export interface PrellenadoSolicitud {
    id_solicitud: number | null;
    cve_aduana: string;
    oficina_inspeccion_sanidad_agropecuaria: string;
    punto_inspeccion: string;
    clave_UCON: string | null;
    establecimiento_TIF: string | null;
    nombre_veterinario: string | null;
    numero_autorizacion: string;
    clave_regimen: string;
    mercancia: [
        {
            id_solicitud: null,
            id_mercancia_gob: null,
            numero_partida: 0,
            tipo_mercancia: string,
            descripcion_tipo_mercancia: string,
            tipo_requisito: 0,
            descripcion_tipo_requisito: string,
            requisitos: string,
            numero_certificado: number,
            cve_fraccion: string,
            descripcion_fracción_arancelaria: string,
            clave_nico: string,
            descripcion_nico: string,
            descripcion_mercancia: string,
            cantidad_umt: number,
            clave_unidad_medida: string,
            descripcion_umt: string,
            cantidad_umc: number,
            clave_unidad_comercial: string,
            descripcion_umc: string,
            id_especie: number,
            descripcion_especie: string,
            id_uso_mercancia_tipo_tramite: number,
            descripcion_uso: string,
            nombre_corto_pais_origen: string,
            nombre_pais_origen: string,
            nombre_corto_pais_procedencia: string,
            nombre_pais_procedencia: string,
            presentacion: string,
            descripcion_presentacion: string,
            cantidad_presentacion: number,
            id_tipo_presentacion: string,
            descripcion_tipo_presentacion: string,
            id_tipo_planta: string,
            descripcion_tipo_planta: string,
            id_planta_autorizada: string,
            descripcion_planta_autorizada: string | null,
            id_fraccion_gubernamental: number,
            cantidad_umc_con_comas: string,
            cantidad_umt_con_comas: string,
            descripcion_corta_mercancia: string,
            fraccion_arancelaria_corto: string,
            clave_paises_origen: string,
            clave_paises_procedencia: string,
            lista_detalle_mercancia: [
                {
                    id_detalle_mercancia: null,
                    id_mercancia_gob: null,
                    numero_lote_detalle: string,
                    color_pelaje_detalle: string,
                    edad_animal_detalle: string,
                    fase_desarrollo_detalle: string,
                    funcion_zootecnica_detalle: string,
                    nombre_mercancia_detalle: string,
                    numeroidentificacion_detalle: string,
                    raza_detalle: string,
                    id_sexo_detalle: string,
                    descripcion_sexo_detalle: string,
                    nombre_cientifico_detalle: string,
                    fecha_sacrificio: string,
                    fecha_elaboracion: string,
                    fecha_caducidad: string,
                    fecha_elaboracion_fin: string,
                    fecha_caducidad_fin: string,
                    fecha_sacrificio_fin: string,
                    fecha_sacrificio_str: string,
                    fecha_elaboracion_str: string,
                    fecha_caducidad_str: string,
                    fecha_elaboracion_str_fin: string,
                    fecha_caducidad_str_fin: string,
                    fecha_sacrificio_str_fin: string
                }
            ]
        }
    ]
}