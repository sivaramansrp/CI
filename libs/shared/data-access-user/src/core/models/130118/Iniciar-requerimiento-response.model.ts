/** IniciarRequerimientoResponse */
export interface IniciarRequerimientoResponse {
    /** ID del requerimiento iniciado */
    id_requerimiento: number;
    /** Justificación del requerimiento */
    justificacion: string;
    /** Indica si contiene área específica */
    contiene_area: string;
    /** Indica si puede generar requerimiento de datos */
    puede_generar_requerimiento_datos: boolean;
    /** Indica si debe mostrar el campo de área */
    mostrar_contiene_area: boolean;
    /** Indica si requiere autorizador */
    requiere_autorizador: boolean;
    /** Indica si requiere documentos específicos */
    requiere_doc_especificos: boolean;
    /** Lista de documentos requeridos */
    documentos:[];
    /** Lista de áreas y dependencias disponibles */
    areas_dependencias: AreasDependencia[];
}

/** AreasDependencia */
export interface AreasDependencia {
    /** Descripción del área o dependencia */
    descripcion: string;
    /** Clave identificadora del área o dependencia */
    clave: string;
}
