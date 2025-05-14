/**
 * Representa el formulario para el cambio de modalidad.
 */
export interface CambioDeModalidadForm {
    /**
     * Modalidad seleccionada.
     */
    seleccionaLaModalidad: string;

    /**
     * Folio asociado al trámite.
     */
    folio: number;

    /**
     * Año del trámite.
     */
    ano: number;

    /**
     * Modalidad seleccionada para el cambio.
     */
    seleccionaModalidad: string;

    /**
     * Modalidad a la que se desea cambiar.
     */
    cambioModalidad: string;
}

/**
 * Representa un cambio de modalidad.
 */
export interface CambioModalidad {
    /**
     * Identificador único del cambio de modalidad.
     */
    id: number;

    /**
     * Descripción del cambio de modalidad.
     */
    descripcion: string;
}

/**
 * Respuesta del servicio para obtener los cambios de modalidad.
 */
export interface CambioModalidadResponse {
    /**
     * Datos relacionados con los cambios de modalidad.
     */
    cambioModalidad: {
        /**
         * Lista de cambios de modalidad disponibles.
         */
        data: CambioModalidad[];
    };
}

export const CONFIGURACION_SERVICIO = [
    {
        encabezado: 'Descripción del servicio',
        clave: (ele: ServicioInfo): string | undefined => ele.descripcionDelServicio,
        orden: 1
    },
    {
        encabezado: 'Tipo de servicio',
        clave: (ele: ServicioInfo): string | undefined => ele.tipoDeServicio,
        orden: 2
    },
]

export interface ServicioInfo {
    descripcionDelServicio: string;
    tipoDeServicio: string;
    estatus: boolean;
}

export interface ConfiguracionColumna<T> {
    encabezado: string;
    clave: (ele: T) => string | number | undefined | boolean;
    orden: number;
}