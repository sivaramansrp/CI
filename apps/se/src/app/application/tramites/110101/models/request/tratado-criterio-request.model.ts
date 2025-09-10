/**
 * Modelo de request para gestión de tratados y acuerdos
 */
export interface TratadoAcuerdoCriterioRequest {
    /** ID del tratado o acuerdo */
    id_tratado_acuerdo: number;
    
    /** Clave del país o bloque */
    clave_pais_bloque: string;
    
    /** Criterio del certificado */
    criterio_certificado: string;
    
    /** Indica si requiere juegos o surtidos */
    requiere_juegos_o_surtidos: boolean;
    
    /** Indica si es un bloque comercial */
    is_bloque: boolean;
    
    /** Lista de tratados agregados */
    tratados_agregados: TratadoAgregado[];
}

/**
 * Modelo para tratados agregados
 */
export interface TratadoAgregado {
    /** ID del criterio del tratado */
    id_criterio_tratado: number;
    
    /** Clave del grupo de criterio */
    cve_grupo_criterio: string;
    
    /** ID del bloque comercial */
    id_bloque: number;
    
    /** ID del tratado o acuerdo */
    id_tratado_acuerdo: number;
    
    /** Clave del país */
    cve_pais: string;
    
    /** Nombre del país */
    nombre_pais: string;
}