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
    documentos: Documentos[];
    /** Lista de áreas y dependencias disponibles */
    areas_dependencias: AreasDependencia[];

    /** Alcances del requerimiento */
    alcances_requerimiento?: AreasDependencia[];
}

/** AreasDependencia */
export interface AreasDependencia {
    /** Descripción del área o dependencia */
    descripcion: string;
    /** Clave identificadora del área o dependencia */
    clave: string;
}

/** Documentos */
export interface Documentos {
    /** ID del documento solicitud */
    id_documento_solicitud: number;
    /** ID del documento */
    id_documento: number;
    /** Nombre del documento */
    nombre: string;
    /** ID del tipo de documento */
    id_tipo_documento: number;
    /** Tipo de documento */
    tipo_documento: string;
    /** Estado del documento solicitud */
    estado_documento_solicitud: string;
    /** Indica si es requerido */
    requerido: boolean;
    /** ID del documento requerimiento */
    id_documento_requerimiento: null;
    /** ID del e-document */
    id_e_document: string;
    /** UUID del documento */
    documento_uuid?: string;
}

