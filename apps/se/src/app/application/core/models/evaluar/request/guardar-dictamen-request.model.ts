/**
 * Interfaz para el modelo de solicitud de guardar dictamen.
 * Contiene los campos necesarios para enviar la solicitud de dictamen.
 */
export interface GuardarDictamenRequest {
     /** ID de la acción a realizar */
    id_accion: string;
    /** Clave del usuario */
    cve_usuario: string;
    /** ID del sentido del dictamen */
    ide_sentido_dictamen: string;
    /** Justificación del dictamen */
    justificacion_dictamen: string;
}
