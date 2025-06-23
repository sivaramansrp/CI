
/**
 * Representa una fila de la tabla de registro de solicitudes.
 *
 * @property pais - El país relacionado con la solicitud.
 * @property tratado - El tratado asociado a la solicitud.
 * @property origen - El origen de la solicitud.
 */
export interface RegistroDeSolicitudesTabla {
    pais: string;
    tratado: string;
    origen: string;
}