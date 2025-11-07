/**
 * Devuelve la ruta para obtener el tipo de operación de un trámite específico para un RFC dado.
 * @param tramite - El identificador del trámite.
 * @param rfc - El RFC para el cual se desea obtener el tipo de operación.
 * @returns La ruta de la API como una cadena de texto.
 */
export const API_GET_TIPO_OPERACION = (tramite: string, rfc: string): string =>
  `sat-t${tramite}/solicitud/rfc/${rfc}/tipo-operacion`;


/**
 * @description
 * Devuelve la ruta para obtener las personas asociadas a un trámite específico y RFC dado.
 * @param tramite - El identificador del trámite.
 * @param rfc - El RFC para el cual se desea obtener las personas.
 * @returns La ruta de la API como una cadena de texto.
 */
export const API_GET_PERSONAS = (tramite: string, rfc: string): string =>
  `sat-t${tramite}/solicitud/rfc/${rfc}/personas-oir-recibir-notificaciones`;
