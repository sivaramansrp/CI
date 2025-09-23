import { ENVIRONMENT } from "../../enviroments/enviroment";
import { RFC_GENERICO } from "../constants/constantes-generales";

const BASE_URL = `${ENVIRONMENT.URL_SERVER}`;
const API_URL = '/auth/api';
/**
 * URLs de API comunes
 */
export const COMUN_URL = {
  BASE_URL: `${ENVIRONMENT.API_HOST}/api/`,
  API: '/api',
  API_VERSION: '/v3',
  CATALOGO_URL: '/catalogo',
  SOLICITUD_URL: '/solicitud',
  TRAMITE_URL: '/tramite',
};

export const ROUTE = {
  USER: {
    CREATE: `${BASE_URL}${COMUN_URL.API_VERSION}/user/create`,
    UPDATE: `${BASE_URL}${COMUN_URL.API_VERSION}/user/update`,
    DELETE: `${BASE_URL}${COMUN_URL.API_VERSION}/user/delete`,
  }
};

/**
 * Rutas de autenticación.
 */
export const AUTH_ROUTE = {
  LOGIN: `${BASE_URL}${API_URL}${COMUN_URL.API_VERSION}/auth/login/fiel`,
};

/**
 * Helper function para construir el endpoint de inicialización de trámites
 * @param procedureId - ID del procedimiento del trámite
 * @returns URL completa para el endpoint de inicialización
 */
export const CONSTRUIR_ENDPOINT_INICIAR = (procedureId: string): string => { return `${COMUN_URL.BASE_URL}sat-t${procedureId}/solicitud/iniciar` }



/**
 * API para recuperar el catálogo de aduanas
 * @see https://api-v30.cloud-ultrasist.net/api/catalogo/swagger-ui/index.html#/Aduana./consulta-cat%C3%A1logo-aduanas
 */
export const API_GET_ADUANA = 'catalogo/aduanas';
/**
 * La clave de la aduana por la que se filtrará la información.
 */
export const CLAVE_ADUANA_QUERY = '{claveAduana}';
/**
 * API para recuperar el catálogo de aduanas
 * @param CLAVE_ADUANA_QUERY La clave de la aduana seleccionada por el usuario
 * @see https://api-v30.cloud-ultrasist.net/api/catalogo/swagger-ui/index.html#/Aduana./consulta-cat%C3%A1logo-aduanas
 */
export const API_GET_SECCION_ADUANA = `catalogo/seccion-aduanas/${CLAVE_ADUANA_QUERY}`;
/**
 * La clave de la patente por la que se filtrará la información.
 */
export const CLAVE_PATENTE_QUERY = '{clavePatente}';
/**
 * API para recuperar los recintos inherentes de una aduana.
 * @param CLAVE_ADUANA_QUERY El clave de la aduana seleccionada por el usuario.
 * @see https://api-v30.cloud-ultrasist.net/api/patente/swagger-ui/index.html
 */
export const API_GET_RECINTO = `catalogo/recintos-fiscalizados/${CLAVE_ADUANA_QUERY}`;
/**
 * API para obtener el catálogo de tipo de equipo en el trasnporte ferroviario.
 * @see https://api-v30.cloud-ultrasist.net/api/catalogo/swagger-ui/index.html#/Tipos%20de%20equipo./consulta-tipos-equipo
 */
export const API_GET_TIPO_EQUIPO = 'catalogo/busca/tipo-equipo';
/**
 * Tipo de transporte [ferro, aereo]
 */
export const TIPO_TRANSPORTE = '{tipoTransporte}';
/**
 * API para validar el número BL de transporte ferroviario. y obtener los datos:
 * Tipo de equipo, Iniciales de equipo y Npumero de equipo.
 * @see https://api-v30.cloud-ultrasist.net/api/privado/swagger-ui/index.html#/Privado%20Validaciones/validaFerro
 */
export const API_CONSULTAR_VALIDACION = `privado/${TIPO_TRANSPORTE}/valida`;
/**
 * El RFC del solicitante y/o apoderado
 */
export const RFC_QUERY = '{rfc}';
/**
 * API que permite verificar si el RFC proporcionado es válido.
 * @param RFC_QUERY EL RFC
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t5701/swagger-ui/index.html#/RFC/valida-rfc
 */
export const API_GET_VALIDA_RFC = `sat-t5701/rfc/valida/${RFC_QUERY}`;

/**
 * API que obtiene la información del contribuyente por RFC.
 * @param RFC_QUERY El RFC del contribuyente
 */
export const API_GET_RFC_IDC = `idc/contribuyente/detalle/${RFC_QUERY}`;
/**
 * API que valida si un RFC (Registro Federal de Contribuyentes) está certificado para la revisión de origen.
 * * @param RFC_QUERY El RFC del contribuyente
 */
export const API_GET_RFC_ORIGEN = `certificacion/origen/valida/${RFC_QUERY}`;
/**
 * El tipo de trámite por el que se filtrará la información.
 */
export const TIPO_TRAMITE_QUERY = '{tipoTramite}';
/**
 * API para validar si un RFC tiene certificaciones vigentes.
 * @param TIPO_TRAMITE_QUERY El tipo de trámite
 * @param RFC_QUERY El RFC del solicitante
 * @see https://api-v30.cloud-ultrasist.net/api/catalogo/swagger-ui/index.html#/Certificaciones/valida-certificaciones
 */
export const API_GET_VALIDA_CERTIFICACIONES = `catalogo/valida-certificaciones/${TIPO_TRAMITE_QUERY}/${RFC_QUERY}`;
/**
 * La línea de pago por la que se filtrará la información.
 */
export const LINEA_PAGO_QUERY = '{lineaPago}';
/**
 * API para validar si una línea de pago es válida.
 * @param LINEA_PAGO_QUERY La línea de pago
 */
export const API_GET_VALIDA_LINEA_PAGO = `pago/sea/${LINEA_PAGO_QUERY}`;

/**
 * API para obtener el monto del trámite
 */
export const API_GET_PARAMETRO_MONTO = `sat-t5701/parametro/monto`;
/**
 * API para guardar la solicitud
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t5701/swagger-ui/index.html#/Solicitud/guardar
 */
export const API_POST_SOLICITUD = 'sat-t5701/guardar';

/**
 * ID del trámite a eliminar.
 * Este ID se debe reemplazar por el ID del trámite que se desea eliminar.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t5701/swagger-ui/index.html#/Tramite/elimina-tramite-pendiente-by-id
 */
export const ID_TRAMITE = '{idTramite}';

/**
 * API para eliminar un trámite pendiente.
 */
export const API_ELIMINAR_TRAMITE = `sat-t5701/tramite/pendiente/${ID_TRAMITE}`;

/**
 * Indica el número de trámite a consultar.
 */
export const TRAMITE = '{numeroTramite}';

/**
 * API  para obtener el catálogo de cdocumentos obligatorios, según el trámite.
 * @param TRAMITE el trámite seleccionado por el usuario.
 * @see https://api-v30.cloud-ultrasist.net/api/tramite/5701/documentos?especifico=false
 */
export const API_GET_DOCUMENTOS_OBLIGATORIOS = `sat-t{numeroTramite}/solicitud/documentos`;

/**
 * API para recuperar el catálogo de paises
 * @see https://api-v30.cloud-ultrasist.net/api/catalogo/swagger-ui/index.html#/Pa%C3%ADs/consulta-paises-activos
 */
export const API_GET_PAISES = 'catalogo/paises';

/**
 * API para generar la cadena original de un trámite.
 * @see https://api-v30.cloud-ultrasist.net/api/tramite-flujo/swagger-ui/index.html#/Cadena/generar
 */
export const API_GENERAR_CADENA_ORIGINAL =
  'api/tramite/solicitud/genera-cadena-original';

/**
 * API para enviar una firma electrónica.
 * @see https://api-v30.cloud-ultrasist.net/api/firma/swagger-ui/index.html#/Firma/firmar
 */
export const API_ENVIAR_FIRMA = 'api/tramite/firmar';

/**
 * API para recuperar las tareas por usuario.
 * @see https://api-v30.cloud-ultrasist.net/api/bandeja-tarea/swagger-ui/index.html#/Bandeja%20tarea/consultar-tareas-servicio
 */
export const API_GET_BANDEJATAREA = 'bandeja-tarea/usuario/tarea';

/**
 * API para recuperar el catálogo de regímenes aduaneros.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-regimenes
 */
export const API_GET_REGIMEN = `sat-t130118/catalogo/regimenes`;

/**
 * La clave del régimen aduanero por el que se filtrará la información.
 */
export const CLASIFICACION = '{cveRegimen}';

/**
 * API para recuperar la clasificación de un régimen aduanero.
 * @param CLASIFICACION La clave del régimen aduanero
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-clasificacion
 */
export const API_GET_REGIMENES_CLASIFICACION = `sat-t130118/catalogo/regimenes/${CLASIFICACION}/clasificacion`;

/**
 * API para recuperar el catálogo de países para el trámite T130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-paises
 */
export const API_GET_PAISES_SAT_T130118 = 'sat-t130118/catalogo/paises';

/**
 * API para recuperar el catálogo de entidades federativas.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-entidades-federativas
 */
export const API_GET_ENTIDADES_FEDERATIVAS = 'sat-t130118/catalogo/entidades-federativas';

/**
 * La clave de la entidad federativa por la que se filtrará la información.
 */
export const CVEENTIDAD = '{cveEntidad}';

/**
 * API para recuperar las unidades administrativas de una entidad federativa.
 * @param CVEENTIDAD La clave de la entidad federativa
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-unidades-administrativas
 */
export const API_GET_ENTIDADES_FEDERATIVAS_CLAVE = `sat-t130118/catalogo/entidad-federativa/${CVEENTIDAD}/unidades-administrativas`;

/**
 * API para recuperar el catálogo de fracciones arancelarias.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-fraccion-arancelaria
 */
export const API_GET_FRACCION_ARANCELARIA = 'sat-t130118/catalogo/fracciones-arancelarias';

/**
 * La clave de la fracción arancelaria por la que se filtrará la información.
 */
export const CVEFRACCION = '{cveFraccion}';

/**
 * API para recuperar el catálogo de fracciones arancelarias.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-unidades-medidas
 */
export const API_GET_FRACCION_ARANCELARIA_CVE = `sat-t130118/catalogo/fraccion-arancelaria/${CVEFRACCION}/unidades-medida`;

/**
 * API para recuperar el catálogo de subdivisiones y fracciones arancelarias.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-subdivisiones-fracciones-arancelarias
 */
export const API_GET_NICO = `sat-t130118/catalogo/fraccion-arancelaria/${CVEFRACCION}/subdiviciones`;

/**
 * ID de la solicitud que se utilizará en las rutas de la API.
 */
export const IDSOLICITUD = '{idSolicitud}';

/**
 * API para guardar el acuse de una solicitud.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/guardar-documento
 */
export const API_POST_GUARDAR_ACUSE = (IDSOLICITUD: string, PROCEDURE: number): string => `sat-t${PROCEDURE}/solicitud/${IDSOLICITUD}/acuse/guardar`;

/**
 * API para generar la vista previa del acuse de una solicitud.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/genera-documento
 */
export const API_POST_VISTA_PREVIA = (IDSOLICITUD: string, PROCEDURE: number): string => `sat-t${PROCEDURE}/solicitud/${IDSOLICITUD}/acuse/vista-previa`;

/**
 * API para obtener los documentos
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/consulta-documentos
 */
export const API_GET_DOCUMENTOS130118 = 'sat-t130118/solicitud/documentos';

/**
 * Ruta de la API para obtener la información del contribuyente IDC.
 * Utiliza el RFC genérico como parte de la URL.
 *
 * @see https://api-v30.cloud-ultrasist.net/api/idc/swagger-ui/index.html#/idc-ws-end-point-controller/informacionContribuyente
 */
export const API_GET_IDC_CONTRIBUYENTE = `idc/contribuyente/${RFC_GENERICO}/informacion`;

/**
 * Constante para el número de folio del tramite.
 * Debe ser reemplazada por el número de folio real del tramite.
 */
export const NUMFOLIOTRAMITE = '{numFolioTramite}';

/**
 * ID de la solicitud del dictamen que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el ID real de la solicitud del dictamen.
 */
export const IDSOLICITUDDICTAMEN = '{idSolicitudDictamen}';

/**
 * API para obtener las opciones de evaluación del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Evaluar-Solicitud/opciones-evaluacion
 */
export const API_POST_OPCIONES_EVALUACION = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/${NUMFOLIOTRAMITE}/evaluar/opciones-evaluacion`;

/**
 * API para generar el dictamen del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/dictamen-criterios-by-idSolicitud
 */
export const API_GET_DICTAMEN = `sat-t${TRAMITE}/solicitud/${IDSOLICITUDDICTAMEN}/dictamen/generar/criterios`;

/**
 * API para guardar el dictamen del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/generar-dictamen-by-numFolioTramite
 */
export const API_POST_GUARDAR_DICTAMEN = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/guardar`;

/**
 * API para iniciar el dictamen del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/generar-dictamen-by-numFolioTramite
 */
export const API_GET_INICAR_DICTAMEN = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/iniciar`;

/**
 * API para Consultar acuses de resolución del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Acuse/consulta-acuse-resoluciones-funcionario
 */
export const API_GET_ACUSES_RESOLUCION = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/funcionario/acuses-resoluciones`;

/**
 * API para Consultar dictamenes del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/consultar-dictamenes-by-numFolioTramite
 */
export const API_GET_DICTAMENES = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamenes`;

/**
 * API para Consultar requerimientos del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/get-requerimientos-by-numFolioTramite
 */
export const API_GET_REQUERIMIENTOS = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/requerimientos`;

/**
 * API para Consultar documentos de solicitud del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/consulta-documentos-solicitud
 */
export const API_GET_SOLICITUD_DOCUMENTOS = (TRAMITE: string, IDSOLICITUD: string) : string => `sat-t${TRAMITE}/solicitud/${IDSOLICITUD}/documentos`;

/**
 * API para Consultar tareas de solicitud del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/get-tareas-tramite 
 */
export const API_GET_TAREAS_DOCUMENTOS = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/bitacora`;
  
/**
 * Id opinion que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el tramite correspondiente.
 */
export const IDOPINION= '{idOpinion}';

/**
 * API para Consultar detalle de opinion del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitud/consulta-detalle%20opninion 
 */
export const API_GET_OPINION_DETALLE = `sat-t${TRAMITE}/tramite/opinion/${IDOPINION}/detalle`

/**
 * Id dictamen que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el tramite correspondiente.
 */
export const IDDICTAMEN= '{idDictamen}';

/**
 * API para Consultar detalle de dictamen del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitud/buscar-dictamen-by-idDictamen 
 */
export const API_GET_DICTAMEN_DETALLE = `sat-t${TRAMITE}/tramite/dictamen/${IDDICTAMEN}`

/**
 * Id observacion que se utilizará en las consultas.
 * Este valor debe ser reemplazado por el tramite correspondiente.
 */
export const IDOBSERVACION= '{idObservacion}';

/**
 * API para Consultar detalle de observacion del dictamen del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitud/get-By-Id-Observacion 
 */
export const API_GET_DICTAMEN_DETALLE_OBSERVACION = `sat-t${TRAMITE}/dictamen/observacion/${IDOBSERVACION}`

/**
 * DOCUMENTOMINIO para descargas.
 * Este valor debe ser reemplazado por el tramite correspondiente.
 */
export const DOCUMENTOMINIO= '{documentoMinio}';

/**
 * API para Consultar url de descarga de dictamen.
 * @see  https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitud/consulta-documento-oficial
 */
export const API_GET_DESCARGAR_ACUSE= `sat-t${TRAMITE}/documento-oficiales/${DOCUMENTOMINIO}`

/**
 * IDREQUERIMIENTO para detalle de requerimiento.
 * Este valor debe ser reemplazado por el tramite correspondiente.
 */
export const IDREQUERIMIENTO= '{idRequerimiento}';

/**
 * API para Consultar detalle de un requerimiento del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/tramite-flujo/swagger-ui/index.html#/Consulta-Requerimiento/getDetalleByIdRequerimiento
 */
export const API_GET_REQUERIMIENTO_DETALLE = `sat-t${TRAMITE}/tramite/requerimiento/${IDREQUERIMIENTO}/detalle`

/**
 * API firmar
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Requerimiento/firmar_1
 */
export const API_POST_FIRMAR_DICTAMEN = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/firmar`;

/**
 * API para mostrar y firmar el dictamen
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/mostra-firmar-dictamen
 */
export const API_POST_MOSTRAR_FIRMAR = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/mostrar-firmar`;

/**
 * API para generar el dictamen del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/dictamen-criterios-by-idSolicitud
 */
export const API_GET_DICTAMEN_CRITERIOS = (TRAMITE: string, IDSOLICITUDDICTAMEN: string) : string => `sat-t${TRAMITE}/solicitud/${IDSOLICITUDDICTAMEN}/dictamen/generar/criterios`;

/**
 * API para consultar los sentidos disponibles
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Catalogos/consulta-sentidos-disponibles
 */
export const API_GET_SENTIDOS_DISPONIBLES = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/generar/sentidos-disponibles`;

/**
 * API para guardar el requerimiento del trámite generico
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Requerimiento/guardar-requerimiento
 */
export const API_POST_GUARDAR_REQUERIMIENTO = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/requerimiento/generar/guardar`;

/**
 * API para guardar el requerimiento del trámite 130118
 * @see https://api-v30.cloud-ultrasist.net/api/tramite-flujo/swagger-ui/index.html#/Generar-Requerimiento/mostrar-firma
 */
export const API_POST_GUARDAR_REQUERIMIENTO_MOSTRAR_FIRMA = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/requerimiento/generar/mostrar-firmar`;

/**
 * API para generar la firma del requerimiento del trámite 130118
 * @see https://api-v30.cloud-ultrasist.net/api/tramite-flujo/swagger-ui/index.html#/Generar-Requerimiento/mostrar-firma
 */
export const API_POST_FIRMAR_REQUERIMIENTO = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/requerimiento/generar/firmar`;

/**
 * API para iniciar requerimiento trámite generico
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Requerimiento/iniciar-generar-requerimiento
 */
export const API_POST_INICIAR_REQUERIMIENTO = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/requerimiento/generar/iniciar`;

/** 
 * API para detalle de la opinion tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitud/consulta-detalle%20opninion
 */
export const API_GET_OPINION = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/opiniones`;

/** 
 * API para obtener documento de resolucion generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/guardar-dictamen-generado-by-numFolioTramite
 */
export const API_POST_REQUERIMIENTO_GUARDAR = (TRAMITE: string, IDREQUERIMIENTO: string) : string => `sat-t${TRAMITE}/confirmar-notificacion/requerimiento/${IDREQUERIMIENTO}/acuse/guardar`;

/**
 * API para obtener la notificacion de los acuses recibidos.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Confirmar-Notificacion/consulta-acuse-recibo-notificacion
 */
export const API_GET_ACUSES_RECIBOS_NOTIFICACION = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/acuses-recibos-notificacion`;

/** 
 * API para iniciar la confirmación de notificación del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Confirmar-Notificacion/iniciar-confirmacion-notificacion
 */
export const API_GET_INICIAR_CONFIRMACION_NOTIFICACION = (TRAMITE:string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/confirmar-notificacion/iniciar`;

/** 
 * API para obtener documento de resolucion generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/guardar-dictamen-generado-by-numFolioTramite
 */
export const API_POST_RESOLUCION_GUARDAR = (TRAMITE: string, IDRESOLUCION: string) : string => `sat-t${TRAMITE}/confirmar-notificacion/resolucion/${IDRESOLUCION}/acuse/guardar`;

/**
 * API para cargar documentos.
 * @see https://api-v30.cloud-ultrasist.net/api/digitalizacion/cargar
 */
export const API_POST_CARGAR_DOCUMENTOS = `digitalizacion/cargar`

/**
 * 
 * @see https://api-v30.cloud-ultrasist.net/api/digitalizacion/documentos/LEQI8101314S7-ba0fedcf-0e76-4165-be82-5923cc664f41
 */
export const API_POST_DOCUMENTO_REFERENCIA_SOLICITUD = (REFRERENCIASOLICITUD: string) : string => `digitalizacion/documentos/${REFRERENCIASOLICITUD}`;
/**
 * API para obtener evaluar iniciar tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Evaluar-Solicitud/getOpcionesEvaluacion
 */
export const API_GET_EVALUAR_INICIAR = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/evaluar/iniciar`;

/**
 * API para prepar evaluacion tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Evaluar-Solicitud/getOpcionesEvaluacion
 */
export const API_GET_EVALUAR_MOSTRAR = (TRAMITE: string, NUMFOLIOTRAMITE: string) : string => `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/evaluar/mostrar`;

/** 
 * API para consulta de envio digital 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitud/get-detalle-estado
 */
export const API_GET_ENVIO_DIGITAL = (NUMFOLIOTRAMITE: string) : string => `tramite/${NUMFOLIOTRAMITE}/envio-digital/detalle`;

/**
 * API para Consultar que tabs mostrar 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitud/estado-consulta-solicitud
 */
export const API_GET_TABS = (TRAMITE: string, IDSOLICITUD: string) : string => `sat-t${TRAMITE}/tramite/solicitud/${IDSOLICITUD}/estado`;

/**
 * API para Consultar los datos del solicitante
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitud/estado-consulta-solicitud
 */
export const API_GET_DATOS_SOLICITANTE = (TRAMITE: string, IDSOLICITUD: string) : string => `sat-t${TRAMITE}/tramite/${IDSOLICITUD}/solicitud/solicitante`;

/*
 * API para obtener el catálogo de immex
 * @see https://api-v30.cloud-ultrasist.net/api/procedureID/catalogo/immex
 */
export const CATALOGO_IMMEX = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/immex`;

/*
 * API para obtener el catálogo de estados
 * @see https://api-v30.cloud-ultrasist.net/api/procedureID/catalogo/estados
 */
export const CATALOGO_ESTADOS = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/estados`;

/*
 * API para obtener el catálogo de países
 * @see https://api-v30.cloud-ultrasist.net/api/procedureID/catalogo/paises
 */
export const CATALOGO_PAISES = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/paises`;

/*
 * API para obtener el catálogo de NICO
 * @see https://api-v30.cloud-ultrasist.net/api/procedureID/catalogo/nico
 */
export const CATALOGO_NICO = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/nico`;

/**
 * API para obtener el estado de la solicitud del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/genera-cadena-original_1
 */
export const API_POST_CADENA_ORIGINAL = (IDSOLICITUD: string, PROCEDURE: number): string => `sat-t${PROCEDURE}/solicitud/${IDSOLICITUD}/genera-cadena-original`;
/**
 * API para firmar la solicitud del tramite 130118.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/firmar
 */
export const API_POST_FIRMA = (IDSOLICITUD: string, PROCEDURE: number): string => `sat-t${PROCEDURE}/solicitud/${IDSOLICITUD}/firmar`;

/*
 * API para obtener el catálogo de SELECCIONAR_REGLA
 * @see https://api-v30.cloud-ultrasist.net/api/procedureID/catalogo/regla-3rs-immex
 */
export const CATALOGO_SELECCIONAR_REGLA = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/regla-3rs-immex`;

/*
 * API para obtener el catálogo de sectores
 * @see https://api-v30.cloud-ultrasist.net/api/procedureID/catalogo/sectores
 */
export const CATALOGO_SECTORES = (TRAMITE: string) : string => `sat-t${TRAMITE}/catalogo/sectores`;
