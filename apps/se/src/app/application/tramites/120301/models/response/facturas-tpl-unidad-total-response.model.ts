/**
 * Modelo para métricas de cantidad/total/unidad
 */
export interface FacturaTotalUnidadResponse {
    /** Cantidad numérica del ítem */
    cantidad: number;
    
    /** Valor total acumulado */
    total: number;
    
    /** Unidad de medida (kg, lt, etc) */
    unidad_label: string;
}