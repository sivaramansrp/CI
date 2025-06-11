/**
 * Modelo de respuesta para el folio de un trámite.
 * Este modelo define la estructura de la respuesta que se espera al generar un folio para un trámite.
 * * @property {string} code - Código de respuesta del servicio.
 * * @property {string} message - Mensaje de respuesta del servicio.
 * * @property {string} datos - Datos del trámite, que generalmente contiene el folio generado.
 */
export interface TramiteFolioResponse {
    code: string;
    message: string;
    datos: string;
}