/** Modelo para almacenar la respuesta de las apis de catálogos */
export interface CatalogosResponse {
    codigo: string;
    mensaje: string;
    datos: ICatalogo[];
}

/**
 * Modelo para cada uno de los registros regresados por las diferentes APIs
 */
export interface ICatalogo {
    clave: string;
    descripcion: string;
}