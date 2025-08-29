/**
 * Tramite que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el tramite correspondiente.
 */
export const TRAMITE = '{tramite}';

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
 * API para obtener evaluar iniciar tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Evaluar-Solicitud/getOpcionesEvaluacion
 */
export const API_GET_EVALUAR_INICIAR = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/evaluar/iniciar`;

/**
 * API para obtener las opciones de evaluación del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Evaluar-Solicitud/opciones-evaluacion
 */
export const API_POST_OPCIONES_EVALUACION = `sat-t130118/evaluar/opciones-evaluacion-capturista`;

/**
 * API para prepar evaluacion tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Evaluar-Solicitud/getOpcionesEvaluacion
 */
export const API_GET_EVALUAR_MOSTRAR = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/evaluar/mostrar`;

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
export const API_GET_DICTAMEN_CRITERIOS = `sat-t${TRAMITE}/solicitud/${IDSOLICITUDDICTAMEN}/dictamen/generar/criterios`;

/**
 * API para guardar el dictamen del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/generar-dictamen-by-numFolioTramite
 */
export const API_POST_GUARDAR_DICTAMEN = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/guardar`;

/**
 * API para Consultar que tabs mostrar 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitud/estado-consulta-solicitud
 */
export const API_GET_TABS = `sat-t${TRAMITE}/tramite/solicitud/${IDSOLICITUD}/estado`;

/**
 * API para Consultar documentos de solicitud del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/consulta-documentos-solicitud
 */
export const API_GET_SOLICITUD_DOCUMENTOS = `sat-t${TRAMITE}/solicitud/${IDSOLICITUD}/documentos`;

/**
 * API para Consultar tareas de solicitud del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/get-tareas-tramite 
 */
export const API_GET_TAREAS_DOCUMENTOS = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/bitacora`;

/**
 * API para Consultar acuses de resolución del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Acuse/consulta-acuse-resoluciones-funcionario
 */
export const API_GET_ACUSES_RESOLUCION = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/funcionario/acuses-resoluciones`;

/**
 * API para Consultar solicitud del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes
 */
export const API_GET_CONSULTA_SOLICITUD = `sat-t130118/tramite/${NUMFOLIOTRAMITE}/solicitud/detalle`;

/**
 * API para Consultar requerimientos del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/get-requerimientos-by-numFolioTramite
 */
export const API_GET_REQUERIMIENTOS = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/requerimientos`;

/**
 * API para Consultar dictamenes del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/consultar-dictamenes-by-numFolioTramite
 */
export const API_GET_DICTAMENES = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamenes`;

/** 
 * API para iniciar la confirmación de notificación del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Confirmar-Notificacion/iniciar-confirmacion-notificacion
 */
export const API_GET_INICIAR_CONFIRMACION_NOTIFICACION = `sat-t130118/tramite/${NUMFOLIOTRAMITE}/confirmar-notificacion/iniciar`;

/**
 * ID de la resolucion.
 * Este valor debe ser reemplazado por el ID real de la resolucion.
 */
export const IDRESOLUCION= '{idResolucion}';

/** 
 * API para obtener documento de resolucion 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/guardar-dictamen-generado-by-numFolioTramite
 */
export const API_POST_RESOLUCION_GUARDAR = `sat-t${TRAMITE}/confirmar-notificacion/resolucion/${IDRESOLUCION}/acuse/guardar`;

/**
 * ID del requerimiento.
 * Este valor debe ser reemplazado por el ID real del requerimiento.
 */
export const IDREQUERIMIENTO= '{idRequerimiento}';
/** 
 * API para obtener documento de resolucion 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/guardar-dictamen-generado-by-numFolioTramite
 */
export const API_POST_REQUERIMIENTO_GUARDAR = `sat-t${TRAMITE}/confirmar-notificacion/requerimiento/${IDREQUERIMIENTO}/acuse/guardar`;

/** 
 * API para consulta de envio digital 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitud/get-detalle-estado
 */
export const API_GET_ENVIO_DIGITAL = `tramite/${NUMFOLIOTRAMITE}/envio-digital/detalle`;

/** 
 * API para detalle de la opinion tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitud/consulta-detalle%20opninion
 */
export const API_GET_OPINION = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/opiniones`

/**
 * API para iniciar requerimiento trámite 130118
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Requerimiento/iniciar-generar-requerimiento
 */
export const API_POST_INICIAR_REQUERIMIENTO = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/requerimiento/iniciar`;

/**
 * API para guardar el requerimiento del trámite 130118
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Requerimiento/guardar-requerimiento
 */
export const API_POST_GUARDAR_REQUERIMIENTO = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/requerimiento/generar/guardar`;

/**
 * API para guardar el requerimiento del trámite 130118
 * @see https://api-v30.cloud-ultrasist.net/api/tramite-flujo/swagger-ui/index.html#/Generar-Requerimiento/mostrar-firma
 */
export const API_POST_GUARDAR_REQUERIMIENTO_MOSTRAR_FIRMA = `tramite/${NUMFOLIOTRAMITE}/requerimiento/generar/mostrar-firmar`;

/**
 * API para consultar los sentidos disponibles
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-sentidos-disponibles
 */
export const API_GET_SENTIDOS_DISPONIBLES = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/generar/sentidos-disponibles`;

/**
 * API para mostrar y firmar el dictamen
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/mostra-firmar-dictamen
 */
export const API_POST_MOSTRAR_FIRMAR = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/mostrar-firmar`;

/**
 * API firmar
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Requerimiento/firmar_1
 */
export const API_POST_FIRMAR_DICTAMEN = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/firmar`;
