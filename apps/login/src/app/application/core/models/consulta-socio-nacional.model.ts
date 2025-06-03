export interface ConsultaSocioNacional {
    /** Identificador único del socio nacional. */
    rfc: string;
    /** Nombre del socio nacional. */
    nombre: string;
    /** Apellido paterno del socio nacional. */
    apellidoPaterno: string;
    /** Apellido materno del socio nacional. */
    apellidoMaterno: string;
    /** Fecha de nacimiento del socio nacional. */
    fechaNacimiento: Date;
    /** Nacionalidad del socio nacional. */
    nacionalidad: string;
    /** Tipo de persona (física o moral) del socio nacional. */
    tipoPersona: string;
}