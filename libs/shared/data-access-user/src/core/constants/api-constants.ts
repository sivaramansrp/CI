import { RFC_GENERICO } from "./constantes-generales";

/**
 * API para recuperar el catálogo de aduanas
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Aduana./consulta-cat%C3%A1logo-aduanas
 */
export const API_GET_ADUANA = 'catalogo/aduanas';
/**
 * La clave de la aduana por la que se filtrará la información.
 */
export const CLAVE_ADUANA_QUERY = '{claveAduana}';
/**
 * API para recuperar el catálogo de aduanas
 * @param CLAVE_ADUANA_QUERY La clave de la aduana seleccionada por el usuario
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Aduana./consulta-cat%C3%A1logo-aduanas
 */
export const API_GET_SECCION_ADUANA = `catalogo/seccion-aduanas/${CLAVE_ADUANA_QUERY}`;
/**
 * La clave de la patente por la que se filtrará la información.
 */
export const CLAVE_PATENTE_QUERY = '{clavePatente}';
/**
 * API para recuperar los recintos inherentes de una aduana.
 * @param CLAVE_ADUANA_QUERY El clave de la aduana seleccionada por el usuario.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/patente/swagger-ui/index.html
 */
export const API_GET_RECINTO = `catalogo/recintos-fiscalizados/${CLAVE_ADUANA_QUERY}`;
/**
 * API para obtener el catálogo de tipo de equipo en el trasnporte ferroviario.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Tipos%20de%20equipo./consulta-tipos-equipo
 */
export const API_GET_TIPO_EQUIPO = 'catalogo/busca/tipo-equipo';
/**
 * Tipo de transporte [ferro, aereo]
 */
export const TIPO_TRANSPORTE = '{tipoTransporte}';
/**
 * API para validar el número BL de transporte ferroviario. y obtener los datos:
 * Tipo de equipo, Iniciales de equipo y Npumero de equipo.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/privado/swagger-ui/index.html#/Privado%20Validaciones/validaFerro
 */
export const API_CONSULTAR_VALIDACION = `privado/${TIPO_TRANSPORTE}/valida`;
/**
 * El RFC del solicitante y/o apoderado
 */
export const RFC_QUERY = '{rfc}';
/**
 * API que permite verificar si el RFC proporcionado es válido.
 * @param RFC_QUERY EL RFC
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t5701/swagger-ui/index.html#/RFC/valida-rfc
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
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Certificaciones/valida-certificaciones
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
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t5701/swagger-ui/index.html#/Solicitud/guardar
 */
export const API_POST_SOLICITUD = 'sat-t5701/guardar';

/**
 * ID del trámite a eliminar.
 * Este ID se debe reemplazar por el ID del trámite que se desea eliminar.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/sat-t5701/swagger-ui/index.html#/Tramite/elimina-tramite-pendiente-by-id
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
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/tramite/5701/documentos?especifico=false
 */
export const API_GET_DOCUMENTOS_OBLIGATORIOS = `tramite/{numeroTramite}/documentos`;

/**
 * API para recuperar el catálogo de paises
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/catalogo/swagger-ui/index.html#/Pa%C3%ADs/consulta-paises-activos
 */
export const API_GET_PAISES = 'catalogo/paises';

/**
 * API para generar la cadena original de un trámite.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/tramite-flujo/swagger-ui/index.html#/Cadena/generar
 */
export const API_GENERAR_CADENA_ORIGINAL =
  'api/tramite/solicitud/genera-cadena-original';

/**
 * API para enviar una firma electrónica.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/firma/swagger-ui/index.html#/Firma/firmar
 */
export const API_ENVIAR_FIRMA = 'api/tramite/firmar';

/**
 * API para recuperar las tareas por usuario.
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/bandeja-tarea/swagger-ui/index.html#/Bandeja%20tarea/consultar-tareas-servicio
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
export const API_POST_GUARDAR_ACUSE = `sat-t130118/solicitud/${IDSOLICITUD}/acuse/guardar`;

/**
 * API para generar la vista previa del acuse de una solicitud.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/genera-documento
 */
export const API_POST_VISTA_PREVIA = `sat-t130118/solicitud/${IDSOLICITUD}/acuse/vista-previa`;

/**
 * API para obtener los documentos
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Registro-Solicitud/consulta-documentos
 */
export const API_GET_DOCUMENTOS130118 = 'sat-t130118/solicitud/documentos';

/**
 * Ruta de la API para obtener la información del contribuyente IDC.
 * Utiliza el RFC genérico como parte de la URL.
 *
 * @see http://api-vucem-1069277193.us-east-1.elb.amazonaws.com/api/idc/swagger-ui/index.html#/idc-ws-end-point-controller/informacionContribuyente
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
 * API para obtener las opciones de evaluación del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Evaluar-Solicitud/opciones-evaluacion
 */
export const API_POST_OPCIONES_EVALUACION = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/opciones-evaluacion`;

/**
 * API para generar el dictamen del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/dictamen-criterios-by-idSolicitud
 */
export const API_GET_DICTAMEN = `sat-t${TRAMITE}/solicitud/${IDSOLICITUDDICTAMEN}/dictamen/generar/criterios`;

/**
 * API para guardar el dictamen del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/generar-dictamen-by-numFolioTramite
 */
export const API_POST_GUARDAR_DICTAMEN = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/guardar`;

/**
 * API para iniciar el dictamen del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Generar-Dictamen/generar-dictamen-by-numFolioTramite
 */
export const API_GET_INICAR_DICTAMEN = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamen/generar/iniciar`;

/**
 * API para Consultar acuses de resolución del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Acuse/consulta-acuse-resoluciones-funcionario
 */
export const API_GET_ACUSES_RESOLUCION = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/funcionario/acuses-resoluciones`;

/**
 * API para Consultar dictamenes del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/consultar-dictamenes-by-numFolioTramite
 */
export const API_GET_DICTAMENES = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/dictamenes`;

/**
 * API para Consultar requerimientos del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/get-requerimientos-by-numFolioTramite
 */
export const API_GET_REQUERIMIENTOS = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/requerimientos`;

/**
 * API para Consultar documentos de solicitud del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/consulta-documentos-solicitud
 */
export const API_GET_SOLICITUD_DOCUMENTOS = `sat-t${TRAMITE}/solicitud/${IDSOLICITUD}/documentos`;

/**
 * API para Consultar tareas de solicitud del tramite generico.
 * @see https://api-v30.cloud-ultrasist.net/api/sat-t130118/swagger-ui/index.html#/Consulta-Solicitudes/get-tareas-tramite 
 */
export const API_GET_TAREAS_DOCUMENTOS = `sat-t${TRAMITE}/tramite/${NUMFOLIOTRAMITE}/bitacora`;
  
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
 * UUID para descargas.
 * Este valor debe ser reemplazado por el tramite correspondiente.
 */
export const UUID= '{uuid}';

/**
 * API para Consultar url de descarga de dictamen.
 * @see  
 */
export const API_GET_DESCARGAR_ACUSE= `generador-documento/tramite/documento/${UUID}`