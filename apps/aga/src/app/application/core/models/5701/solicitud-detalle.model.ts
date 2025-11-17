/**
 * Modelo de datos para el importador/exportador.
 */
export interface ImportadorExportador {
  rfc: string;
  nombre: string;
  industria_automotriz: boolean;
  desc_industrial_automotriz: string | null;
  programa_fomento: boolean;
  desc_programa_fomento: string | null;
  immex: boolean;
  desc_inmex: string | null;
  numero_registro: boolean;
  desc_numero_registro: string | null;
  certificacion_a: boolean;
  certificacion_aa: boolean;
  certificacion_aaa: boolean;
  socio_comercial: boolean;
  id_socio_comercial: string;
  oea: boolean;
  revisionOrigen: boolean;
}

/**
 * Modelo de datos para el despacho.
 */
export interface Despacho {
  aduana_despacho: string;
  id_seccion_despacho: number;
  bln_lda: boolean | null;
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
  encargo_conferido: string | null;
  relacion: string | null;
  bln_despacho: boolean;
}

/**
 * Modelo de datos para la unidad de arribo.
 */
export interface UnidadArribo {
  tipo_transporte: string;
  mismos_datos_transporte: boolean;
}

/**
 * Modelo de datos para la mercancía.
 */
export interface Mercancia {
  pais_origen: string;
  descripcion_generica: string;
  justificacion: string;
  pais_procedencia: string;
}

/**
 * Modelo de datos para la solicitud.
 */
export interface SolicitudDetalleModel {
  tipo_servicio: string | null;
  patente: string | null;
  id_patentes_aduanales: number | null;
  rni: boolean | null;
  importador_exportador: ImportadorExportador | null;
  despacho: Despacho | null;
  tipo_transporte: string | null;
  unidad_arribo: UnidadArribo | null;
  mercancia: Mercancia | null;
}