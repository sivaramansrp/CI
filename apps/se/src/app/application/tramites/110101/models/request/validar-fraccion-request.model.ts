/**
 * Modelo de request para fraccion arancelaria
 */
export interface FraccionValidarRequest {
    /** Clave de la fracción arancelaria */
    clave_fraccion_arancelaria: string;
    
    /** Tipo de fracción arancelaria */
    tipo_fraccion_arancelaria: string;
    
    /** Datos de la mercancía */
    mercancia: MercanciaRequest;
    
    /** Tratados seleccionados */
    tratados_seleccionados: TratadoSeleccionado[];
}

/**
 * Modelo para datos de mercancía
 */
export interface MercanciaRequest {
    /** ID descripción alterna UE */
    id_descripcion_alterna_ue: number;
    
    /** ID descripción alterna AELC */
    id_descripcion_alterna_aelc: number;
    
    /** ID descripción alterna SGP */
    id_descripcion_alterna_sgp: number;
    
    /** ID descripción alterna ACE */
    id_descripcion_alterna_ace: number;
    
    /** Indica si requiere juegos o surtidos */
    requiere_juegos_o_surtidos: boolean;
    
    /** Indica si el peso es requerido */
    peso_es_requerido: boolean;
    
    /** Indica si el volumen es requerido */
    volumen_es_requerido: boolean;
    
    /** Fracción NALADI */
    fraccion_naladi: string;
    
    /** Fracción NALADISA 93 */
    fraccion_naladisa93: string;
    
    /** Fracción NALADISA 96 */
    fraccion_naladisa96: string;
    
    /** Fracción NALADISA 02 */
    fraccion_naladisa02: string;
    
    /** Tipo de proceso de mercancía */
    tipo_proceso_mercancia: string;
    
    /** Valor transaccional FOB */
    valo_transaccional_fob: number;
    
    /** Costo neto AP */
    costo_neto_ap: number;
}

/**
 * Modelo para tratados seleccionados
 */
export interface TratadoSeleccionado {
    /** Clave del grupo de criterio */
    cve_grupo_criterio: string;
    
    /** ID del bloque comercial */
    id_bloque: number;
    
    /** Clave del tratado o acuerdo */
    cve_tratado_acuerdo: string;
    
    /** ID del tratado o acuerdo */
    id_tratado_acuerdo: number;
    
    /** Clave del país */
    cve_pais: string;
    
    /** ID descripción alterna fracción */
    id_desc_alterna_fraccion: number;
    
    /** ID tipo proceso mercancía */
    ide_tipo_proceso_mercancia: string;
}