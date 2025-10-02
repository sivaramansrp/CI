/**
 * Modelo de response para criterios de tratados
 */
export interface EvaluarTratadosResponse {
    /** ID del criterio de tratado */
    id_criterio_tratado: number;
    
    /** ID de la solicitud */
    id_solicitud: number;
    
    /** Requisito específico */
    requisito_especifico: string;
    
    /** Calificación aprobada por sistema */
    cal_aprobada_sistema: string;
    
    /** Calificación aprobada por dictaminador */
    cal_aprobada_dictaminador: string;
    
    /** Criterio de origen */
    criterio_origen: string;
    
    /** Otras instancias aplicadas */
    otras_instancias: string;
    
    /** Nombre del país o bloque */
    pais_bloque_nombre: string;
    
    /** Nombre del tratado o acuerdo */
    tratado_acuerdo: string;
    
    /** Proceso de transformación (null si no aplica) */
    proceso_transformacion: string | null;
    
    /** Norma de origen */
    norma_origen: string;
    
    /** Indica si es tratado ALADI */
    es_tratado_aladi: boolean;
    
    /** Criterio de otras instancias */
    criterio_otras_instancias: string;
    
    /** ID del tratado o acuerdo */
    id_tratado_acuerdo: number;
    
    /** ID del bloque (null si no aplica) */
    id_bloque: number | null;
    
    /** Clave del país */
    cve_pais: string;
}