/**
 * Modelo para la consulta de socios accionistas.
 * Este modelo define la estructura de los datos que se obtienen al consultar
 */
export interface ConsultaSocioAccionista {
    /** Identificador único del socio accionista. */
    rfc: string;
    /** Razón social del socio o accionista. */
    razonSocial: string;
    /** Nombre del socio o accionista. */
    nombre: string;
    /** Apellido paterno del socio o accionista. */
    apellidoPaterno: string;
    /** Apellido materno del socio o accionista. */
    apellidoMaterno: string;
}