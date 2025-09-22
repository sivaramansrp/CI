/**
 * Modelo de respuesta para validación de mercancía
 */
export interface FraccionValidarResponse {
    /** Descripción de la mercancía */
    descripcion: string;
    
    /** Indica si el peso es requerido */
    peso_requerido: boolean;
    
    /** Indica si el volumen es requerido */
    volumen_requerido: boolean;
    
    /** Detalles adicionales de la mercancía */
    mercancia: DetalleMercancia;
    
    /** Indica si hay errores en la validación */
    has_errors: boolean;
    
    /** Mensaje de error (null si no hay errores) */
    error_message: string | null;
    
    /** Indica si cumple con la acumulación */
    cumple_acumulacion: boolean;
}

/**
 * Modelo para detalles de mercancía
 */
export interface DetalleMercancia {
    /** Indica si el peso es requerido */
    peso_es_requerido: boolean;
    
    /** Indica si el volumen es requerido */
    volumen_es_requerido: boolean;
    
    /** Indica si el proceso es requerido */
    proceso_es_requerido: boolean;
    
    /** Indica si el peso textil es requerido */
    peso_textil_es_requerido: boolean;
    
    /** Descripción alterna modificada (null si no aplica) */
    descripcion_alterna_modificada: string | null;
    
    /** Procesos solicitados */
    procesos_solicitados: any[];
}