/**
 * Constante para el número de folio del tramite.
 * Debe ser reemplazada por el número de folio real del tramite.
 */
export const NUMFOLIOTRAMITE = '{numFolioTramite}';

/**
 * API para generar la cadena original de confirmar notificación
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Confirmar-Notificacion/generar-cadena-original_1
 */
export const API_POST_CADENA_ORIGINAL = `sat-t130118/tramite/${NUMFOLIOTRAMITE}/confirmar-notificacion/genera-cadena-original`;

/**
 * API para firmar la confirmar notificación
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Confirmar-Notificacion/confirmar-notificacion
 */
export const API_POST_FIRMA = `sat-t130118/tramite/${NUMFOLIOTRAMITE}/confirmar-notificacion/firmar`;