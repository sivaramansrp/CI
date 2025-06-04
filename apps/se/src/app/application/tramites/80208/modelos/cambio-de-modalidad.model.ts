/**
 * @interface CambioDeModalidadForm
 * @description
 * Representa el formulario para el cambio de modalidad.
 *
 * @property {string} seleccionaLaModalidad - Modalidad seleccionada.
 * @property {number} folio - Número de folio.
 * @property {number} ano - Año del trámite.
 * @property {string} seleccionaModalidad - Modalidad seleccionada.
 * @property {string} cambioModalidad - Modalidad de cambio.
 */
export interface CambioDeModalidadForm {
    seleccionaLaModalidad: string;
    folio: number;
    ano: number;
    seleccionaModalidad: string;
    cambioModalidad: string;
}

/**
 * @interface CambioModalidad
 * @description
 * Representa una modalidad de cambio.
 *
 * @property {number} id - Identificador único de la modalidad.
 * @property {string} descripcion - Descripción de la modalidad.
 */
export interface CambioModalidad {
    id: number;
    descripcion: string;
}

/**
 * @interface CambioModalidadResponse
 * @description
 * Representa la respuesta de la API para las modalidades de cambio.
 *
 * @property {CambioModalidad[]} data - Lista de modalidades de cambio.
 */
export interface CambioModalidadResponse {
    cambioModalidad: {
        data: CambioModalidad[];
    };
}

/**
 * @const CONFIGURACION_SERVICIO
 * @description
 * Configuración de las columnas para la tabla de servicios.
 *
 * @property {string} encabezado - Título de la columna.
 * @property {function} clave - Función que devuelve el valor de la columna para cada fila.
 * @property {number} orden - Orden de la columna en la tabla.
 */
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

/**
 * @interface ServicioInfo
 * @description
 * Representa la información de un servicio.
 *
 * @property {string} descripcionDelServicio - Descripción del servicio.
 * @property {string} tipoDeServicio - Tipo de servicio (por ejemplo, tangible o intangible).
 * @property {boolean} estatus - Estado del servicio.
 */
export interface ServicioInfo {
    descripcionDelServicio: string;
    tipoDeServicio: string;
    estatus: boolean;
}

/**
 * @interface ConfiguracionColumna<T>
 * @description
 * Representa la configuración de una columna en una tabla.
 *
 * @property {string} encabezado - Título de la columna.
 * @property {function} clave - Función que devuelve el valor de la columna para cada fila.
 * @property {number} orden - Orden de la columna en la tabla.
 */
export interface ConfiguracionColumna<T> {
    encabezado: string; // Título de la columna
    clave: (ele: T) => string | number | undefined | boolean; // Función que devuelve el valor de la columna para cada fila
    orden: number; // Orden de la columna en la tabla
}

/**
 * @interface ServiciosState
 * @description
 * Representa el estado relacionado con los servicios en el cambio de modalidad.
 *
 * @property {CambioDeModalidadForm} combioDeModalidaDatos - Datos del formulario de cambio de modalidad.
 * @property {CambioModalidadResponse} cambioModalidad - Respuesta de la API con las modalidades de cambio.
 * @property {string} serviciosImmx - Información adicional de servicios IMMEX.
 */
export interface ServiciosState {
    combioDeModalidaDatos: CambioDeModalidadForm;
    cambioModalidad: CambioModalidadResponse;
    serviciosImmx: string;
}