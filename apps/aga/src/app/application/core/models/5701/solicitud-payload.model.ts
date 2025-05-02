export interface SolicitudPayload {
 id_solicitud: number;
 act_econo_preponderante: string;
 ambito: string;
 anio: number;
 avaluo_bien_cultural: string;
 clabe_bancaria: string;
 clave_pedimento: string;
 desc_sist_pesaje_medicion: string;
 estado: string;
 factor_conversion: string;
 fec_embarque: Date;
 fec_operacion: Date;
 fec_pago: Date;
 fec_revocacion: Date;
 fec_verificacion: Date;
 chk_sr_reg_vehiculos: string;
 bln_consolidacion_cargas: boolean;
 chk_toma_muestra: string;
 motivo: string;
 chk_danio_exposicion: string;
 fec_reporte_pruebas: Date;
 fec_fin: Date;
 fec_inicio: Date;
 justificacion_tecnica: string;
 metodo_separacion_contable: string;
 monto: number;
 num_autorizacion: string;
 num_certificado: string;
 num_certificado_internacional: string;
 num_constancia: string;
 num_cuenta_bancaria: string;
 num_expediente: string;
 num_licencia: string;
 patente_agente_adu: number;
 num_permiso: string;
 num_prog_dgcese: string;
 num_registro: string;
 num_registro_ambiental: string;
 num_registro_uma: string;
 num_reporte: string;
 num_sucursal_bancaria: string;
 nom_banco: string;
 nom_consul: string;
 nom_oficial_autorizado: string;
 num_certificados: string;
 num_copias: string;
 personal: string;
 preferencia_arancelaria: string;
 puntos_verificacion: string;
 tipo_regimen: string;
 c_region: string;
 region: string;
 tasa_ad_valorem: string;
 tipo_cambio: string;
 tipo_moneda: string;
 tipo_operacion: string;
 tratado: string;
 imp_valor_comercial: number;
 cve_aduana: string;
 ide_tipo_solicitud_pexim: string;
 cve_regimen: string;
 cve_clasificacion_regimen: string;
 ide_actividad_productiva: string;
 ide_tipo_caat: string;
 ide_tipo_prog_fom_exp: string;
 id_programa_autorizado_se: number;
 ide_tipo_transito: string;
 observaciones: string;
 id_dependencia_solicitante: number;
 descripcion: string;
 id_direccion_sol: number;
 desc_generica_1: string;
 descGenerica2: string;
 descGenerica3: string;
 ide_generica_1: string;
 ideGenerica2: string;
 ideGenerica3: string;
 cve_tipo_empresa_recif: string;
 id_actividad_economica_sat: number;
 bln_empresa_mismo_grupo: number;
 plazo: string;
 bln_reg_automatizado: number;
 bln_immex: number;
 periodo_dictaminacion: number;
 desc_clob_generica_1: string;
 descClobGenerica2: string;
 cve_pais: string;
 id_asignacion: number;
 bln_empresa_controladora: number;
 fec_propuesta_visita: Date;
 bln_merc_forma_parte_patrim: number;
 id_act_prod_prosec_se: number;
 cve_ucon: string;
 cve_pais_importador: string;
 nom_establecimiento_operacion: string;
 nom_establecimiento_tif: string;
 bln_excento_pago: number;
 fec_arribo: Date;
 fec_inspeccion: Date;
 fec_ini_permanencia_extranjero: Date;
 fec_fin_permanencia_extranjero: Date;
 bln_guardia_custodia: boolean;
 desc_lugar_embarque: string;
 desc_locacion: string;
 num_permiso_cnsns: string;
 num_programa_immex: string;
 cve_oisa: string;
 cve_permiso_sedena: string;
 desc_punto_ingreso: string;
 ide_tipo_movimiento_gob: string;
 fec_tramite_semarnat: Date;
 bln_prioridad_solicitud: number;
 ide_actividad_en_destino: string;
 id_tipo_producto_ttra: number;
 bln_informacion_confidencial: boolean;
 bln_productor_extranjero: number;
 num_establecimiento: string;
 coordenadas_geograficas: string;
 bln_franja_region_fronteriza: number;
 id_tipo_mod_programa_se: number;
 id_descripcion_prod: number;
 capacidad_almacenamiento: number;
 id_clasif_residuo_ttra: number;
 bln_req_inspec_inmd: number;
 num_carro_ferrocarril: string;
 id_lugar_inspeccion: number;
 desc_guia_ruta: string;
 num_total_carros: number;
 total_guias: string;
 id_empresa_gob: number;
 id_norma_oficial: number;
 ide_medio_transporte_gob: string;
 cantidad_bienes: number;
 bln_generico_1: boolean;
 ide_tipo_certificacion_nom: string;
 id_periodo_cafetalero: number;
 id_clasif_cafe: number;
 cve_catalogo: string;
 id_combinacion_sg: number;
 id_fraccion_gob: number;
 bln_modificacion: boolean;
 bln_prorroga: boolean;
 bln_cisen: boolean;
 bln_solic_ferroviarios: number;
 id_folio_externo: number;
 info_adicional: string;
 cve_tipo_contenedor: string;
 folio_importacion_temporal: string;
 datos_tramite: DatosTramite;
}

export interface DatosTramite {
 listTransporteDespacho: TransporteDespacho[];
 listUnidadArribo: UnidadArribo[];
 personaResponsable: ListPersonaNoti[];
 importador_exportador: ImportadorExportador;
 tipo_servicio: TipoServicio;
 despacho: Despacho;
 pedimentos: Pedimento[];
 mercancias: Mercancias;
 transporte_despacho: TransporteDespacho;
 unidad_arribo: UnidadArribo;
 list_transporte_despacho: TransporteDespacho[];
 list_unidad_arribo: UnidadArribo[];
 persona_responsable: ListPersonaNoti[];
 list_fechas_sevex: ListFechasSevex[];
 list_persona_noti: ListPersonaNoti[];
 lista_pagos: ListaPago[];
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
 fecha_inicio: Date;
 hora_inicio: string;
 fecha_final: Date;
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
 id_pago: number;
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
 fecha_edo_ws_pedimento: Date;
 estado_pedimento: number;
 sub_estado_pedimento: number;
 bln_valido_pedimento: boolean;
}

export interface TipoServicio {
 id_tipo_servicio: number;
 id_solicitud: number;
 bln_activo: boolean;
 cve_tipo_servicio: number;
 desc_tipo_servicio: string;
 numero_svex: string;
 rni: number;
 fecha_inicio_servicio: Date;
 fecha_fin_servicio: Date;
 hora_inicio_servicio: string;
 hora_fin_servicio: string;
 patente: number;
 id_patentes_aduanales: number;
}
