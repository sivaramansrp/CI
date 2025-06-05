export interface ConsultaSocioNacional {
    /** Identificador único del socio nacional. */
    rfc: string;
    /** Nombre del socio nacional. */
    nombre: string;
    /** Apellido paterno del socio nacional. */
    apellidoPaterno: string;
    /** Apellido materno del socio nacional. */
    apellidoMaterno: string;
    /** Nacionalidad del socio nacional. */
    nacionalidad: string;
    /** Tipo de persona (física o moral) del socio nacional. */
    tipoPersona: string;
}