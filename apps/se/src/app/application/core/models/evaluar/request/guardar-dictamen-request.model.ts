/**
 * Interfaz para el modelo de solicitud de guardar dictamen.
 * Contiene los campos necesarios para enviar la solicitud de dictamen.
 */
export interface GuardarDictamenRequest {
    /**
     * Identificador de la solicitud de dictamen.
     */
    ide_sentido_dictamen: string;

    /**
     * Identificador del trámite asociado al dictamen.
     */
    justificacion_dictamen: string;
}
