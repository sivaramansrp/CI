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

/**
 * API para obtener el certificado de antigüedad máxima del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/certificado-antiguedad-maxima
 */
export const API_GET_CERTIFICADO_ANTIGUEDAD = `sat-t130118/certificado/antiguedad-maxima`;


/**
 * Constante para la clave de fracción arancelaria.
 * Debe ser reemplazada por la clave real de la fracción arancelaria.
 */
export const CVEFRACCION = '{cveFraccion}';

/**
 * API para obtener los molinos de acero habilitados.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/habilitar-molino-acero
 */ 
export const API_GET_MOLINOS_ACERO_HABILITAR = `sat-t130118/fraccion-arancelaria/${CVEFRACCION}/molinos-acero/habilitar`;

/**
 * API para obtener los molinos de acero activos.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-molinos-acero
 */
export const API_GET_MOLINO_ACTIVOS = `sat-t130118/catalogo/molinos-acero`;

/**
 * Constante para el número de folio del tramite.
 * Debe ser reemplazada por el número de folio real del tramite.
 */
export const NUMFOLIOTRAMITE = '{numFolioTramite}';

/**
 * API para obtener las opciones de evaluación del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Evaluar-Solicitud/opciones-evaluacion
 */
export const API_POST_OPCIONES_EVALUACION = `sat-t130118/tramite/${NUMFOLIOTRAMITE}/opciones-evaluacion`;


/**
 * API para iniciar el dictamen del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/generar-dictamen-by-numFolioTramite
 */
export const API_GET_INICAR_DICTAMEN = `sat-t130118/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/iniciar`;

/**
 * ID de la solicitud del dictamen que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el ID real de la solicitud del dictamen.
 */
export const IDSOLICITUDDICTAMEN = '{idSolicitudDictamen}';

/**
 * API para generar el dictamen del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/dictamen-criterios-by-idSolicitud
 */
export const API_GET_DICTAMEN = `sat-t130118/solicitud/${IDSOLICITUDDICTAMEN}/dictamen/generar/criterios`;

/**
 * API para guardar el dictamen del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/generar-dictamen-by-numFolioTramite
 */
export const API_POST_GUARDAR_DICTAMEN = `sat-t130118/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/guardar`;

/**
 * API para Consultar documentos de solicitud del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/consulta-documentos-solicitud
 */
export const API_GET_SOLICITUD_DOCUMENTOS = `sat-t130118/solicitud/${IDSOLICITUD}/documentos`;

/**
 * API para Consultar tareas de solicitud del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/get-tareas-tramite 
 */
export const API_GET_TAREAS_DOCUMENTOS = `sat-t130118/tramite/${NUMFOLIOTRAMITE}/bitacora`;