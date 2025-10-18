/**
 * Request para guardar una solicitud del trámite 230301.
 *
 * Contiene los datos del solicitante.
 */
export interface Solicitud230301Request {
  /**
   * Datos del solicitante que realiza la solicitud.
   */
    rfc: string;

  /**
   * Motivo del desistimiento
   * Campo libre para información adicional.
   */
  motivoDesistimiento: string;

  /**
   * Identificador de la solicitud anterior.
   */
  solicitudAnterior: number;

  /**
   * Folio del trámite anterior.
   */
  folioAnterior: string;
}
