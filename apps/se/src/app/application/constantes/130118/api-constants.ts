/**
 * API para guardar la solicitud del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/guardar
 */
export const API_POST_SOLICITUD = 'sat-t130118/solicitud/guardar';

/**
 * API para iniciar el tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/iniciar
 */
export const API_GET_INICIO = 'sat-t130118/solicitud/iniciar';

/**
 * ID de la solicitud que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el ID real de la solicitud.
 */
export const IDSOLICITUD = '{idSolicitud}';

/**
 * API para obtener el estado de la solicitud del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/genera-cadena-original_1
 */
export const API_POST_CADENA_ORIGINAL = `sat-t130118/solicitud/${IDSOLICITUD}/genera-cadena-original`;

/**
 * API para firmar la solicitud del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/firmar
 */
export const API_POST_FIRMA = `sat-t130118/solicitud/${IDSOLICITUD}/firmar`;