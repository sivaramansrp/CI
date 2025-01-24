/**
 * Modelo para guardar los datos relacionados al usuario
 */
export interface PerfilUsuario {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    nombreCompleto: string;
    telefono: string;
    correoElectronico: string;
    idUsuario: number;
    tipoUsuario: string;
}