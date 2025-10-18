/**
 * Constantes de endpoints y claves para el trámite 230301.
 * Provee descripciones JSDoc para mejorar autocompletado y generación de documentación.
 *
 * Notas:
 * - Muchas constantes contienen placeholders como '{tramite}', '{rfc}', '{idSolicitud}', etc.
 *   Estos deben reemplazarse en tiempo de ejecución antes de invocar las rutas reales.
 */

export const TRAMITE = '{tramite}';

export const API_POST_SOLICITUD = 'sat-t230301/solicitud/guardar';

export const CVE_CAPITULO_FRACCION = '{cveCapituloFraccion}';

export const CVE_PARTIDA_FRACCION = '{cvePartidaFraccion}';

export const CVE_SUBPARTIDA_FRACCION = '{cveSubpartidaFraccion}';

export const RFC = '{rfc}';

export const API_GET_FRACCIONES_ARANCELARIAS =
  'sat-t230301/catalogo/' +
  `capitulo-fraccion/${CVE_CAPITULO_FRACCION}/partida-fraccion/${CVE_PARTIDA_FRACCION}/subpartida-fraccion/${CVE_SUBPARTIDA_FRACCION}/fraccion-arancelaria`;

export const API_GET_CAPITULO_FRACCION =
  'sat-t230301/catalogo/capitulo-fraccion';

export const API_GET_PARTIDAS_FRACCION = `sat-t230301/catalogo/capitulo-fraccion/${CVE_CAPITULO_FRACCION}/partida-fraccion`;

export const API_GET_SUBPARTIDAS_FRACCION = `sat-t230301/catalogo/capitulo-fraccion/${CVE_CAPITULO_FRACCION}/partida-fraccion/${CVE_PARTIDA_FRACCION}/subpartida-fraccion`;

export const API_GET_UNIDAD_MEDIDA = `sat-t230301/catalogo/unidades-medida-comercial`;

export const GET_ADUANAS = `sat-t230301/catalogo/aduanas`;

export const API_GET_IMMEX = `sat-t230301/catalogo/rfc/${RFC}/no-autorizacion-immex`;

export const API_POST_GUARDAR_SOLICITUD = 'sat-t230301/solicitud/guardar';

export const API_GET_INICIO = 'sat-t230301/solicitud/iniciar';

export const IDSOLICITUD = '{idSolicitud}';

export const API_POST_CADENA_ORIGINAL = `sat-t230301/solicitud/${IDSOLICITUD}/genera-cadena-original`;

export const API_POST_FIRMA = `sat-t230301/solicitud/${IDSOLICITUD}/firmar`;

export const API_GET_CERTIFICADO_ANTIGUEDAD = `sat-t230301/certificado/antiguedad-maxima`;

export const CVEFRACCION = '{cveFraccion}';

export const API_GET_MOLINOS_ACERO_HABILITAR = `sat-t230301/fraccion-arancelaria/${CVEFRACCION}/molinos-acero/habilitar`;

export const API_GET_MOLINO_ACTIVOS = `sat-t230301/catalogo/molinos-acero`;

export const NUMFOLIOTRAMITE = '{numFolioTramite}';

export const API_GET_EVALUAR_INICIAR = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/evaluar/iniciar`;

export const API_POST_OPCIONES_EVALUACION = `sat-t230301/evaluar/opciones-evaluacion-capturista`;

export const API_GET_EVALUAR_MOSTRAR = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/evaluar/mostrar`;

export const API_GET_INICAR_DICTAMEN = `sat-t230301/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/iniciar`;

export const IDSOLICITUDDICTAMEN = '{idSolicitudDictamen}';

export const API_GET_DICTAMEN_CRITERIOS = `sat-t${TRAMITE}/solicitud/${IDSOLICITUDDICTAMEN}/dictamen/generar/criterios`;

export const API_POST_GUARDAR_DICTAMEN = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/guardar`;

export const API_GET_TABS = `sat-t${TRAMITE}/tramite/solicitud/${IDSOLICITUD}/estado`;

export const API_GET_SOLICITUD_DOCUMENTOS = `sat-t${TRAMITE}/solicitud/${IDSOLICITUD}/documentos`;

export const API_GET_TAREAS_DOCUMENTOS = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/bitacora`;

export const API_GET_ACUSES_RESOLUCION = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/funcionario/acuses-resoluciones`;

export const API_GET_CONSULTA_SOLICITUD = `sat-t230301/tramite/${NUMFOLIOTRAMITE}/solicitud/detalle`;

export const API_GET_REQUERIMIENTOS = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/requerimientos`;

export const API_GET_DICTAMENES = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamenes`;

export const API_GET_INICIAR_CONFIRMACION_NOTIFICACION = `sat-t230301/tramite/${NUMFOLIOTRAMITE}/confirmar-notificacion/iniciar`;

export const IDRESOLUCION = '{idResolucion}';

export const API_POST_RESOLUCION_GUARDAR = `sat-t${TRAMITE}/confirmar-notificacion/resolucion/${IDRESOLUCION}/acuse/guardar`;

export const IDREQUERIMIENTO = '{idRequerimiento}';

export const API_POST_REQUERIMIENTO_GUARDAR = `sat-t${TRAMITE}/confirmar-notificacion/requerimiento/${IDREQUERIMIENTO}/acuse/guardar`;

export const API_GET_ENVIO_DIGITAL = `tramite/${NUMFOLIOTRAMITE}/envio-digital/detalle`;

export const API_GET_OPINION = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/opiniones`;

export const API_POST_INICIAR_REQUERIMIENTO = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/requerimiento/iniciar`;

export const API_POST_GUARDAR_REQUERIMIENTO = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/requerimiento/generar/guardar`;

export const API_GET_SENTIDOS_DISPONIBLES = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/generar/sentidos-disponibles`;

export const API_POST_MOSTRAR_FIRMAR = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/mostrar-firmar`;

export const API_POST_FIRMAR_DICTAMEN = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/firmar`;
