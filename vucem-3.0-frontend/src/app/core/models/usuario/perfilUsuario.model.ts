/**
 * Modelo para guardar los datos relacionados al usuario
 */
export interface PerfilUsuario {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombreCompleto: string;
    rfc: string;
    correoElectronico: string;
    tipoPersona: string
}